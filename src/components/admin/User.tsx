import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useAuthStore from "../../store/useAuthStore";
import UserAppointmentList from "./UserAppointmentList";

const User = ({ data, refreshData, page }) => {
    const { user } = useAuthStore();
    const { updateUserById } = useAuth();
    const [ modalIsOpen, setModalIsOpen ] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const makeAdmin = async () => {
        try {
            await updateUserById({ ...data, isAdmin: true }, data.id);
            refreshData(page);
        } catch (error) {
            console.error(error);
        }
    };

    const cancelAdmin = async () => {
        try {
            await updateUserById({ ...data, isAdmin: false }, data.id);
            refreshData(page);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <tr className="p-4 border-b-gray-300 border-b text-center">
                <th className="px-4 py-2 text-left">
                    <p className="text-lg font-semibold">{data.name}</p>
                </th>
                <th className="px-4 py-2">
                    <p className="text-sm text-left">{data.email}</p>
                </th>
                <th className="px-4 py-2">
                    <button 
                        className="bg-cyan-700 text-white rounded-md hover:bg-cyan-800 p-2 cursor-pointer transform duration-300"
                        onClick={openModal}
                    >
                        Ver turnos
                    </button>
                </th>
                <th className="px-4 py-2">
                    <button className="bg-orange-500 text-white rounded-md hover:bg-orange-600 p-2 cursor-pointer transform duration-300">
                        Añadir empleado
                    </button>
                </th>
                <th className="px-4 py-2">
                    {!data.isAdmin ? (
                        <button
                            className="bg-red-700 text-white rounded-md hover:bg-red-800 p-2 cursor-pointer transform duration-300"
                            onClick={makeAdmin}
                        >
                            Hacer admin
                        </button>
                    ) : (
                        <button
                            className="bg-yellow-700 text-white rounded-md hover:bg-yellow-800 p-2 cursor-pointer disabled:bg-gray-400 disabled:cursor-default transform duration-300"
                            disabled={user.uid === data.id}
                            onClick={cancelAdmin}
                        >
                            Quitar admin
                        </button>
                    )}
                </th>
            </tr>
            
            <UserAppointmentList 
                isOpen={modalIsOpen} 
                closeModal={closeModal} 
                data={data} 
            />
        </>
    );
};

export default User;