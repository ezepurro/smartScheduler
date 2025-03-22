import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useAuthStore from "../../store/useAuthStore";
import UserAppointmentList from "./UserAppointmentList";
import AddEmployeeModal from "./AddEmployeeModal";

const User = ({ data, refreshData, page }) => {
    const { user } = useAuthStore();
    const { updateUserById } = useAuth();
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ employeeModalIsOpen, setEmployeeModalIsOpen ] = useState(false);
    const [ isAdmin, setIsAdmin ] = useState(data.isAdmin);
    const [ isEmployee, setIsEmployee ] = useState(data.isEmployee || false);

    const toggleAdmin = async () => {
        try {
            const newAdminStatus = !isAdmin;
            await updateUserById({ ...data, isAdmin: newAdminStatus }, data.id);
            setIsAdmin(newAdminStatus);
            refreshData(page);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleEmployee = async () => {
        try {
            const newEmployeeStatus = !isEmployee;
            if (newEmployeeStatus) setEmployeeModalIsOpen(true);
            await updateUserById({ ...data, isEmployee: newEmployeeStatus }, data.id);
            setIsEmployee(newEmployeeStatus);
            refreshData(page);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <tr className="p-4 border-b-gray-300 border-b text-center">
                <th className="px-4 py-2 text-left">
                    <button onClick={() => setModalIsOpen(true)} className="cursor-pointer hover:text-cyan-600 hover:underline transform duration-300">
                        <p className="text-lg font-semibold">{data.name}</p>
                    </button>
                </th>
                <th className="px-4 py-2">
                    <p className="text-sm text-left">{data.email}</p>
                </th>
                <th className="px-4 py-2">
                    <button 
                        className="text-cyan-700 border-cyan-700 hover:text-white hover:bg-cyan-700 hover:w-full border rounded-md p-2 w-[90%] cursor-pointer transform duration-300"
                        onClick={() => setModalIsOpen(true)}
                    >
                        Ver turnos
                    </button>
                </th>
                <th className="px-4 py-2">
                    <input
                        type="checkbox"
                        checked={isEmployee}
                        onChange={toggleEmployee}
                        className="cursor-pointer"
                    />
                </th>
                <th className="px-4 py-2">
                    <input
                        type="checkbox"
                        checked={isAdmin}
                        onChange={toggleAdmin}
                        className="cursor-pointer"
                        disabled={user.uid === data.id}
                    />
                </th>
            </tr>
            
            <UserAppointmentList 
                isOpen={modalIsOpen} 
                closeModal={() => setModalIsOpen(false)} 
                data={data} 
            />

            <AddEmployeeModal 
                isOpen={employeeModalIsOpen} 
                closeModal={() => setEmployeeModalIsOpen(false)} 
            />
        </>
    );
};

export default User;
