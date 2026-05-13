import { Outlet } from "react-router-dom";
import "../../../styles/index.css"
import Sidebar from "./Sidebar"
function AdminLayout() {
    return (
        <>
            <div className="container-admin">
                <Sidebar />
                <div className="layout-admin-rigth">
                    <Outlet />
                </div>

            </div>
        </>
    )
}
export default AdminLayout