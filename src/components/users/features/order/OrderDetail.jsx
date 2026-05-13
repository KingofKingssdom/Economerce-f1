import "../../../../styles/index.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderItemByOrderId } from "../../../../services/ApiOrder";
function OrderDetail() {
    const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);


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
    return (
        <>
            <div className="container-order">
                <div className="content-order">
                    <h4 className="title">Chi tiết đơn hàng</h4>
                    <div className="container-rep-order">
                        {orderDetails.length > 0 ? (
                            orderDetails.map((orderItem) => (
                                <div className="container-order-product" key={orderItem.id}>
                                    <div>
                                    </div>
                                    <div className="left-order-product">
                                        <img src={`${IMAGE_BASE_URL}${orderItem.urlProductColor}`} alt={orderItem.productName} />
                                    </div>
                                    <div className="center-order-product">
                                        <p><b>Sản phẩm:</b> {orderItem.productName}</p>
                                        <p className="p-buy"></p>
                                        <p><b>Số lượng:</b> {orderItem.quantity} </p>
                                        <p><b>Tổng giá sản phẩm: </b>
                                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                                orderItem.priceAtTime)}
                                        </p>
                                        <p><b>Phiên bản:</b> {orderItem.storage}</p>
                                        <p><b>Màu sắc:</b> {orderItem.colorName}</p>
                                    </div>
                                    <div>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            ))) : (
                            <p>Không có sản phẩm nào </p>
                        )}


                    </div>

                </div>

            </div>
        </>
    )
}
export default OrderDetail