import NoPaidAppointment from "./NoPaidAppointment";


const NoPaidAppointmentList = () => {
    return (
        <div className="p-4 w-full">
        <h1 className="text-center text-2xl font-bold mb-4">Gestión de Turnos sin Seña</h1>
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-left">
                <thead className="bg-brand-primary text-brand-secondary">
                    <tr>
                        <th className="px-4 py-2">Cliente y Contacto</th>
                        <th className="px-4 py-2">Tipo de Turno</th>
                        <th className="px-4 py-2">Fecha y Hora</th>
                        <th className="px-4 py-2">Estado del Turno</th>
                        <th className="px-4 py-2">Eliminar Turno</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapeo de los turnos */}
                    <NoPaidAppointment />
                    <NoPaidAppointment />
                    <NoPaidAppointment />
                    <NoPaidAppointment />
                    <NoPaidAppointment />
                </tbody>
            </table>
        </div>

        {/* Paginación */}
        <div className="flex justify-center mt-4">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-2" disabled>
                Anterior
            </button>
            <span className="mx-2">Página 1 de 1</span>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md" disabled>
                Siguiente
            </button>
        </div>
    </div>
    )
}

export default NoPaidAppointmentList;
