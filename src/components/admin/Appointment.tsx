import { useState } from "react";
import { convertDateToDDMMYY, convertDateToHHMM } from "../../helpers/converters";
import { useAppointments } from "../../hooks/useAppointments";
import Swal from "sweetalert2";
import AppointmentRescheduleForm from "./AppointmentRescheduleForm";

const Appointment = ({ data, refreshData }) => {
  const { deleteAppointment, updateAppointment } = useAppointments();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteAppointment(data.id);
      refreshData();
    } catch (error) {
      console.error("Error eliminando el turno:", error);
    }
  };

  const handleAppointmentToPaid = async () => {
    try {
      const updatedData = {
        id: data.id,
        status: "paid",
        userId: data.clientId,
      };
      const isUpdated = await updateAppointment(updatedData);
      if (isUpdated) {
        Swal.fire({
          icon: "success",
          title: "Seña marcada como pagada",
          showConfirmButton: false,
          timer: 1500,
        });
        refreshData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr className="p-4 border-b-gray-300 border-b">
      <th className="px-4 py-2 text-left">
        <p className="text-lg font-semibold">{data.clientName}</p>
        <p className="text-sm text-gray-600">+{data.contact}</p>
      </th>
      <th className="px-4 py-2">
        <p className="text-sm">{data.serviceName}</p>
      </th>
      <th className="px-4 py-2">
        <p className="text-sm">
          {convertDateToDDMMYY(data.date)} | {convertDateToHHMM(data.date)} HS
        </p>
      </th>
      <th className="px-4 py-2">
        <span
          className={`${
            data.status === "pending" ? "text-yellow-500" : "text-green-700"
          } rounded-md text-sm`}
        >
          {data.status === "pending" ? "Pendiente de pago" : "Seña pagada"}
        </span>
      </th>
      <th className="px-4 py-2">
        {data.status === "pending" ? (
          <button
            className="bg-green-700 text-white rounded-md hover:bg-green-800 p-2 cursor-pointer transform duration-300"
            onClick={handleAppointmentToPaid}
          >
            Marcar como Pago
          </button>
        ) : (
          <button
            className="text-cyan-700 border-cyan-700 hover:text-white hover:bg-cyan-700 hover:w-full border rounded-md p-2 w-[90%] cursor-pointer transform duration-300"
            onClick={() => setShowModal(true)}
          >
            Reagendar Turno
          </button>
        )}
      </th>
      <th className="px-4 py-2">
        <button
          className="text-red-700 border-red-700 hover:text-white hover:bg-red-700 hover:w-full border rounded-md p-2 w-[90%] cursor-pointer transform duration-300"
          disabled={data.status === "pending"}
          onClick={handleDelete}
        >
          Eliminar Turno
        </button>
      </th>

      <AppointmentRescheduleForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        appointment={data}
        refreshData={refreshData}
      />
    </tr>
  );
};

export default Appointment;
