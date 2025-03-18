import AppointmentList from "../components/admin/AppointmentList";
import Calendars from "../components/admin/Calendars";
import DateList from "../components/admin/DateList";
import NoPaidAppointmentList from "../components/admin/NoPaidAppointmentList";
import ServicesList from "../components/admin/ServicesList";


export const adminSections = [
    {
        id: "appointments-calendars",
        title: "Ver turnos",
        component: Calendars
    },
    {
        id: "appointments-days",
        title: "Administrar fechas para turnos",
        component: DateList
    },
    {
        id: "manage-appointment",
        title: "Administrar turnos",
        component: AppointmentList
    },
    {
        id: "no-paid-appointments",
        title: "Turnos sin seña",
        component: NoPaidAppointmentList
    },
    {
        id: "manage-services",
        title: "Administrar servicios",
        component: ServicesList
    },
]