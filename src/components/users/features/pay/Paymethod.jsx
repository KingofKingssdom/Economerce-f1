import "../../../../styles/index.css"
import { FaLock } from "react-icons/fa";
import { postOrder } from "../../../../services/ApiOrder";
import { postPayVNPay } from "../../../../services/ApiPay";
import { useLocation } from 'react-router-dom';
import { getUserCurrent } from "../../../../services/ApiAuth";
import { useState, useEffect } from "react";
function PayMethod() {
    const location = useLocation();
    const items = location.state?.items || [];
    let arrayItems = items.map(item => item.id)
    const [user, setUser] = useState(null);
    const [receiverName, setReceiverName] = useState("");
    const [receiverPhone, setReceiverPhone] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    useEffect(() => {
        getUserCurrent().then((response) => {
            setUser(response);
        })
    }, [])
    const handlerReceiverName = (e) => {
        setReceiverName(e.target.value);
    }
    let ReceiverName = receiverName;
    const handlerReceiverPhone = (e) => {
        setReceiverPhone(e.target.value);
    }
    let ReceiverPhone = receiverPhone
    const handlerShippingAddress = (e) => {
        setShippingAddress(e.target.value);
    }
    let ShippingAddress = shippingAddress
    const [isToggle, setIsToggle] = useState(false);

    const OpenForm = () => {
        setIsToggle(true);
    };
    let userId = user?.id;
    const handleCheckoutVNPay = async () => {
        var orderId;
        try {
            const response = await postOrder(Number(userId), arrayItems, 1, ReceiverName, ReceiverPhone, ShippingAddress)
            orderId = response.data.id;

        } catch (error) {
            console.error("Lỗi khi tạo đơn hàng :", error);

        }
        try {
            const response = await postPayVNPay(orderId);
            const dataResponse = response;
            const vnPayUrl = dataResponse.paymentUrl;
            window.location.href = vnPayUrl;
        } catch (error) {
            console.error("Lỗi khi thanh toán  :", error);
        }
        setIsToggle(false);
    }



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
                            onClick={OpenForm}
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

            <div className={`container-form-receiver ${isToggle ? 'active' : ''}`}>
                <div className="form-receiver">
                    <div className="header-receiver">
                        <h5>VUI LÒNG XÁC NHẬN THÔNG TIN GIAO HÀNG</h5>
                    </div>

                    <label htmlFor="">Tên người nhận</label>
                    <input
                        type="text"
                        value={receiverName}
                        onChange={handlerReceiverName}
                    />
                    <label htmlFor="">Số điện thoại</label>
                    <input
                        type="text"
                        value={receiverPhone}
                        onChange={handlerReceiverPhone}
                    />
                    <label htmlFor="">Địa chỉ giao hàng</label>
                    <input
                        type="text"
                        value={shippingAddress}
                        onChange={handlerShippingAddress}
                    />
                    <button
                        className="btn-submit-receiver"
                        onClick={handleCheckoutVNPay}
                    >xác nhận</button>
                </div>
            </div>

        </>
    )
}
export default PayMethod;