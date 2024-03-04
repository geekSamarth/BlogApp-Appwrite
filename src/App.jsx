import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { useEffect } from "react";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";
import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const userData = await authService.getCurrentUser();
        if(userData) dispatch(login({userData}))
        else dispatch(logout())
      setLoading(false)
      } catch (error) {
        console.log("Error in getting user: ",error);
      }
      // .then((userData) => {
      //   if (userData) {
      //     dispatch(login({userData}));
      //   } else {
      //     dispatch(logout());
      //   }
      // })
      // .finally(() => setLoading(false));
    })();
  }, []);
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between ">
      <div className="w-full block">
        <Header />
        <main className="bg-[#111111] min-h-screen flex justify-center items-center">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster position="top-right" />
    </div>
  ) : null;
}

export default App;
