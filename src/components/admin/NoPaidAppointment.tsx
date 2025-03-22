import { convertDateToDDMMYY, convertDateToHHMM } from "../../helpers/converters";
import { useAppointments } from "../../hooks/useAppointments";
import Swal from "sweetalert2";

const NoPaidAppointment = ({ data, refreshData }) => {

    const { deleteAppointment, updateAppointment } = useAppointments();

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
                userId: data.clientId
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
                <p className="text-sm">{convertDateToDDMMYY(data.date)} | {convertDateToHHMM(data.date)} HS</p>
            </th>
            <th className="px-4 py-2">
                <span className="text-red-700 rounded-md text-sm">No hay pago</span>
            </th>
            <th className="px-4 py-2">
                <input 
                    type="checkbox" 
                    onChange={handleAppointmentToPaid} 
                    className="cursor-pointer transform scale-125"
                    checked={false}
                />
            </th>
            <th className="px-4 py-2">
                <button
                    className="text-red-700 border-red-700 hover:text-white hover:bg-red-700 hover:w-full border rounded-md p-2 w-[90%] cursor-pointer transform duration-300"
                    onClick={handleDelete}
                >
                    Eliminar Turno
                </button>
            </th>
        </tr>
    );
};

export default NoPaidAppointment;
