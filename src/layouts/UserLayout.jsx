import { Outlet } from "react-router-dom";
import "../styles/index.css"
import Header from "./user/Header";

function UserLayout() {
    return (
        <>
            <Header />
            <div className="main-layout-container">
                <div className="main-layout-left">

                </div>
                <div className="main-layout-center">
                    <Outlet />
                </div>
                <div className="main-layout-right">

                </div>
            </div>
        </>
    )
}
export default UserLayout;