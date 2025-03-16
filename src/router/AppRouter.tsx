import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AdminPage from "../pages/admin/AdminPage";
import HomePage from "../pages/home/HomePage";

const AppRouter = () => {

    const isAuthenticated = true;
    const user = {
        isAdmin: true
    }

    return (
        <Routes>
        {
            (!isAuthenticated)
            ?
            <>
                {/* Auth Routes */}
                <Route path="/auth/login" element={ <LoginPage /> } />
                <Route path="/auth/register" element={ <RegisterPage /> } />

                {/* Home Routes */}
                <Route path="/" element={ <HomePage /> } />
                <Route path="/*" element={ <Navigate to="/" /> } />
            </>
            :
            <>
                {/* Home Routes */}
                <Route path="/" element={ <HomePage /> } />
                <Route path="/*" element={ <Navigate to="/" /> } />

                {/* Admin Routes */}
                {user.isAdmin && ( 
                <Route path="/admin" element={<AdminPage />} />
                )}
            </>
        }
        </Routes>
    )
}

export default AppRouter;