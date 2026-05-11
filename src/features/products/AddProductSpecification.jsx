import "../../styles/index.css"
import { useEffect, useState } from 'react';
import { getProductAll, postProductSpecification } from "../../services/ApiProduct";
function AddProductSpecification() {
    //  const [errorMessage, setErrorMessage] = useState("");
    // const [message, setMessage] = useState(false);

    const [nameSpecification, setNameSpecification] = useState("");
    const [productId, setProductId] = useState("");


    const [products, setProducts] = useState([]);

    // const fetchProduct = async () => {
    //     try {
    //         await getProductAll().then((response) => {
    //             setProducts(response.data.content)
    //         })

    //     } catch (error) {
    //         console.log("Lỗi lấy toàn bộ sản phẩm " + error);
    //     }
    // }
    // useEffect(() => {
    //     fetchProduct()
    // }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("nameSpecification", nameSpecification);
        form.append("productId", productId);
        try {
            postProductSpecification(form)
            alert("Thêm thông số sản phẩm thành công");
            setProductId("");
            setNameSpecification("");
        } catch (error) {
            alert("Thêm thông số sản phẩm không thành công ");
            console.log("Lỗi thêm thông số sản phẩm " + error);
        }
    }
    return (
        <>
            <div className='container-admin'>
                <div className="content-add-product-specification">
                    {/* {message && <p className="notification-success">Thêm thành công</p>}
                    {errorMessage && <p className="notification-error">Thêm không thành công</p>} */}
                    <h1>Thêm thông số sản phẩm</h1>
                    <div className="form-container">

                        <form onSubmit={handleSubmit}>
                            <div className="form-container-add-product-specification">
                                <div className="">
                                    <label htmlFor="nameSpecification">Tên thông số:</label>
                                    <input
                                        type="text"
                                        id="nameSpecification"
                                        name="nameSpecification"
                                        value={nameSpecification}
                                        onChange={(e) => setNameSpecification(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* <div className="">
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
                                </div> */}
                            </div>




                            <button className='button-add' type="submit">Thêm</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddProductSpecification;