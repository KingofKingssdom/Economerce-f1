import "../../../styles/index.css"
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { MdDelete, MdPayment } from "react-icons/md";
import { Link } from "react-router-dom";
import { getCartItemByUserId } from "../../../services/ApiCart";
import { getUserCurrent } from "../../../services/ApiAuth";
import { postOrder } from "../../../services/ApiOrder";
import { IoIosArrowForward, IoIosCash } from "react-icons/io";

function Cart() {
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
    const [cartItems, setCartItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]); // mảng lưu id đã check
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null);


    const handleCheck = (id) => {
        setCheckedItems((prev) => {
            if (prev.includes(id)) {

                return prev.filter((item) => item !== id);
            } else {

                return [...prev, id];
            }
        });
    };


    const selectedItems = cartItems.filter((item) =>
        checkedItems.includes(item.id)
    );
    const totalAmount = selectedItems.reduce(
        (sum, item) => sum + item.totalPrice, 0
    );
    useEffect(() => {
        const loadInitialData = async () => {
            try {

                const userData = await getUserCurrent();


                setUser(userData);


                if (userData && userData.id) {

                    const cartResponse = await getCartItemByUserId(Number(userData.id));
                    setCartItems(cartResponse.data);
                }
            } catch (error) {
                console.error("Lỗi khi khởi tạo dữ liệu: ", error);
            }
        };

        loadInitialData();
    }, []);

    const handleOrder = async () => {
        if (checkedItems.length === 0) {
            alert("Vui lòng chọn ít nhất 1 sản phẩm để đặt hàng!");
            return;
        }

        try {

            // const response = await postOrder(checkedItems);
            // const dataResponse = response.data;
            // const orderId = dataResponse.id;
            // sessionStorage.setItem("orderId", `${orderId}`);
            // await fetchCartItems();
            // setCheckedItems([]);
            setShow(true);

        } catch (error) {
            alert("Có lỗi xảy ra khi đặt hàng!");
            console.error("Lỗi khi đặt hàng:", error);

        }
    };
    const handleSumitPayOnline = async () => {
        navigate('/payOnline', { state: { items: selectedItems } });
    }
    const handleClose = () => {
        setShow(false)
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/cartItem/delete?cartItemId=${id}`, { withCredentials: true });
            alert("Xóa sản phẩm thành công!");
            await fetchCartItems();
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
            alert("Xóa thất bại!");
        }
    };
    return (
        <>
            <div className="container-order">
                <div className="content-order">
                    <h4 className="title">Giỏ hàng của bạn</h4>
                    <div className="container-rep-order">
                        {cartItems.length > 0 ? (
                            cartItems.map((cartItem) => (
                                <div className="container-order-product" key={cartItem.id}>
                                    <div className="btn-check-item">
                                        <input
                                            className="check-select"
                                            type="checkbox"
                                            onClick={() => handleCheck(cartItem.id)}
                                        />
                                    </div>
                                    <div className="left-order-product">
                                        <img src={`${IMAGE_BASE_URL}${cartItem.urlProductColor}`} alt={cartItem.productName} />
                                    </div>
                                    <div className="center-order-product">
                                        <p><b>Sản phẩm:</b> {cartItem.productName}</p>
                                        <p className="p-buy"></p>
                                        <p><b>Số lượng:</b> {cartItem.quantity} </p>
                                        <p><b>Đơn giá: </b>
                                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                                cartItem.priceAtTime)}
                                        </p>
                                        <p><b>Phiên bản:</b> {cartItem.storage}</p>
                                        <p><b>Màu sắc:</b> {cartItem.colorName}</p>
                                    </div>

                                    <div className="rigth-order-product">
                                        <p><b>Thành tiền: </b> {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                            cartItem.totalPrice)}
                                        </p>

                                    </div>
                                    <div className="rigth-order-product">

                                        <div className="btn-delete"
                                            onClick={() => handleDelete(cartItem.id)}
                                        >
                                            <MdDelete />
                                        </div>
                                    </div>

                                </div>

                            ))) : (
                            <p>Giỏ hàng của bạn trống hãy thêm sản phẩm vào giỏ hàng của mình nhé.</p>
                        )}
                    </div>


                    {cartItems.length > 0 ? (
                        <div className="container-total">
                            <p>
                                <b>Tổng tiền: </b>
                                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalAmount)}
                            </p>


                            <div className="btn-buy"
                                onClick={handleOrder}
                            >
                                Mua ngay
                            </div>

                        </div>
                    ) : ("")}


                </div>
            </div>
            <div className={`table-confirm ${show ? "showBohover" : ""}`}>
                <div className={`box-confirm ${show ? "showBox" : ""}`}>
                    <div className="header-box-confirm">
                        <h6>Chọn phương thức thanh toán</h6>
                        <p>Vui lòng chọn phương thức thanh toán để tiếp tục</p>
                    </div>

                    <div className="select-box-container ">
                        <div
                            onClick={handleSumitPayOnline}

                        >
                            <div className="btn-online"
                            >
                                <div className="btn-online-left">
                                    <MdPayment />
                                </div>
                                <div className="btn-online-center">
                                    <h6>Thanh toán trực tuyến</h6>
                                    <p>VNPay, Momo, ATM, </p>
                                </div>
                                <div className="btn-online-right"><IoIosArrowForward /></div>
                            </div>
                        </div>

                        <div
                            className="btn-confirm-order"
                            onClick={handleClose}
                        >

                            <div className="btn-online-left">
                                <IoIosCash />
                            </div>
                            <div className="btn-online-center">
                                <h6>Thanh toán tiền mặt</h6>
                                <p>Thanh toán khi nhận hàng (COD) </p>
                            </div>
                            <div className="btn-online-right">
                                <IoIosArrowForward />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Cart;