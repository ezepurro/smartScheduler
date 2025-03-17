import { useState } from "react";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";

interface Event {
    title: string;
    start: Date;
    end: Date;
    id: string;
    contact: string;
    status: string;
    clientId: string;
    type: string;
    isoDate: string;
    sessionZones?: number;
}

const locales = { es };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

interface CustomToolbarProps {
    label: string;
    view: string;
    onView: (view: View) => void;
    onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}

const CustomToolbar = ({ label, view, onView, onNavigate }: CustomToolbarProps) => {
    return (
        <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <button onClick={() => onNavigate("PREV")}>Anterior</button>
                <button onClick={() => onNavigate("TODAY")}>Hoy</button>
                <button onClick={() => onNavigate("NEXT")}>Siguiente</button>
            </span>

            <span className="rbc-toolbar-label">{view !== "agenda" ? label : "Agenda"}</span>

            <span className="rbc-btn-group">
                <button onClick={() => onView("month")}>Mes</button>
                <button onClick={() => onView("week")}>Semana</button>
                <button onClick={() => onView("day")}>Día</button>
                <button onClick={() => onView("agenda")}>Agenda</button>
            </span>
        </div>
    );
};

const CalendarComponent = ({ events }: { events: Event[] }) => {
    const [currentView, setCurrentView] = useState<View>("month");

    return (
        <div className="flex flex-col h-full w-full">
            <Calendar
                className="w-full flex-1"
                culture="es"
                localizer={localizer}
                events={events.filter(event => event.status === "paid")}
                startAccessor="start"
                endAccessor="end"
                view={currentView}
                onView={(view) => setCurrentView(view)}
                components={{ toolbar: CustomToolbar }}
                messages={{
                    date: "Fecha",
                    time: "Hora",
                    event: "Datos del turno",
                    today: "Hoy",
                    previous: "Anterior",
                    next: "Siguiente",
                    month: "Mes",
                    week: "Semana",
                    day: "Día",
                    agenda: "Agenda",
                    noEventsInRange: "No hay citas agendadas en este rango.",
                }}
            />
        </div>
    );
};

export default CalendarComponent;
