import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import User from "./User";
import Swal from "sweetalert2";

interface User {
    id: string;
    name: string;
    isAdmin: boolean;
    isEmployee: boolean;
}

const UserList = () => {
    const { getAllUsers } = useAuth();
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const limit = 10;

    const fetchUsers = async () => {
        const users = await getAllUsers();
        setAllUsers(users);
        setFilteredUsers(users);
    };

    useEffect(() => {
        Swal.fire({
            title: "Cargando usuarios...",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true
        });
        fetchUsers();
    }, []);

    // Filtrar usuarios por búsqueda
    useEffect(() => {
        const filtered = allUsers.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
        setCurrentPage(1);
    }, [searchQuery, allUsers]);

    // Memoizar estadísticas para evitar recálculos innecesarios
    const totalAdmins = useMemo(() => allUsers.filter(user => user.isAdmin).length, [allUsers]);
    const totalEmployees = useMemo(() => allUsers.filter(user => user.isEmployee).length, [allUsers]);

    const totalAdminsRequired = 3;
    const totalEmployeesRequired = 4;

    // Paginación
    const totalPages = Math.ceil(filteredUsers.length / limit);
    const paginatedUsers = filteredUsers.slice((currentPage - 1) * limit, currentPage * limit);

    return (
        <div className="p-4 w-full">
            <h1 className="text-center text-xl font-[500] mb-4">Gestión de Usuarios</h1>
        
            <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border rounded mb-4"
            />

            <p className="text-center text-sm text-gray-600 mb-4">
                {totalEmployees}/{totalEmployeesRequired} empleados disponibles - {totalAdmins}/{totalAdminsRequired} administradores disponibles
            </p>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-center">
                    <thead className="bg-brand-primary text-brand-secondary">
                        <tr>
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Ver turnos</th>
                            <th className="px-4 py-2">Empleado</th>
                            <th className="px-4 py-2">Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.map((user, index) => (
                            <User
                                data={user}
                                key={index}
                                refreshData={fetchUsers} 
                                page={currentPage}
                                limits={{
                                    totalAdmins,
                                    totalEmployees,
                                    totalAdminsRequired,
                                    totalEmployeesRequired
                                }}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Controles de paginación */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-2 bg-gray-300 hover:bg-gray-400 transform duration-300 cursor-pointer rounded disabled:opacity-50 disabled:cursor-default"
                    >
                        Anterior
                    </button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 mx-2 bg-gray-300 hover:bg-gray-400 transform duration-300 cursor-pointer rounded disabled:opacity-50 disabled:cursor-default"
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserList;
