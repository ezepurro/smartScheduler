import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import { useState } from 'react';

const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    
    const { 
        name, 
        email, 
        password1, 
        password2, 
        onInputChange, 
        isFormValid, 
        nameValid, 
        emailValid, 
        password1Valid, 
        password2Valid 
    } = useForm(
        {
            name: '',
            email: '',
            password1: '',
            password2: '',
        },
        {
            name: [(value: string) => value.length > 0, 'El nombre es requerido'],
            email: [(value: string) => /\S+@\S+\.\S+/.test(value), 'El email ingresado es inválido'],
            password1: [(value: string) => value.length >= 6, 'La contraseña debe tener más de 6 caracteres'],
            password2: [(value: string) => value === password1, 'Las contraseñas no coinciden'],
        }
    );

    // Estados para saber si el campo ha sido tocado
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password1: false,
        password2: false,
    });

    const handleBlur = (field: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (isFormValid) {
            const ok = await register({ name, email, password: password1 });
            if (ok) {
                navigate('/');
            }
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-brand-primary text-brand-text p-5 md:p-0">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-bold">Registrarse</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="name">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={onInputChange}
                            onBlur={() => handleBlur('name')}
                            className="w-full rounded-lg border border-gray-300 p-2"
                            required
                        />
                        {touched.name && nameValid && <p className="text-red-500 text-xs">{nameValid}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="email">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            onBlur={() => handleBlur('email')}
                            className="w-full rounded-lg border border-gray-300 p-2"
                            required
                        />
                        {touched.email && emailValid && <p className="text-red-500 text-xs">{emailValid}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="password1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password1"
                            name="password1"
                            value={password1}
                            onChange={onInputChange}
                            onBlur={() => handleBlur('password1')}
                            className="w-full rounded-lg border border-gray-300 p-2"
                            required
                        />
                        {touched.password1 && password1Valid && <p className="text-red-500 text-xs">{password1Valid}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="password2">
                            Repita la contraseña
                        </label>
                        <input
                            type="password"
                            id="password2"
                            name="password2"
                            value={password2}
                            onChange={onInputChange}
                            onBlur={() => handleBlur('password2')}
                            className="w-full rounded-lg border border-gray-300 p-2"
                            required
                        />
                        {touched.password2 && password2Valid && <p className="text-red-500 text-xs">{password2Valid}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-brand-primary p-2 text-white hover:bg-brand-primary-hover cursor-pointer"
                        disabled={!isFormValid}
                    >
                        Registrarse
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    ¿Tienes cuenta?{' '}
                    <a href="/auth/login" className="text-sky-600 hover:underline">
                        Iniciar Sesión
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
