import handleApi from "../api/handleApi";

export const useServices = () => {

    const getAllServices = async () => {
        try {
            const { data } = await handleApi.get('/services');
            return data.services;
        } catch (error) {
            console.log(error);
        }
    }

    return {
        getAllServices
    }
}