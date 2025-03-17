import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import { useState } from 'react';

const LoginPage = () => {
    const { logIn } = useAuth();
    const navigate = useNavigate();

    const { 
        email, 
        password, 
        onInputChange, 
        isFormValid, 
        emailValid, 
        passwordValid 
    } = useForm(
        {
            email: '',
            password: '',
        },
        {
            email: [(value: string) => /\S+@\S+\.\S+/.test(value), 'El email ingresado es inválido'],
            password: [(value: string) => value.length >= 6, 'La contraseña debe tener más de 6 caracteres'],
        }
    );

    // Estados para saber si el campo ha sido tocado
    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });

    const handleBlur = (field: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (isFormValid) {
            const ok = await logIn({ email, password });
            if (ok) {
                navigate('/');
            }
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-brand-primary text-brand-text p-5 md:p-0">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-bold">Iniciar sesión</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
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
                        <label className="mb-1 block text-sm font-medium" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            onBlur={() => handleBlur('password')}
                            className="w-full rounded-lg border border-gray-300 p-2"
                            required
                        />
                        {touched.password && passwordValid && <p className="text-red-500 text-xs">{passwordValid}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-brand-primary p-2 text-white hover:bg-brand-primary-hover cursor-pointer"
                        disabled={!isFormValid}
                    >
                        Iniciar sesión
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    ¿No tienes cuenta?{' '}
                    <a href="/auth/register" className="text-sky-600 hover:underline">
                        Regístrate
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
