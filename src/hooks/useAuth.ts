import handleApi from "../api/handleApi";
import useAuthStore from "../store/useAuthStore";
import Swal from 'sweetalert2';

interface User {
    email: string;
    password: string;
    name?: string;
}

export const useAuth = () => {

    const { onLogin, onLogout } = useAuthStore();

    const logIn = async ({ email, password }:User) => {
        try {
            const { data } = await handleApi.post('/auth/login', { email, password });
            const user = { uid: data.uid, name: data.name, isAdmin: data.isAdmin };
            onLogin(user, data.token);
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: `Bienvenido de vuelta, ${user.name}!`,
                showConfirmButton: false, 
                timer: 1500,             
            });
            return data.ok;
        } catch (error) {
            const data = error.response?.data || {};
            Swal.fire({
                icon: 'error',
                title: 'Error al iniciar sesión',
                text: data.msg || 'Error desconocido',
                showConfirmButton: false, 
                timer: 1500,             
            });
        }
    };


    const logOut = async () => {
        try {
            onLogout();
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };


    const register = async ({ email, password, name }:User) => {
        try {
            const { data } = await handleApi.post('/auth/register', { email, password, name });
            const user = { uid: data.uid, name: data.name, isAdmin: data.isAdmin };
            onLogin(user, data.token);
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: `Bienvenido ${user.name}!`,
                showConfirmButton: false, 
                timer: 1500,             
            });
            return data.ok;
        } catch (error) {
            const data = error.response?.data || {};
            Swal.fire({
                icon: 'error',
                title: 'Error al registrarse',
                text: data.msg || 'Error desconocido',
                showConfirmButton: false, 
                timer: 1500,             
            });
        }
    };


    const getUserById = async ( clientId:string ) => {
        try {
            const { data } = await handleApi.get(`/auth/users/${clientId}`);
            return data.user;
        } catch (error) {
            console.log(error);
        }
    }

    const getAllUsers = async () => {
        try {
            const { data } = await handleApi.get('/auth/users');
            return data.users;
        } catch (error) {
            console.log(error);
        }
    }

    return {
        getAllUsers,
        getUserById,
        logIn,
        logOut,
        register
    }
}