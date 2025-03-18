import { useBusinessSettings } from "../../hooks/useBusinessSettings";
import { convertDateToDDMMYY } from "../../data/converters";
import Swal from "sweetalert2";

const Date = ({ data, serviceId, refreshData }) => {

    const { deleteDateFromServiceAvailability } = useBusinessSettings();

    const handleDelete = async () => {
        await deleteDateFromServiceAvailability(serviceId, data);
        refreshData(serviceId);
        Swal.fire({
            icon: 'success',
            title: "Fecha eliminada",
            showConfirmButton: false,
            timer: 1500,
        });
    }

    return (
        <tr className="p-4 border-b-gray-300 border-b text-center">
            <th className="px-4 py-2">
                <p className="text-lg font-semibold">{convertDateToDDMMYY(data)}</p>
            </th>
            <th className="px-4 py-2">
                <button
                    className="bg-red-700 text-white rounded-md hover:bg-red-800 p-2 cursor-pointer disabled:bg-gray-300 disabled:cursor-default"
                    onClick={handleDelete}
                >
                    Eliminar Turno
                </button>
            </th>
        </tr>
    )
}

export default Date;
