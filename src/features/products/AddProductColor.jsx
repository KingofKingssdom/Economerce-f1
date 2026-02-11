import "../../styles/index.css"
import { useEffect, useState } from 'react';
import { getProductAll, postProductColor } from "../../services/ApiProduct";
function AddProductColor() {
    // const [errorMessage, setErrorMessage] = useState("");
    // const [message, setMessage] = useState(false);

    const [titleVariant, setTitleVariant] = useState("");
    const [productId, setProductId] = useState("");
    const [urlPhoto, setUrlPhoto] = useState("");
    const [products, setProducts] = useState([]);

    const fethProductAll = async () => {
        try {
            await getProductAll().then((response) => {
                setProducts(response.data.content)
            })
        } catch (error) {
            console.log("Lỗi lấy toàn bộ sản phẩm " + error);
        }
    }
    useEffect(() => {
        fethProductAll()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("titleVariant", titleVariant);
        form.append("productId", productId);
        form.append("urlPhoto", urlPhoto);
        try {
            postProductColor(form);
            alert("Thêm màu sắc sản phẩm thành công");
            setProductId("");
            setTitleVariant("");
            setUrlPhoto("");
        } catch (error) {
            alert("Thêm màu sắc sản phẩm thất bại")
            console.log("Lỗi thêm màu sắc sản phẩm " + error);
        }
    }
    return (
        <>
            <div className='container-admin'>
                <div className="content-add-product-color">
                    {/* {message && <p className="notification-success">Thêm thành công</p>}
                    {errorMessage && <p className="notification-error">Thêm không thành công</p>} */}
                    <h1>Thêm màu sắc sản phẩm</h1>
                    <div className="form-container">

                        <form onSubmit={handleSubmit}>
                            <div className="form-add-product-color">
                                <div className="">
                                    <label htmlFor="productCode">Tên màu sắc sản phẩm:</label>
                                    <input
                                        type="text"
                                        id="titleVariant"
                                        name="titleVariant"
                                        value={titleVariant}
                                        onChange={(e) => setTitleVariant(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="productId">Chọn sản phẩm: </label>
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
                                <div>
                                    <label htmlFor="urlPhoto">Chọn ảnh màu sắc sản phẩm:</label>
                                    <input
                                        type="file"
                                        id="urlPhoto"
                                        name="urlPhoto"
                                        onChange={(e) => setUrlPhoto(e.target.files[0])}
                                    />
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
export default AddProductColor