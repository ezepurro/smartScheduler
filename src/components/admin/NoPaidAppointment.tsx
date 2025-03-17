
const NoPaidAppointment = () => {
  return (
    <tr className="p-4 border-b-gray-300 border-b">
            <th className="px-4 py-2">
                <p className="text-lg font-semibold">Juan Pérez</p>
                <p className="text-sm text-gray-600">+54 9 11 1234-5678</p>
            </th>
            <th className="px-4 py-2">
                <p className="text-sm">Corte de Pelo</p>
            </th>
            <th className="px-4 py-2">
                <p className="text-sm">25/03/2025 | 10:00 HS</p></th>
            <th className="px-4 py-2">
                <span className="text-red-500 rounded-md">No hay pago</span>
            </th>
            <th className="px-4 py-2">
                <button className="bg-red-400 text-white rounded-md hover:bg-red-500 p-2 cursor-pointer">
                    Eliminar Turno
                </button>
            </th>
        </tr>
  )
}

export default NoPaidAppointment;
