import { useState } from "react";
import { useBusinessSettings } from "../../hooks/useBusinessSettings";
import { useServices } from "../../hooks/useServices";
import Modal from "react-modal";
import Swal from "sweetalert2";

const Service = ({ data, refreshData }) => {

    const { updateService, deleteService } = useServices();
    const { removeServiceFromAvailability } = useBusinessSettings();
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ formData, setFormData ] = useState({
        name: data.name,
        description: data.description,
        duration: data.duration,
        price: data.price,
    });

    const handleEdit = () => {
        setModalIsOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.duration || !formData.price) {
            Swal.fire({
                icon: 'error',
                title: 'No se ha podido actializar',
                text: 'Complete todos los campos',
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
        await updateService(data.id, {
            ...formData,
            duration: parseInt(formData.duration),
            price: parseFloat(formData.price)
        });
        setModalIsOpen(false);
        refreshData();
    };

    const handleDelete = async () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteService(data.id);
                removeServiceFromAvailability(data.id);
                refreshData();
                Swal.fire({
                    icon: 'success',
                    title: "Servicio eliminado",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    return (
        <tr className="p-4 border-b-gray-300 border-b text-center">
            <th className="px-4 py-2 text-left">
                <p className="text-lg font-semibold">{data.name}</p>
            </th>
            <th className="px-4 py-2">
                <p className="text-sm text-left">{data.description}</p>
            </th>
            <th className="px-4 py-2">
                <p className="text-sm">{data.duration} min</p>
            </th>
            <th className="px-4 py-2">
                <p className="text-sm">${data.price}</p>
            </th>
            <th className="px-4 py-2">
                <button onClick={handleEdit} className="bg-cyan-700 text-white rounded-md hover:bg-cyan-800 p-2 cursor-pointer">
                    Editar
                </button>
            </th>
            <th className="px-4 py-2">
                <button onClick={handleDelete} className="bg-red-700 text-white rounded-md hover:bg-red-800 p-2 cursor-pointer">
                    Eliminar
                </button>
            </th>

            <Modal
                isOpen={modalIsOpen} 
                onRequestClose={() => setModalIsOpen(false)} 
                className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full"
                overlayClassName="fixed inset-0 bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-xl font-bold text-center mb-4">Editar Servicio</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" className="border p-2 rounded-xl" />
                    <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" className="border p-2 rounded-xl" />
                    <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duración (min)" className="border p-2 rounded-xl" />
                    <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Precio" className="border p-2 rounded-xl" />
                    <div className="flex justify-end gap-2">

                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 cursor-pointer  text-white p-2 rounded">Guardar</button>
                    <button type="button" onClick={() => setModalIsOpen(false)} className="bg-gray-500 hover:bg-gray-600 cursor-pointer text-white p-2 rounded">Cancelar</button>
                    </div>
                </form>
            </Modal>
        </tr>
    );
};

export default Service;
