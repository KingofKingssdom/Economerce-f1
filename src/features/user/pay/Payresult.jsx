import "../../../styles/index.css"
import { useNavigate } from "react-router-dom";
import { putPayVNPay } from "../../../services/ApiPay";
function Payresult() {
    const navigate = useNavigate();
    const id = sessionStorage.getItem("orderId");
    const handlePayDone = async () => {
        try {
            await putPayVNPay(id);
            sessionStorage.removeItem("orderId");
            alert("Thanh toán thành công")
            navigate("/")
        } catch (error) {
            console.error("Lỗi khi xác nhận:", error);
        }
    }
    return (
        <>
            <div className="pay-result-container">
                Bấm xác nhận để hoàn tất thanh toán
                <div className="btn-done-pay"
                    onClick={handlePayDone}>Xác nhận</div>

            </div>
        </>
    )
}
export default Payresult