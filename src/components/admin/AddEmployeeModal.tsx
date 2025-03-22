import { useEffect, useState } from "react";
import { useServices } from "../../hooks/useServices";
import Modal from "react-modal";

const AddEmployeeModal = ({ isOpen, closeModal }) => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const { getAllServices } = useServices();

    useEffect(() => {
        const fetchServices = async () => {
            const fetchedServices = await getAllServices();
            setServices(fetchedServices);
        };
        fetchServices();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Empleado asignado al servicio:", selectedService);
        closeModal();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Añadir Empleado"
            className="bg-white p-6 rounded-lg  max-w-lg w-full "
            overlayClassName="fixed inset-0 bg-opacity-50 flex justify-center items-center"
        >
            <h2 className="text-xl font-bold mb-4">Asignar Empleado a un Servicio</h2>
            <form onSubmit={handleSubmit}>
                <label className="block font-semibold mb-2">Seleccionar Servicio</label>
                <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="border rounded-lg p-3 w-full mb-4"
                    required
                >
                    <option value="">Seleccione un servicio</option>
                    {services.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.name}
                        </option>
                    ))}
                </select>
                <div className="flex justify-end">
                    <button type="button" onClick={closeModal} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Asignar</button>
                </div>
            </form>
        </Modal>
    );
};

export default AddEmployeeModal;