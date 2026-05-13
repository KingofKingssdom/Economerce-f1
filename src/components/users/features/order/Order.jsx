import "../../../../styles/index.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye, MdDeleteOutline } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { deleteOrderByOrderId, getAllOrderByUserId } from "../../../../services/ApiOrder";
import { getUserCurrent } from "../../../../services/ApiAuth";
function Order() {
    const [orders, setOrders] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [user, setUser] = useState(null);
    useEffect(() => {
        getUserCurrent().then((response) => {
            setUser(response);
        })
    }, [])
    useEffect(() => {
        if (user?.id) {
            fetchOrders();
        }
    }, [user]);
    const fetchOrders = async () => {
        try {
            await getAllOrderByUserId(Number(user.id)).then((response) => {
                setOrders(response.data)
            })

        } catch (error) {
            console.error("Lỗi gọi API lấy danh sách đơn hàng:", error);
        }
    };




    const handleOpenConfirm = (id) => {
        setSelectedOrderId(id);
        setShow(true);
    };


    const handleConfirmDelete = async () => {
        if (!selectedOrderId) return;

        try {
            await deleteOrderByOrderId(selectedOrderId);
            setShow(false);
            setSelectedOrderId(null);
            alert("Đơn hàng đã được xóa")
            fetchOrders(); // Cập nhật lại danh sách đơn
        } catch (error) {
            console.error("Lỗi khi xóa đơn hàng:", error);
            alert("Có lỗi xảy ra khi xóa đơn hàng!");
        }
    };


    const handleClose = () => {
        setShow(false);
        setSelectedOrderId(null);
    };

    const ORDER_STATUS = {
        0: { text: "Đang chờ xác nhận", color: "orange" },
        1: { text: "Đã xác nhận", color: "blue" },
        2: { text: "Đang giao hàng", color: "purple" },
        3: { text: "Hoàn thành", color: "green" },
        4: { text: "Đã hủy", color: "red" },
    };

    const PAYMENT_STATUS = {
        0: { text: "Chưa thanh toán", color: "red" },
        1: { text: "Đã thanh toán", color: "green" },
    };

    const PAYMENT_METHOD = {
        0: { text: "Tiền mặt (COD)", color: "purple" },
        1: { text: "Ví VNPay", color: "blue" },
    };
    return (
        <>
            <div className="container-order">
                <div className="content-order">
                    <h4 className="title">Đơn hàng của bạn</h4>
                    <div className="container-rep-order">
                        {orders.length > 0 ? (
                            <table className="table table-light table-striped table-bordered table-hover table-rep-product">
                                <thead>
                                    <tr>
                                        <th>Mã đơn hàng</th>
                                        <th>Ngày cập nhật</th>
                                        <th>Tổng giá tiền</th>
                                        <th>Phương thức thanh toán</th>
                                        <th>Thanh toán</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id} className="order-table">
                                            <td>
                                                {order.orderCode.split('-').slice(0, 2).join('-')}
                                            </td>
                                            <td>{new Date(order.dayCreate).toLocaleDateString("vi-VN")}</td>
                                            <td>
                                                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.totalPrice)}
                                            </td>
                                            <td style={{ color: PAYMENT_METHOD[order.paymentMethod]?.color, fontWeight: 'bold' }}>
                                                {PAYMENT_METHOD[order.paymentMethod]?.text || "Không xác định"}
                                            </td>


                                            <td style={{ color: PAYMENT_STATUS[order.paymentStatus]?.color, fontWeight: 'bold' }}>
                                                {PAYMENT_STATUS[order.paymentStatus]?.text || "Không xác định"}
                                            </td>


                                            <td style={{ color: ORDER_STATUS[order.orderStatus]?.color, fontWeight: 'bold' }}>
                                                {ORDER_STATUS[order.orderStatus]?.text || "Không xác định"}
                                            </td>
                                            <td>
                                                <Link to={`/orderDetail/${order.id}`}>
                                                    <button className="btn-view">
                                                        <MdOutlineRemoveRedEye />
                                                    </button>
                                                </Link>
                                                <button
                                                    className="btn-cancel"
                                                    onClick={() => handleOpenConfirm(order.id)}
                                                >
                                                    <MdDeleteOutline />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            "Không có đơn hàng nào, vui lòng lựa chọn mua sản phẩm"
                        )}
                    </div>
                </div>

                {show && (
                    <div className="table-confirm showBohover">
                        <div className="box-confirm-delete showBox ">
                            <div className="icon-warning-box-delete">
                                <IoIosWarning />
                            </div>
                            <h6>Bạn muốn hủy đơn hàng này?</h6>
                            <p>Hành động này không thể hoàn tác. Bạn có chắc chắn muốn hủy đơn hàng?</p>
                            <div className="select-box-container">
                                <div className="btn-confirm-delete" onClick={handleConfirmDelete}>
                                    Xác nhận hủy
                                </div>
                                <div className="btn-back-delete" onClick={handleClose}>
                                    Quay lại
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
export default Order;