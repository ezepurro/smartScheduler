import { addMinutes } from "date-fns";
import CalendarComponent from "./CalendarComponent";

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

const calendarEvents: Event[] = [
    {
        title: "Test",
        start: new Date(),
        end: addMinutes(new Date(), 10),
        id: "",
        contact: "+5493515312198",
        status: "paid",
        clientId: "",
        type: "Depilación",
        isoDate: "",
    },
    {
        title: "Test 2",
        start: addMinutes(new Date(), 20),
        end: addMinutes(new Date(), 50),
        id: "",
        contact: "+5493515312198",
        status: "paid",
        clientId: "",
        type: "Depilación",
        isoDate: "",
    }
];

const Calendars = () => {
    return (
        <div className="flex flex-col h-screen w-full md:w-full p-10">
            <CalendarComponent events={calendarEvents} />
        </div>
    );
};

export default Calendars;
