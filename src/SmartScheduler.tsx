import { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import handleApi from "./api/handleApi";
import useAuthStore from "./store/useAuthStore";

const SmartScheduler = () => {

  const { onLogin, onLogout, isAuthenticated } = useAuthStore();

  const renewToken = async () => {

    const token = localStorage.getItem('token');
    if (!token) return onLogout();

    try {
      const { data } = await handleApi.get('/auth/renew');
      if (data.ok) {
        onLogin({ uid: data.uid, name: data.name, isAdmin: data.isAdmin }, data.token);
      }
    } catch {
      onLogout();
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      renewToken();
    }
  }, [])

  return (
    <AppRouter />
  )
}

export default SmartScheduler;