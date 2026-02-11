import "../../styles/index.css"
import { useEffect, useState } from 'react';
import {
    getProductAll,
    getProductSpecificationByProductId,
    postProductSpecificationDetail
} from "../../services/ApiProduct";

function AddProductSpecificationDetail() {
    // const [errorMessage, setErrorMessage] = useState("");
    // const [message, setMessage] = useState(false);

    const [labelSpecification, setLabelSpecification] = useState("");
    const [valueSpecification, setValueSpecification] = useState("");
    const [productId, setProductId] = useState(0);
    const [productSpecifications, setProductSpecifications] = useState([]);
    const [selectedSpecificationId, setSelectedSpecificationId] = useState("");
    const [products, setProducts] = useState([]);

    const fetchProduct = async () => {
        try {
            await getProductAll().then((response) => {
                setProducts(response.data.content)
            })
        } catch (error) {
            console.log("Lỗi lấy toàn bộ sản phẩm " + error)
        }

    }
    useEffect(() => {
        fetchProduct();
    }, [])

    const fetchProductSpecification = async () => {
        try {

            await getProductSpecificationByProductId(productId).then((response) => {
                setProductSpecifications(response.data)
            })
        } catch (error) {
            console.log("Lỗi lấy thông số sản phẩm " + error)
        }
    }
    useEffect(() => {
        if (productId) {
            fetchProductSpecification();
        }
    }, [productId])

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("labelSpecification", labelSpecification);
        form.append("valueSpecification", valueSpecification);
        form.append("productSpecificationId", selectedSpecificationId);
        form.append("productId", productId);
        try {
            postProductSpecificationDetail(form)
            alert("Thêm thông số chi tiết thành công")
            setProductId("");
            setLabelSpecification("");
            setValueSpecification("");
        } catch (error) {
            alert("Thêm thông số chi tiết không thành công");
            console.log("Lỗi thêm thông số chi tiết" + error);
        }
    }
    return (
        <>
            <div className='container-admin'>
                <div className="content-add-specification-detail">
                    {/* {message && <p className="notification-success">Thêm thành công</p>}
                    {errorMessage && <p className="notification-error">Thêm không thành công</p>} */}
                    <h1>Thêm chi tiết thông số sản phẩm</h1>
                    <div className="form-container">

                        <form onSubmit={handleSubmit}>
                            <div className="form-container-specification-detail">
                                <div className="">
                                    <label htmlFor="productId">Chọn sản phẩm: </label>
                                    <select
                                        id="productId"
                                        name="productId"
                                        value={productId}
                                        onChange={(e) => {
                                            setProductId(e.target.value);
                                            // setSelectedSpecificationId("");
                                        }}
                                    >
                                        <option value="">Chọn</option>
                                        {products.map((product) => (
                                            <option key={product.id} value={product.id}>{product.productName}</option>
                                        ))}

                                    </select>
                                </div>
                                <div className="">
                                    <label htmlFor="productSpecification">Loại thông số: </label>
                                    <select
                                        id="productSpecification"
                                        name="nameSpecification"
                                        value={selectedSpecificationId}
                                        onChange={(e) => setSelectedSpecificationId(e.target.value)}

                                    >
                                        <option value="">Chọn</option>
                                        {productSpecifications.map((spec) => (
                                            <option key={spec.id} value={spec.id}>
                                                {spec.nameSpecification}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                                <div className="">
                                    <label htmlFor="labelSpecification">Tên thông số:</label>
                                    <input
                                        type="text"
                                        id="labelSpecification"
                                        name="labelSpecification"
                                        value={labelSpecification}
                                        onChange={(e) => setLabelSpecification(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="valueSpecification">Chi tiết thông số:</label>
                                    <input
                                        type="text"
                                        id="valueSpecification"
                                        name="valueSpecification"
                                        value={valueSpecification}
                                        onChange={(e) => setValueSpecification(e.target.value)}
                                        required
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
export default AddProductSpecificationDetail