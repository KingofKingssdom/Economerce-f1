import "../styles/index.css"
import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import { IoIosArrowUp } from "react-icons/io";
import UserLayout from "../components/users/layouts/UserLayout";
import AdminLayout from "../components/admin/layouts/AdminLayout";

import Login from "../components/users/features/login/Login";
import AdminLogin from "../components/admin/features/login/Login"
// import AddProductSpecificationDetail from "../components/admin/features/products/AddProductSpecification";
import AdminProtectedRoute from "./AdminProtectedRoute"


import { ImImage } from "react-icons/im";
import UserRouters from "../components/users/routers/UserRouters";
import AdminRouters from "../components/admin/routers/AdminRouters"
function AppRouters() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <>
            <Routes>

                {/* Layout User */}
                <Route element={<UserLayout />}>
                    {UserRouters}
                </Route>

                { }
                <Route path="/login" element={<Login />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                {/* Layout Admin */}
                <Route path="/admin" element={<AdminLayout />}>
                    {AdminRouters}

                </Route>



            </Routes>


            {showButton && (
                <div className="button-scroll-top" onClick={handleScrollToTop}>
                    <IoIosArrowUp className="icon-scroll" />
                    <p>Lên đầu</p>
                </div>
            )}

        </>
    )
}
export default AppRouters;