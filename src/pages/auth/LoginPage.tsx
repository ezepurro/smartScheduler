const LoginPage = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-brand-primary text-brand-text p-5 md:p-0">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-bold">Iniciar sesión</h2>
                <form className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="email">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full rounded-lg border border-gray-300 p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full rounded-lg border border-gray-300 p-2"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-brand-primary p-2 text-white hover:bg-brand-primary-hover cursor-pointer"
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