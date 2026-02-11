import "../../styles/index.css"
import { useState, useEffect } from "react";
import { getProductAll } from "../../services/ApiProduct";
import { postProductVariant } from "../../services/ApiProduct";
function AddProductVariant() {
    // const [errorMessage, setErrorMessage] = useState("");
    // const [message, setMessage] = useState(false);

    const [storage, setStorage] = useState("");
    const [priceOrigin, setPriceOrigin] = useState("");
    const [priceDiscount, setPriceDiscount] = useState("");
    const [productId, setProductId] = useState("");

    const [products, setProducts] = useState([]);

    const fethProductAll = async () => {
        try {
            await getProductAll().then((response) => {
                setProducts(response.data.content)
            })
        } catch (error) {
            console.log("Lỗi lấy toàn bộ sản phẩm " + error)
        }
    }
    useEffect(() => {
        fethProductAll();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("storage", storage);
        form.append("priceOrigin", priceOrigin);
        form.append("priceDiscount", priceDiscount);
        form.append("productId", productId);
        try {
            postProductVariant(form);
            alert("Thêm phiên bản sản phẩm thành công ");
            setStorage("");
            setPriceOrigin("");
            setPriceDiscount("");
            setProductId("");
        } catch (error) {
            alert("Thêm phiên bản sản phẩm thất bại ");
            console.log("Lỗi thêm phiên bản sản phẩm " + error);
        }
    }
    return (
        <>
            <div className='container-admin'>
                <div className="content-add-product-variant">
                    {/* {message && <p className="notification-success">Thêm thành công</p>}
                    {errorMessage && <p className="notification-error">Thêm không thành công</p>} */}

                    <h1>Thêm phiên bản sản phẩm</h1>

                    <div className="form-container">

                        <form onSubmit={handleSubmit}>
                            <div className="form-add-product-variant">
                                <div className="">
                                    <label htmlFor="storage">Dung lượng lưu trữ:</label>
                                    <input
                                        type="text"
                                        id="storage"
                                        name="storage"
                                        value={storage}
                                        onChange={(e) => setStorage(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="priceOrigin">Giá gốc sản phẩm:</label>
                                    <input
                                        type="number"
                                        id="priceOrigin"
                                        name="priceOrigin"
                                        value={priceOrigin}
                                        onChange={(e) => setPriceOrigin(Number(e.target.value))}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="priceDiscount">Giá sau khi giảm:</label>
                                    <input
                                        type="number"
                                        id="priceDiscount"
                                        name="priceDiscount"
                                        value={priceDiscount}
                                        onChange={(e) => setPriceDiscount(Number(e.target.value))}
                                        required
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="productId">Sản phẩm:</label>
                                    <select
                                        id="productId"
                                        name="productId"
                                        value={productId}
                                        onChange={(e) => setProductId(Number(e.target.value))}
                                    >
                                        <option value="">Chọn</option>
                                        {products.map((product) => (
                                            <option key={product.id} value={product.id}>{product.productName}</option>
                                        ))}

                                    </select>
                                </div>

                            </div>





                            <button className='button-add' type="submit">Thêm</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddProductVariant;