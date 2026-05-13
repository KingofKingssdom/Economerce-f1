import "../../../../styles/index.css";
import { IoBagCheckOutline, IoPrintOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { MdOutlinePhone, MdOutlineEmail } from "react-icons/md";
import { useState, useEffect } from "react";
import { getOrderItemByOrderId } from "../../../../services/ApiOrder";
import { useParams } from "react-router-dom";
import { putOrderStatus } from "../../../../services/ApiOrder";
function ListOrderDetail() {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);
    const [status, setStatus] = useState(0);

    const handleChange = (e) => {
        const selectedValue = Number(e.target.value);
        setStatus(selectedValue);
    }

    const fetchOrderItems = async () => {
        try {
            await getOrderItemByOrderId(id).then((response) => {
                setOrderDetails(response.data)
            })
        } catch (error) {
            console.error("Lỗi gọi API lấy cách mặt hàng trong giỏ hàng:", error);
        }
    };
    useEffect(() => {
        fetchOrderItems();
    }, []);

    const handleUpdate = async () => {
        try {
            await putOrderStatus(id, status);
            alert("Cập nhập thành công")
        } catch (error) {
            console.error("Lỗi gọi API cập nhập trạng thái đơn hàng:", error);
        }
    };
    let total = 0;
    orderDetails.forEach(item => {
        total += item.totalPrice;
    })
    return (
        <>
            <div className="container-admin">
                <div className="content-list">
                    <div className="">
                        <div>
                            <h2>Quản lý chi tiết đơn hàng</h2>
                            <div className="order-header">
                                <div className="order-header-icon">
                                    <div className="bagage-icon">
                                        <i><IoBagCheckOutline /></i>
                                    </div>

                                </div>
                                <div className="title-order-header">
                                    <h2>Đơn hàng #DT001</h2>
                                </div>
                                <div className="button-order-header">
                                    <button className="btn-print">
                                        <IoPrintOutline /> In hóa đơn
                                    </button>
                                </div>
                            </div>
                            <div className="order-content">
                                <div className="order-detail">
                                    <div className="order-header-detail">
                                        <h2>Danh sách sản phẩm</h2>
                                    </div>
                                    <div className="order-content-detail">
                                        <div className="order-content-header-detail">
                                            <div style={{

                                                width: '400px',
                                                textAlign: 'center'
                                            }}>
                                                SẢN PHẨM
                                            </div>
                                            <div
                                                style={{
                                                    textAlign: 'center',

                                                    width: '120px'
                                                }}
                                            >
                                                ĐƠN GIÁ
                                            </div>
                                            <div
                                                style={{
                                                    textAlign: 'center',
                                                    width: '100px'
                                                }}
                                            >
                                                SỐ LƯỢNG
                                            </div>
                                            <div>
                                                TỔNG CỘNG
                                            </div>
                                        </div>
                                        {orderDetails.map((item, index) => (
                                            <div key={index} className="order-content-tb-detail">
                                                <div >
                                                    {item.productName}
                                                </div>
                                                <div>
                                                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                                        item.priceAtTime)}
                                                </div>
                                                <div>
                                                    {item.quantity}
                                                </div>
                                                <div>
                                                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                                        item.totalPrice)}

                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                    <div className="order-content-ft">
                                        <div>
                                            <div className="order-ft-item">
                                                <p style={{ fontWeight: 'bolder' }}>Tạm tính</p>
                                                <p style={{ marginLeft: '30px' }}>
                                                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                                        total)}

                                                </p>
                                            </div>
                                            <div className="order-ft-item">
                                                <p style={{ fontWeight: 'bolder' }}>Phí vận chuyển</p>
                                                <p style={{ color: 'green' }}>Miễn phí</p>
                                            </div>
                                            <div className="order-ft-total">
                                                <p>Tổng cộng</p>
                                                <p>
                                                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                                        total)}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="order-side-content">
                                    <div className="order-side-t">
                                        <div className="order-side-t-h">
                                            <h4>Cập nhập trạng thái</h4>
                                        </div>
                                        <div style={{ margin: '0 10px' }}>
                                            <p>Trạng thái mới</p>
                                            <select name="" id="" style={{
                                                width: '300px',
                                                height: '30px',
                                                borderRadius: '5px'
                                            }}
                                                value={status}
                                                onChange={handleChange}
                                            >
                                                <option value={0}>Chờ xác nhận</option>
                                                <option value={1}>Đã xác nhận</option>
                                                <option value={2}>Đang giao hàng</option>
                                                <option value={3}>Đã giao hàng</option>
                                                <option value={4}>Đã hủy</option>
                                            </select>
                                            <div>
                                                <button style={{
                                                    borderRadius: '5px',
                                                    margin: '20px auto',
                                                    height: '30px',
                                                    border: '1px solid rgb(205, 25, 24)',
                                                    backgroundColor: 'rgb(205, 25, 24)',
                                                    color: 'white',
                                                    width: '100%',
                                                    cursor: 'pointer'

                                                }}
                                                    onClick={handleUpdate}
                                                >Cập nhập trạng thái</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order-side-t">
                                        <div className="order-side-t-h">
                                            <h4>Thông tin nhận hàng</h4>
                                        </div>
                                        <div>
                                            <div style={{
                                                display: 'flex',
                                                height: '70px'
                                            }}>
                                                <div style={{
                                                    color: 'rgb(205, 25, 24)',
                                                    borderRadius: '50%',
                                                    height: '30px',
                                                    width: '30px',
                                                    overflow: 'hidden',
                                                    margin: '20px 10px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: 'rgb(255,239,238)',
                                                }}>
                                                    <CiUser />
                                                </div>
                                                <div>
                                                    <p style={{
                                                        lineHeight: '5px'
                                                    }}>Khách hàng</p>
                                                    <p style={{ lineHeight: '10px' }}>{orderDetails[0]?.receiverName}</p>
                                                </div>

                                            </div>

                                        </div>
                                        <div>
                                            <div style={{
                                                display: 'flex',
                                                height: '70px'
                                            }}>
                                                <div style={{
                                                    color: 'rgb(205, 25, 24)',
                                                    borderRadius: '50%',
                                                    height: '30px',
                                                    width: '30px',
                                                    overflow: 'hidden',
                                                    margin: '20px 10px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: 'rgb(255,239,238)',
                                                }}>
                                                    <MdOutlineEmail />
                                                </div>
                                                <div>
                                                    <p style={{
                                                        lineHeight: '5px'
                                                    }}>Địa chỉ</p>
                                                    <p style={{ lineHeight: '10px' }}>{orderDetails[0]?.shippingAddress}</p>
                                                </div>

                                            </div>
                                            <div>
                                                <div style={{
                                                    display: 'flex',
                                                    height: '70px'
                                                }}>
                                                    <div style={{
                                                        color: 'rgb(205, 25, 24)',
                                                        borderRadius: '50%',
                                                        height: '30px',
                                                        width: '30px',
                                                        overflow: 'hidden',
                                                        margin: '20px 10px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        backgroundColor: 'rgb(255,239,238)',
                                                    }}>
                                                        <MdOutlinePhone />
                                                    </div>
                                                    <div>
                                                        <p style={{
                                                            lineHeight: '5px'
                                                        }}>Điện thoại</p>
                                                        <p style={{ lineHeight: '5px' }}>{orderDetails[0]?.receiverPhone}</p>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}
export default ListOrderDetail;