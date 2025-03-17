import Appointment from "./Appointment";

const AppointmentList = () => {
    return (
        <div className="p-4 w-full">
            <h1 className="text-center text-2xl font-bold mb-4">Gestión de Turnos</h1>

            {/* Botón para recargar datos */}
            {/* <div className="text-center mb-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Recargar Datos
                </button>
            </div> */}

            {/* Búsqueda de turnos */}
            {/* <div className="mb-4 flex justify-center">
                <div className="flex items-center border-2 border-gray-300 rounded-md p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M13.293 12.293a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L10.586 13H6a1 1 0 1 1 0-2h4.586l-1.707-1.707a1 1 0 1 1 1.414-1.414l3 3z" clipRule="evenodd" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Buscar por cliente..."
                        className="p-2 border-none focus:outline-none"
                    />
                </div>
            </div> */}

            {/* Tabla de turnos */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-left">
                    <thead className="bg-brand-primary text-brand-secondary">
                        <tr>
                            <th className="px-4 py-2">Cliente y Contacto</th>
                            <th className="px-4 py-2">Tipo de Turno</th>
                            <th className="px-4 py-2">Fecha y Hora</th>
                            <th className="px-4 py-2">Estado del Turno</th>
                            <th className="px-4 py-2">Gestionar Turno</th>
                            <th className="px-4 py-2">Eliminar Turno</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapeo de los turnos */}
                        <Appointment />
                        <Appointment />
                        <Appointment />
                        <Appointment />
                        <Appointment />
                        <Appointment />
                        <Appointment />
                        <Appointment />
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
    );
}

export default AppointmentList;
