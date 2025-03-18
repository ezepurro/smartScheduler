import { useEffect, useState } from "react";
import { useBusinessSettings } from "../../hooks/useBusinessSettings";
import { useServices } from "../../hooks/useServices";
import Service from "./Service";
import Swal from "sweetalert2";
import Modal from "react-modal";

const ServicesList = () => {
    const { getAllServices, addService } = useServices();
    const { addServiceToAvailability } = useBusinessSettings();
    const [ services, setServices ] = useState([]);
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ newService, setNewService ] = useState({ name: "", description: "", duration: "", price: "" });

    const fetchServices = async () => {
        const fetchedServices = await getAllServices();
        setServices(fetchedServices);
    };

    const openModal = () => {
        setModalIsOpen(true);
        setNewService({ name: "", description: "", duration: "", price: "" });
    }

    useEffect(() => {
        Swal.fire({
            title: "Cargando servicios",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        });
        fetchServices();
    }, []);

    const handleAddService = async () => {
        if (!newService.name || !newService.duration || !newService.price) {
            Swal.fire({
                icon: 'error',
                title: 'No se ha podido actializar',
                text: 'Complete todos los campos',
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
        try {
            const {id} = await addService({
                ...newService,
                duration: parseInt(newService.duration),
                price: parseFloat(newService.price)
            });
            addServiceToAvailability(id);
            fetchServices();
            setModalIsOpen(false);
            Swal.fire({
                icon: 'success',
                title: "Servicio añadido",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4 w-full">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-[500]">Gestión de Servicios</h1>
                <button
                    onClick={openModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer">
                    <span className="font-[600]">+</span> Añadir Servicio
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-center">
                    <thead className="bg-brand-primary text-brand-secondary">
                        <tr>
                            <th className="px-4 py-2">Título</th>
                            <th className="px-4 py-2">Descripción</th>
                            <th className="px-4 py-2">Duración</th>
                            <th className="px-4 py-2">Precio</th>
                            <th className="px-4 py-2">Editar</th>
                            <th className="px-4 py-2">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service, index) => (
                            <Service data={service} key={index} refreshData={fetchServices} />
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full"
                overlayClassName="fixed inset-0 bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-lg font-bold mb-4 text-center">Añadir Servicio</h2>
                <input
                    type="text"
                    placeholder="Nombre"
                    className="border p-2 w-full mb-2 rounded-xl"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Descripción"
                    className="border p-2 w-full mb-2 rounded-xl"
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Duración (minutos)"
                    className="border p-2 w-full mb-2 rounded-xl"
                    value={newService.duration}
                    onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Precio"
                    className="border p-2 w-full mb-4 rounded-xl"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                />
                <div className="flex justify-end gap-2">
                    <button className="bg-gray-500 hover:bg-gray-600 cursor-pointer text-white px-4 py-2 rounded" onClick={() => setModalIsOpen(false)}>Cancelar</button>
                    <button className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-4 py-2 rounded" onClick={handleAddService}>Añadir</button>
                </div>
            </Modal>
        </div>
    );
};

export default ServicesList;
