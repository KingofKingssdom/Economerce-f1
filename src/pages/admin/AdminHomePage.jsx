import "../../styles/index.css"
import DashboardOverview from "../../components/admin/ui/DashboardOverview"
function AdminHomePage() {
    return (
        <>
            <div className="container-home-admin">
                <DashboardOverview />
                {/* <SummaryAnalytic /> */}
                {/* <ListOrder />
                <div className="container-table-order">

                </div> */}
            </div>
        </>
    )
}
export default AdminHomePage