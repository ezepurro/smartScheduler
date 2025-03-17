import { useEffect, useState } from "react";
import { useAppointments } from "../../hooks/useAppointments";
import { useServices } from "../../hooks/useServices";
import { useAuth } from "../../hooks/useAuth";
import NoPaidAppointment from "./NoPaidAppointment";
import Swal from "sweetalert2";

const ITEMS_PER_PAGE = 6;

const NoPaidAppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { getNoPaidAppointments } = useAppointments();
    const { getAllUsers } = useAuth();
    const { getAllServices } = useServices();

    const fetchAppointments = async (page) => {
        try {
            Swal.fire({
                title: "Cargando turnos sin seña",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true
            });
            
            const { appointments, totalPages } = await getNoPaidAppointments(page, ITEMS_PER_PAGE);
            const users = await getAllUsers();
            const services = await getAllServices();

            const appointmentsWithDetails = appointments.map(appointment => {
                const user = users.find(u => u.id === appointment.clientId);
                const service = services.find(s => s.id === appointment.serviceId);

                return {
                    ...appointment,
                    clientName: user?.name || "Desconocido",
                    serviceName: service?.name || "Servicio desconocido"
                };
            });

            setAppointments(appointmentsWithDetails);
            setTotalPages(totalPages);
        } catch (error) {
            console.error("Error al obtener turnos sin seña:", error);
        }
    };

    useEffect(() => {
        fetchAppointments(currentPage);
    }, [currentPage]);

    const refreshData = () => {
        fetchAppointments(currentPage);
    }

    return (
        <div className="p-4 w-full">
            <h1 className="text-center text-xl font-[500] mb-4">Gestión de Turnos sin Seña</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-center">
                    <thead className="bg-brand-primary text-brand-secondary">
                        <tr>
                            <th className="px-4 py-2">Cliente y Contacto</th>
                            <th className="px-4 py-2">Tipo de Turno</th>
                            <th className="px-4 py-2">Fecha y Hora</th>
                            <th className="px-4 py-2">Estado del Turno</th>
                            <th className="px-4 py-2">Marcar como pago</th>
                            <th className="px-4 py-2">Eliminar Turno</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <NoPaidAppointment data={appointment} refreshData={refreshData} key={index} />
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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

export default NoPaidAppointmentList;