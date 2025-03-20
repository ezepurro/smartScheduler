import { useEffect, useState } from "react";
import { useServices } from "../../hooks/useServices";
import { useBusinessSettings } from "../../hooks/useBusinessSettings";
import Date from "./Date";
import Swal from "sweetalert2";
import Modal from "react-modal";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 

const DateList = () => {

    const { getAllServices } = useServices();
    const { getServiceDates, addDateToServiceAvailability } = useBusinessSettings();
    const [dates, setDates] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null); 

    const fetchDates = async (serviceId) => {
        const fetchedDates = await getServiceDates(serviceId);
        setDates(fetchedDates);
    };

    useEffect(() => {
        const chooseCalendar = async () => {
            try {
                const services = await getAllServices();
                if (!services) {
                    // decir que no hay servicios, tmb en DateList
                }
                const inputOptions = services.reduce((options, service) => {
                    options[service.id] = service.name;
                    return options;
                }, {});

                const { value: service } = await Swal.fire({
                    title: "Seleccione servicio",
                    input: "radio",
                    inputOptions,
                    confirmButtonText: "Seleccionar",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    inputValidator: (value) => {
                        if (!value) {
                            return "Por favor, seleccione servicio";
                        }
                    },
                });

                if (service) {
                    setSelectedService(service);
                    fetchDates(service); 
                }
            } catch (error) {
                console.error("Error fetching services: ", error);
            }
        };

        chooseCalendar();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddDate = async () => {
        if (!selectedDate) {
            Swal.fire("Error", "Por favor, seleccione una fecha", "error");
            return;
        }

        try {
            await addDateToServiceAvailability(selectedService, selectedDate);
            setIsModalOpen(false); 
            fetchDates(selectedService); 
            Swal.fire({
                icon: "success",
                title: "Fecha añadida",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error("Error adding date: ", error);
            Swal.fire("Error", "No se pudo añadir la fecha", "error");
        }
    };

    return (
        <div className="p-4 w-full">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-[500]">Gestión de Fechas para turnos</h1>
                <button
                    onClick={openModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer transform duration-300">
                    <span className="font-[600]">+</span> Añadir Fecha
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-center">
                    <thead className="bg-brand-primary text-brand-secondary">
                        <tr>
                            <th className="px-4 py-2">Fecha</th>
                            <th className="px-4 py-2">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dates.map((date, index) => (
                            <Date data={date} serviceId={selectedService} refreshData={fetchDates} key={index} />
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Añadir Fecha"
                className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full"
                overlayClassName="fixed inset-0 bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-xl font-[500] mb-4">Añadir Fecha para el Servicio</h2>
                <div className="mb-4 w-full">
                    <label htmlFor="date-picker" className="block text-sm">Seleccione la fecha:</label>
                    <DatePicker
                        id="date-picker"
                        selected={selectedDate}
                        onChange={setSelectedDate}
                        className="border p-2 w-full mb-2 rounded-xl"
                        placeholderText="Seleccionar fecha"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={closeModal}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transform duration-300">
                        Cancelar
                    </button>
                    <button
                        onClick={handleAddDate}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transform duration-300">
                        Añadir
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default DateList;
