import "../../styles/index.css"
import { getProductById } from "../../services/ApiProduct";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { FaPen } from "react-icons/fa";
function ListProductDetail() {
    const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
    const { id } = useParams(); // Lấy id từ URL
    const [product, setProduct] = useState(null);

    const fetchProduct = async () => {
        try {
            await getProductById(id).then((response) => {
                setProduct(response.data)
            })
        } catch (error) {
            console.log("Lỗi lấy sản phẩm theo id " + error)
        }

    }
    useEffect(() => {
        fetchProduct()
    }, [id])


    return (
        <>
            <div className="container-admin">
                <div className="content-list-product-detail">
                    <h1>Chi tiết sản phẩm</h1>
                    <div className="content-list-detail">
                        <div className="box-detail-container ">
                            <h3>Màu sắc sản phẩm</h3>
                            <div className="content-box-detail">
                                <table class="table-product-detail">
                                    <thead>
                                        <tr>
                                            <th >Màu sắc</th>
                                            <th >Ảnh màu sắc</th>
                                            <th>Chỉnh sửa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {product?.productColors?.map((productColor, index) => (
                                            <tr key={productColor.id || index}>
                                                <td>{productColor.titleVariant}</td>
                                                <td>
                                                    <div className="frame-image">
                                                        <img src={`${IMAGE_BASE_URL}${productColor.urlPhoto}`} alt="Ảnh nhãn hiệu"
                                                            style={{ "objectFit": "containt" }}
                                                        />
                                                    </div>
                                                </td>
                                                <td><button className="btn btn-warning"><FaPen /></button></td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="box-detail-container">
                            <h3>Phiên bản sản phẩm</h3>
                            <div className="content-box-detail">
                                <table class="table-product-detail"
                                >
                                    <thead>
                                        <tr>
                                            <th>Bộ nhớ</th>
                                            <th>Giá gốc</th>
                                            <th >Giá giảm</th>
                                            <th>Chỉnh sửa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {product?.productVariants?.map((productVariant, index) => (
                                            <tr key={productVariant.id || index}>
                                                <td>{productVariant.storage}</td>
                                                <td>
                                                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                                        productVariant.priceOrigin)}
                                                </td>
                                                <td>
                                                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                                        productVariant.priceDiscount)}

                                                </td>
                                                <td><button className="btn btn-warning"><FaPen /></button></td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="box-detail-container">
                            <h3>Thông số sản phẩm</h3>
                            <div className="content-box-detail">
                                <table class="table-product-detail"
                                >

                                    <tbody>
                                        {product?.specifications?.map((spec) => {
                                            const filteredDetails = spec.specificationDetails?.filter(
                                                (detail) => detail.productId === product.id
                                            );

                                            // Không có detail đúng product → không render spec này
                                            if (!filteredDetails || filteredDetails.length === 0) return null;

                                            return (
                                                <React.Fragment key={spec.id}>
                                                    <tr className="table-secondary">
                                                        <td colSpan="3">
                                                            {spec.nameSpecification}
                                                        </td>
                                                    </tr>

                                                    {filteredDetails.map((detail, i) => (
                                                        <tr key={`${spec.id}-${i}`}>
                                                            <td>{detail.labelSpecification}</td>
                                                            <td>{detail.valueSpecification}</td>
                                                            <td><button className="btn btn-warning"><FaPen /></button></td>
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            );
                                        })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
export default ListProductDetail;