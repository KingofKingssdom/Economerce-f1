import "../../../styles/index.css"
import { FaLock } from "react-icons/fa";
import { getOrderById } from "../../../services/ApiOrder";
import { postPayVNPay } from "../../../services/ApiPay";
function PayMethod() {
    const id = sessionStorage.getItem("orderId");
    let maDon = "";
    let amount = "";
    let orderInfo = "";
    const handleCheckoutVNPay = async () => {
        try {
            const response = await getOrderById(id)
            const dataResponse = response.data;
            maDon = dataResponse.id;
            amount = dataResponse.totalPrice;
            const orderInforOld = dataResponse.orderName;
            const orderInforNew = orderInforOld.split("|")[0].replace(/\s+/g, '');
            //     console.log("Giá trị mới " + orderInforNew)
            orderInfo = orderInforNew;

        } catch (error) {
            alert("Có lỗi xảy ra khi chọn thanh toán theo VNPay!");
            console.error("Lỗi khi chọn Lấy sản phẩm trong Session :", error);

        }

        try {
            const response = await postPayVNPay(amount, orderInfo, maDon);

            const dataResponse = response;
            const vnPayUrl = dataResponse.vnpayUrl;
            window.location.href = vnPayUrl;
        } catch (error) {
            alert("Có lỗi xảy ra khi chọn thanh toán theo VNPay!");
            console.error("Lỗi khi chọn thanh toán theo VNPay :", error);

        }
    };
    return (
        <>
            <div className="container-paymethod">
                <div className="header-paymethod">
                    <h3>Chọn hình thức thanh toán</h3>
                    <p>An toàn - Nhanh chóng - Bảo mật</p>
                </div>

                <div className="pay-select-container">
                    <div className="container-select-VNpay">
                        <div className="select-VNpay"
                            onClick={handleCheckoutVNPay}
                        >
                            <img
                                src="/image/VNPay.jpg"
                                alt="LogoVNPay"
                            />
                        </div>
                        <p>Ví điện tử VNPay</p>
                    </div>

                    <div
                        className="select-other-pay"
                    >
                        <div>

                        </div>
                        <div>
                            <FaLock />
                            <h4>CHƯA HỖ TRỢ</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PayMethod;