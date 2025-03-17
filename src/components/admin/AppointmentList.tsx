import { useEffect, useState } from "react";
import { useAppointments } from "../../hooks/useAppointments";
import { useServices } from "../../hooks/useServices";
import { useAuth } from "../../hooks/useAuth";
import Appointment from "./Appointment";
import Swal from "sweetalert2";

const ITEMS_PER_PAGE = 6;


const AppointmentList = () => {
    const [ appointments, setAppointments ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const { getAllAppointments } = useAppointments();
    const { getAllUsers } = useAuth();
    const { getAllServices } = useServices();

    const fetchAppointments = async () => {
        try {
            const fetchedAppointments = await getAllAppointments();
            const users = await getAllUsers();
            const services = await getAllServices();

            const appointmentsWithDetails = fetchedAppointments.map(appointment => {
                const user = users.find(u => u.id === appointment.clientId);
                const service = services.find(s => s.id === appointment.serviceId);

                return {
                    ...appointment,
                    clientName: user?.name || "Desconocido",
                    serviceName: service?.name || "Servicio desconocido"
                };
            });

            setAppointments(appointmentsWithDetails);
        } catch (error) {
            console.error("Error al obtener turnos:", error);
        }
    };

    useEffect(() => {
        Swal.fire({
            title: "Cargando turnos",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        });
        fetchAppointments();
    }, []);

    const refreshData = () => {
        fetchAppointments();
    }

    const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE);
    const paginatedAppointments = appointments.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="p-4 w-full">
            <h1 className="text-center text-xl font-[500] mb-4">Gestión de Turnos</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-center">
                    <thead className="bg-brand-primary text-brand-secondary">
                        <tr>
                            <th className="px-4 py-2">Cliente y contacto</th>
                            <th className="px-4 py-2">Tipo de Turno</th>
                            <th className="px-4 py-2">Fecha y Hora</th>
                            <th className="px-4 py-2">Estado</th>
                            <th className="px-4 py-2">Gestionar</th>
                            <th className="px-4 py-2">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedAppointments.map((appointment, index) => (
                            <Appointment data={appointment} key={index} refreshData={refreshData} />
                        ))}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
};

export default AppointmentList;
