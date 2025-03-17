
const HomePage = () => {
    return (
        <div className="bg-black h-screen text-center text-white">
            <h1 className="text-6xl py-10">HomePage</h1>
            <ul>
                <li className="mb-5"><a href="/admin" className="text-xl text-blue-500 border-b">Ir al admin</a></li>
                <li className="mb-5"><a href="/auth/login" className="text-xl text-blue-500 border-b">Ir a inicio de sesión</a></li>
                <li className="mb-5"><a href="/auth/register" className="text-xl text-blue-500 border-b">Ir a registrarse</a></li>
            </ul>   
        </div>
    )
}

export default HomePage;