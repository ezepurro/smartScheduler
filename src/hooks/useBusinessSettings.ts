import handleApi from "../api/handleApi";

interface BusinessSettings {
    availableDays: string[];
    openingTime: string | null;
    closingTime: string | null;
    serviceAvailability: { serviceId: string; dates: string[] }[];
}

export const useBusinessSettings = () => {

    // Obtener la configuración de negocio
    const getBusinessSettings = async (): Promise<BusinessSettings | null> => {
        try {
            const { data } = await handleApi.get('/business-settings');
            return data;
        } catch (error) {
            console.error("Error fetching business settings:", error);
            return null;
        }
    };

    // Obtener las fechas de un servicio
    const getServiceDates = async (serviceId: string) => {
        try {
            const { data } = await handleApi.get(`/business-settings/service/${serviceId}/dates`);
            return data.dates;
        } catch (error) {
            console.error("Error fetching service dates:", error);
            return [];
        }
    };

    // Añadir un servicio a la disponibilidad
    const addServiceToAvailability = async (serviceId: string) => {
        try {
            const { data } = await handleApi.put('/business-settings/service', { serviceId });
            return data.message;
        } catch (error) {
            console.error("Error adding service to availability:", error);
            return null;
        }
    };

    // Eliminar un servicio de la disponibilidad
    const removeServiceFromAvailability = async (serviceId: string) => {
        try {
            const { data } = await handleApi.delete('/business-settings/service', { data: { serviceId } });
            return data.message;
        } catch (error) {
            console.error("Error removing service from availability:", error);
            return null;
        }
    };

    // Añadir una fecha a la disponibilidad de un servicio
    const addDateToServiceAvailability = async (serviceId: string, date: string) => {
        try {
            const { data } = await handleApi.put('/business-settings/dates', { serviceId, date });
            return data.message;
        } catch (error) {
            console.error("Error adding date to service availability:", error);
            return null;
        }
    };

    // Eliminar una fecha de la disponibilidad de un servicio
    const deleteDateFromServiceAvailability = async (serviceId: string, date: string) => {
        try {
            const { data } = await handleApi.delete('/business-settings/dates', { data: { serviceId, date } });
            return data.message;
        } catch (error) {
            console.error("Error deleting date from service availability:", error);
            return null;
        }
    };

    return {
        getBusinessSettings,
        getServiceDates,
        addServiceToAvailability,
        removeServiceFromAvailability,
        addDateToServiceAvailability,
        deleteDateFromServiceAvailability
    };
};
