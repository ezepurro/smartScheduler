import handleApi from "../api/handleApi";

interface Service {
    name: string;
    description: string;
    duration: number;
    price: number;
}

export const useServices = () => {

    const getAllServices = async () => {
        try {
            const { data } = await handleApi.get('/services');
            return data.services;
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const addService = async (serviceData: Service) => {
        try {
            const { data } = await handleApi.post('/services/add', serviceData);
            return data.service;
        } catch (error) {
            console.error("Error adding service:", error);
        }
    };

    const deleteService = async (id: string) => {
        try {
            await handleApi.delete(`/services/delete/${id}`);
            return true;
        } catch (error) {
            console.error("Error deleting service:", error);
            return false;
        }
    };

    const updateService = async (id: string, serviceData: Service) => {
        try {
            const { data } = await handleApi.put(`/services/update/${id}`, serviceData);
            return data.service;
        } catch (error) {
            console.error("Error updating service:", error);
        }
    };

    return {
        getAllServices,
        addService,
        deleteService,
        updateService
    };
};
