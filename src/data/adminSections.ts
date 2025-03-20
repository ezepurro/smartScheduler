import AppointmentList from "../components/admin/AppointmentList";
import CalendarList from "../components/admin/CalendarList";
import DateList from "../components/admin/DateList";
import NoPaidAppointmentList from "../components/admin/NoPaidAppointmentList";
import ServicesList from "../components/admin/ServicesList";
import UserList from "../components/admin/UserList";


export const adminSections = [
    {
        id: "appointments-calendars",
        title: "Ver turnos",
        component: CalendarList
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
    {
        id: "manage-users",
        title: "Administrar usuarios",
        component: UserList
    },
]