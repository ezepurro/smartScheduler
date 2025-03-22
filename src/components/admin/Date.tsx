import { useBusinessSettings } from "../../hooks/useBusinessSettings";
import { convertDateToDDMMYY } from "../../helpers/converters";
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
                    className="text-red-700 border-red-700 hover:text-white hover:bg-red-700 hover:w-full border rounded-md p-2 w-[90%] cursor-pointer transform duration-300"
                    onClick={handleDelete}
                >
                    Eliminar Turno
                </button>
            </th>
        </tr>
    )
}

export default Date;
