import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import User from "./User";
import Swal from "sweetalert2";

const UserList = () => {

    const { getAllUsersPaginated } = useAuth();
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    const fetchUsers = async (page: number) => {
        Swal.fire({
            title: "Cargando usuarios",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true
        });
        const { users, totalPages, currentPage } = await getAllUsersPaginated(page, limit);
        setUsers(users);
        setTotalPages(totalPages);
        setCurrentPage(currentPage);
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    return (
        <div className="p-4 w-full">
            <h1 className="text-center text-xl font-[500] mb-4">Gestión de Usuarios</h1>
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
                        {users.map((user, index) => (
                            <User data={user} key={index} refreshData={fetchUsers} page={currentPage} />
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserList;
