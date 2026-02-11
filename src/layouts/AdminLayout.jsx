import { Outlet } from "react-router-dom";
import "../styles/index.css"
import Sidebar from "./admin/Sidebar"
import AdminHeader from "./admin/AdminHeader";
function AdminLayout() {

    return (
        <>
            <div className="container-admin">
                <Sidebar />

                <div className="layout-admin-rigth">
                    <AdminHeader />
                    <Outlet />
                </div>

            </div>
        </>
    )
}
export default AdminLayout