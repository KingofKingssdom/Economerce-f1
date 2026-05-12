import "../../../styles/index.css"
import { FaCartPlus, FaUserGroup } from "react-icons/fa6";
import { FaMoneyBill, FaTasks } from "react-icons/fa";
import { getTotalProduct } from "../../../services/ApiProduct";
import { getCountOrder, getTotalPrice } from "../../../services/ApiOrder";
import { getCountUser } from "../../../services/ApiAuth";
import { useEffect, useState } from "react";
function DashboardOverview() {
    const [totalProduct, setTotalProduct] = useState(0);
    const [countOrder, setCountOrder] = useState(0);
    const [totalPrices, setTotalPrices] = useState(0);
    const [countUsers, setCountUsers] = useState(0);

    const fethCountUser = async () => {
        try {
            await getCountUser().then((response) => {
                setCountUsers(response.data)
            })

        } catch (error) {
            console.log("Lỗi gọi api đếm tổng số người dùng " + error)
        }
    }
    useEffect(() => {
        fethCountUser()
    }, [])
    const fethTotalPrice = async () => {
        try {
            await getTotalPrice(3).then((response) => {
                setTotalPrices(response.data)
            })

        } catch (error) {
            console.log("Lỗi gọi api tính tổng doanh thu " + error)
        }
    }
    useEffect(() => {
        fethTotalPrice()
    }, [])
    const fethCountOrder = async () => {
        try {
            await getCountOrder().then((response) => {
                setCountOrder(response.data)
            })

        } catch (error) {
            console.log("Lỗi gọi api đếm đơn hàng " + error)
        }
    }
    useEffect(() => {
        fethCountOrder()
    }, [])
    const fethTotalProduct = async () => {
        try {
            await getTotalProduct().then((response) => {
                setTotalProduct(response.data)
            })


        } catch (error) {
            console.log("Lỗi gọi api đếm sản phẩm " + error)
        }
    }
    useEffect(() => {
        fethTotalProduct()
    }, [])
    let total = 1000;
    return (
        <>
            <div className="container-summary">
                <div className="box-content-summary">
                    <div className="content-summary">
                        <div className="icon-order">
                            <FaCartPlus />
                        </div>
                        <p>Tổng đơn hàng</p>
                        <h3>{countOrder.toLocaleString('en-US')}</h3>
                    </div>

                </div>
                <div className="box-content-summary">
                    <div className="content-summary">
                        <div className="icon-revenue">
                            < FaMoneyBill />
                        </div>
                        <p>Tổng doanh thu</p>
                        <h3>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                            totalPrices)}</h3>
                    </div>

                </div>
                <div className="box-content-summary">
                    <div className="content-summary">
                        <div className="icon-product">
                            < FaTasks />
                        </div>
                        <p>Tổng sản phẩm</p>
                        <h3>{totalProduct}</h3>
                    </div>

                </div>
                <div className="box-content-summary">
                    <div className="content-summary">
                        <div className="icon-user">
                            < FaUserGroup />
                        </div>
                        <p>Tổng người dùng</p>
                        <h3>{countUsers.toLocaleString('en-US')}</h3>
                    </div>

                </div>
            </div>
        </>
    )
}
export default DashboardOverview