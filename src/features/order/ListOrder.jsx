import "../../styles/index.css"
import { getOrder } from "../../services/ApiOrder";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye, MdDeleteOutline } from "react-icons/md";
import { GoPencil } from "react-icons/go";
function ListOrder() {
    const [orders, setOrders] = useState([]);
    const [idOrder, setIdOrder] = useState(0);
    const [toggle, setToggle] = useState(false);

    const fetchOrders = async () => {
        try {
            await getOrder().then((response) => {
                setOrders(response.data)
            })
        } catch (error) {
            console.log("Lỗi lấy toàn bộ đơn hàng " + error)
        }
    }
    useEffect(() => {
        fetchOrders();
    }, [])

    const statusMap = {
        PENDING: { text: "Chờ xác nhận", color: "orange" },
        CONFIRMED: { text: "Đã xác nhận", color: "blue" },
        SHIPPING: { text: "Đang giao", color: "purple" },
        DELIVERED: { text: "Hoàn thành", color: "green" },
        CANCELLED: { text: "Đã hủy", color: "red" },
        PAID: { text: "Đã thanh toán", color: "green" },
        UNPAID: { text: "Chưa thanh toán", color: "red" },
        COD: { text: "Tiền mặt", color: "purple" },
        VNPAY: { text: "Ví VNPay", color: "blue" },
    };
    return (
        <>
            <div className="container-admin">
                <div className="content-list-order">
                    <h1>Danh sách đơn hàng</h1>
                    <div className="tb-list-order">
                        <table className="">
                            <thead>
                                <tr>
                                    <th>Mã đơn hàng</th>
                                    <th>Tên đơn hàng</th>
                                    <th>Ngày cập nhập</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái</th>
                                    <th>Phương thức</th>
                                    <th>Thanh toán</th>
                                    <th>Người mua</th>
                                    <th>Liên hệ</th>
                                    <th>Email</th>

                                    <th className="repair-table">Xem chi tiết</th>
                                    <th className="repair-table">Chỉnh sửa</th>
                                    <th className="repair-table">Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={order.id || index}>
                                        <td>{order.id}</td>
                                        <td>{order.orderName}</td>
                                        <td>{new Date(order.dayCreate).toLocaleDateString("vi-VN")}</td>
                                        <td>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.totalPrice)}</td>
                                        <td style={{ color: statusMap[order.status]?.color }}>
                                            {statusMap[order.status]?.text}
                                        </td>
                                        <td style={{ color: statusMap[order.paymentMethod]?.color }}>
                                            {statusMap[order.paymentMethod]?.text}
                                        </td>
                                        <td style={{ color: statusMap[order.paymentStatus]?.color }}>
                                            {statusMap[order.paymentStatus]?.text}
                                        </td>


                                        <td>{order.fullName}</td>
                                        <td>{order.phoneNumber}</td>
                                        <td>{order.email}</td>
                                        <td>
                                            <Link to={`/admin/productDetail/${order.id}`}>
                                                <button className="btn btn-success">
                                                    <MdOutlineRemoveRedEye />
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-warning"
                                                onClick={() => { handleAcceptOrder(order.id) }}
                                            >
                                                <GoPencil />

                                            </button>

                                        </td>
                                        <td>
                                            {/* onClick={() => handleDelete(product.id)} */}
                                            <div className="btn btn-danger">
                                                <MdDeleteOutline />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={`container-box-seclect-order ${toggle ? "show-box-select-order" : ""}`}>
                    {toggle && (
                        <UpdateOrder
                            id={idOrder}
                            isOpen={toggle}
                            onUpdateSuccess={handleUpdateSuccess}
                        />
                    )}
                </div>
            </div>
        </>
    )
}
export default ListOrder;