import { useEffect, useState } from "react";
import { useAppointments } from "../../hooks/useAppointments";
import { useServices } from "../../hooks/useServices";
import { convertDateToDDMMYY, convertDateToHHMM } from "../../helpers/converters";
import Modal from "react-modal";

Modal.setAppElement("#root");

interface Appointment {
    id: string,
    contact: string;
    sessionZones?: number;
    date: string;
    userId: string;
    serviceId: string;
    status: string;
}

const UserAppointmentList = ({ isOpen, closeModal, data }) => {
    const { getUserAppointments } = useAppointments();
    const { getAllServices } = useServices();
    const [appointments, setAppointments] = useState([]);
    const [services, setServices] = useState({});

    useEffect(() => {
        if (!isOpen) return;

        const fetchUserAppointments = async () => {
            const fetchedUserAppointments = await getUserAppointments(data.id);
            setAppointments(fetchedUserAppointments);
        };
        
        fetchUserAppointments();
    }, [isOpen, data.id]);

    useEffect(() => {
        if (!isOpen) return;

        const fetchServices = async () => {
            const fetchedServices = await getAllServices();
            const serviceMap = fetchedServices.reduce((acc, service) => {
                acc[service.id] = service.name;
                return acc;
            }, {});
            setServices(serviceMap);
        };

        fetchServices();
    }, [isOpen, data.id]);
    
    return (
<Modal 
    isOpen={isOpen} 
    onRequestClose={closeModal} 
    className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full"
    overlayClassName="fixed inset-0 bg-opacity-50 flex justify-center items-center"
>
    <h2 className="text-xl font-semibold mb-4 text-center">Turnos de {data.name}</h2>
    
    {appointments.length === 0 ? (
        <p className="text-gray-600">No hay turnos disponibles.</p>
    ) : (
        <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border-b">Servicio</th>
                        <th className="px-4 py-2 border-b">Fecha</th>
                        <th className="px-4 py-2 border-b">Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment:Appointment) => (
                        <tr key={appointment.id} className="border-t">
                            <td className="px-4 py-2 text-center">{services[appointment.serviceId] || "Servicio desconocido"}</td>
                            <td className="px-4 py-2 text-center">{convertDateToDDMMYY(appointment.date)}</td>
                            <td className="px-4 py-2 text-center">{convertDateToHHMM(appointment.date)} HS</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )}

    <button 
        className="mt-4 bg-gray-500 text-white rounded-md px-4 py-2 hover:bg-gray-600 w-full transform duration-300 cursor-pointer"
        onClick={closeModal}
    >
        Cerrar
    </button>
</Modal>

    );
};

export default UserAppointmentList;
