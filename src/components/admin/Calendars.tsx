import { useEffect, useState } from "react";
import { useAppointments } from "../../hooks/useAppointments";
import { useServices } from "../../hooks/useServices";
import { useAuth } from "../../hooks/useAuth";
import { addMinutes } from "date-fns";
import CalendarComponent from "./CalendarComponent";
import Swal from "sweetalert2";

interface Appointment {
    date: string;
    contact: string;
    status: string;
    clientId: string;
    id: string;
    sessionLength: number;
    type: string;
}

const Calendars = () => {
    const [calendarEvents, setCalendarEvents] = useState([]);
    const { getAppointmentsByService } = useAppointments();
    const { getAllServices } = useServices();
    const { getAllUsers } = useAuth();

    useEffect(() => {
        const chooseCalendar = async () => {
            try {
                const services = await getAllServices();
                const inputOptions = services.reduce((options: Record<string, string>, service: { id: string; name: string }) => {
                    options[service.id] = service.name;
                    return options;
                }, {});

                const { value: service } = await Swal.fire({
                    title: "Seleccione servicio",
                    input: "radio",
                    inputOptions,
                    confirmButtonText: "Seleccionar",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    inputValidator: (value) => {
                        if (!value) {
                            return "Por favor, seleccione tipo de turno";
                        }
                    },
                });

                if (service) {
                    const [appointments, users] = await Promise.all([
                        getAppointmentsByService(service),
                        getAllUsers(),
                    ]);

                    const events = (appointments || []).map((appointment: Appointment) => {
                        const user = users.find((u) => u.id === appointment.clientId);
                        return {
                            id: appointment.id,
                            title: user ? user.name : "Desconocido",
                            start: new Date(appointment.date),
                            end: addMinutes(new Date(appointment.date), appointment.sessionLength || 0),
                            contact: appointment.contact,
                            status: appointment.status,
                            clientId: appointment.clientId,
                            service: appointment.type,
                        };
                    });
                    setCalendarEvents(events);
                }
            } catch (error) {
                console.error("Error fetching services: ", error);
            }
        };

        chooseCalendar();
    }, []);

    return (
        <div className="flex flex-col h-screen w-full md:w-full p-10">
            <CalendarComponent events={calendarEvents} />
        </div>
    );
};

export default Calendars;