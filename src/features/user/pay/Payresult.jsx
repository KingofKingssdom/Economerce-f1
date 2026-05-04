import "../../../styles/index.css"
import { useNavigate } from "react-router-dom";
import { getPayVNPayResult } from "../../../services/ApiPay";
function Payresult() {
    const navigate = useNavigate();

    // const handlePayResult = async () => {
    //     try {
    //         const response = await getPayVNPayResult();
    //         return response.paymentUrl;

    //     } catch (error) {
    //         console.error("Lỗi nhận kết quả thanh toán  từ VNPay:", error);
    //     }
    // }

    // var urlResponse = handlePayResult()
    const handlePayDone = () => {
        navigate("/order")
    }
    return (
        <>
            <div className="pay-result-container">
                <h1>Thanh toán thành công</h1>
                <div className="btn-done-pay"
                    onClick={handlePayDone}>Xem đơn hàng</div>

            </div>
        </>
    )
}
export default Payresult