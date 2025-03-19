import { useState, useEffect } from "react";
import { useAppointments } from "../../hooks/useAppointments";
import { setHours, setMinutes } from "date-fns";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";

Modal.setAppElement("#root");

const AppointmentRescheduleForm = ({ isOpen, onClose, appointment, refreshData }) => {
    const [startDate, setStartDate] = useState(null);
    const { updateAppointment } = useAppointments();

    useEffect(() => {
        if (appointment) {
            setStartDate(new Date(appointment.date));
        }
    }, [appointment]);

    const handleDateChange = (date) => {
        setStartDate(date);
    };

    const handleSaveChanges = async () => {
        if (!startDate) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Debe completar todos los campos",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        try {
            const updatedData = {
                id: appointment.id,
                date: startDate,
                userId: appointment.clientId,
            };

            const isUpdated = await updateAppointment(updatedData);
            if (isUpdated) {
                refreshData();
            }
        } catch (error) {
            console.error(error);
        }

        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="bg-white p-6 rounded-lg  max-w-lg w-full "
            overlayClassName="fixed inset-0 bg-opacity-50 flex justify-center items-center"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Editar Turno de {appointment?.clientName}</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Contacto</label>
                    <input
                        type="text"
                        value={appointment?.contact || ""}
                        disabled
                        className="w-full border rounded-md p-2 bg-gray-100 text-gray-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Fecha y Hora</label>
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                        timeIntervals={10}
                        minDate={new Date()}
                        minTime={setHours(setMinutes(new Date(), 0), 9)}
                        maxTime={setHours(setMinutes(new Date(), 0), 20)}
                        className="w-full border rounded-md p-2"
                        withPortal
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transform duration-300"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSaveChanges}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transform duration-300"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </Modal>

    );
};

export default AppointmentRescheduleForm;
