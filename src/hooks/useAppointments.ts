import Swal from "sweetalert2";
import handleApi from "../api/handleApi";


interface Appointment {
    contact: string;
    sessionZones?: number;
    date: string;
    userId: string;
    serviceId: string;
    status: string;
}

export const useAppointments = () => {

    const getUserAppointments = async ( uid:string ) => {
        try {
            const { data } = await handleApi.get(`/appointments/users/${uid}`);
            return data.appointments;
        } catch (error) {
            console.log(error);
        }
    }

    const addAppointment = async ({ contact, serviceId, date, userId, businessId, status }: Appointment) => {
        const isoDate = date.toISOString();
        try {
            const { data } = await handleApi.post("/appointments", {
                date: isoDate, userId, contact, service:serviceId, businessId, status
            });
            Swal.fire({
                icon: "success",
                title: "Turno reservado!",
                showConfirmButton: false,
                timer: 1500,
            });
            return data.appointment.id;
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.msg || "Error desconocido";
            Swal.fire({
                icon: "error",
                title: "Error al reservar turno",
                text: errorMessage,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };


    const getAppointmentsByService = async (serviceId: string) => {
        try {
            const { data } = await handleApi.get(`/appointments/service/${serviceId}`);
            return data.appointments;
        } catch (error) {
            console.error(error);
        }
    };

    const getAllAppointments = async () => {
        try {
            const { data } = await handleApi.get('/appointments');
            return data.appointments;
        } catch (error) {
            console.log(error);
        }
    }

    const deleteAppointment = async ( id:string ) => {
        try {
            await handleApi.delete(`/appointments/${id}`);
            Swal.fire({
                icon: 'warning',
                title: 'Se ha eliminado el turno',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.log(error);
            const data = error.response?.data;
            const errorMessage = data?.msg || 'Error desconocido';
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar turno',
                text: errorMessage,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }


    // const getReservedTimes = async ( date, sessionLength ) => {
    //     try {
    //         const formattedDate = date.toISOString().split('T')[0]; 
    //         const { data } = await handleApi.get(`/appointments/reserved?date=${formattedDate}&duration=${sessionLength}`);
    //         return data.reservedTimes.map(time => new Date(time)); 
    //     } catch (error) {
    //         console.log("Error obteniendo los horarios ocupados:", error);
    //         return [];
    //     }
    // }

    const updateAppointment = async ( appointmentChanges: Partial<Appointment> & { id: string } ) => {
        try {
            const {data} = await handleApi.put(`/appointments/${appointmentChanges.id}`, appointmentChanges);
            Swal.fire({
                icon: 'success',
                title: 'Turno actualizado',
                text: 'Los cambios han sido guardados con éxito',
                showConfirmButton: false, 
                timer: 1500,     
            });
            return data.ok;
        } catch (error) {
            console.log(error);
            const data = error.response?.data;
            const errorMessage = data?.msg || 'Error desconocido';
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar turno',
                text: errorMessage,
                showConfirmButton: false,
                timer: 1500,
            });
            return false;
        }
    }

    const getNoPaidAppointments = async (page = 1, limit = 6) => {
        try {
            const { data } = await handleApi.get(`/appointments/no-paid/pagination?page=${page}&limit=${limit}`);
            return {
                appointments: data.appointments,
                totalPages: data.totalPages
            };
        } catch (error) {
            console.error("Error obteniendo los turnos no pagados:", error);
            return { appointments: [], totalPages: 1 };
        }
    };


    return {
        addAppointment,
        deleteAppointment,
        getAllAppointments,
        getAppointmentsByService,
        // getReservedTimes, 
        getUserAppointments,
        updateAppointment,
        getNoPaidAppointments
    }
};