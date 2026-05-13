import "../../../../styles/index.css"
import { getProductById } from "../../../../services/ApiProduct";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { FaPen } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { CgSortAz } from "react-icons/cg";
import { MdFileDownload, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { gettProductSpecification } from "../../../../services/ApiProduct";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import UpdateProductSpecification from "./UpdateProductSpecification";
function ListProductSpecification() {
    const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
    const { id } = useParams(); // Lấy id từ URL
    const [productSpecifications, setProductSpecification] = useState([]);
    const [showBoxUpdate, setShowBoxUpdate] = useState(false);
    const [idData, setIdData] = useState(0);

    const fetchProductSpecification = async () => {
        try {
            await gettProductSpecification().then((response) => {
                setProductSpecification(response.data)
            })
        } catch (error) {
            console.log("Lỗi lấy sản phẩm theo id " + error)
        }

    }
    useEffect(() => {
        fetchProductSpecification()
    }, [])

    const handleUpdate = (id) => {
        setShowBoxUpdate(true)
        setIdData(id)
    }
    return (
        <>
            <div className="container-admin">
                <div className="content-list">
                    <div className="container-content-list">
                        <div>
                            <h2>Quản lý thông số sản phẩm</h2>
                            <p>Danh sách các thông số sản phẩm trong hệ thống</p>
                        </div>
                        <Link to={`/admin/addProductSpecification`} className="btn-add-list">
                            <IoAddOutline /> THÊM THÔNG SỐ
                        </Link>
                    </div>
                    <div className="table-content-list">
                        <table className="table-content-list-all">
                            <thead>
                                <tr>
                                    <th>Mã thông số</th>
                                    <th>Tên loại thông số</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productSpecifications ? (
                                    productSpecifications.map((productSpecification) => (

                                        <tr key={productSpecification.id}>
                                            <td style={{ color: "red", fontWeight: "bolder", height: '20px' }}>{productSpecification.id}</td>
                                            <td>{productSpecification.specificationName}</td>

                                            <td>
                                                <button className="btn-update" style={{
                                                    marginLeft: '5px',
                                                    border: 'none'
                                                }}
                                                    onClick={() => handleUpdate(productSpecification.id)}
                                                >
                                                    <GoPencil />
                                                </button>

                                                <Link to={`/admin/updateProduct/${productSpecification.id}`}>
                                                    <button className="btn-delete" style={{
                                                        marginLeft: '5px',
                                                        border: 'none'
                                                    }}>
                                                        <FaRegTrashAlt />
                                                    </button>
                                                </Link>
                                            </td>

                                        </tr>
                                    ))
                                ) : (<tr>
                                    <td colSpan="5" style={{ textAlign: "center" }}>
                                        Đang tải dữ liệu...
                                    </td>
                                </tr>)
                                }

                            </tbody>
                        </table>

                    </div>

                </div>
                <div className={`container-update-in-list ${showBoxUpdate ? 'active-box-update' : ''}`} >
                    <div className={`container-box-update-content ${showBoxUpdate ? 'active-box-update-down' : ''}`}>
                        <UpdateProductSpecification
                            id={idData}
                            onSuccess={() => setShowBoxUpdate(false)}
                        />
                    </div>

                </div>
            </div >
        </>
    )
}
export default ListProductSpecification;