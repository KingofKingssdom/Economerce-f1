import "../../styles/index.css";
import { getProductAll } from "../../services/ApiProduct";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineRemoveRedEye, MdDeleteOutline } from "react-icons/md";
import { GoPencil } from "react-icons/go";
function ListProduct() {
    const [products, setProducts] = useState([]);
    const fetchProducAll = async () => {
        try {
            await getProductAll().then((response) => {
                setProducts(response.data.content)
            });

        } catch (error) {
            console.log("Lỗi lấy toàn bộ sản phẩm " + error)
        }
    }
    useEffect(() => {
        fetchProducAll()
    }, [])
    return (
        <>
            <div className="container-admin">
                <div className="content-product">
                    <h1>Danh sách các sản phẩm</h1>
                    <div className="search-product">
                        <input
                            type="text"
                            placeholder="Nhập mã sản phẩm..."
                        // value={idProductFilter}
                        // onChange={(e) => setIdProductFilter(e.target.value)}
                        />
                        {/* <button onClick={handleFilter}>Lọc</button> */}
                    </div>
                    <div className="tb-list-product">
                        <table className="">
                            <thead>
                                <tr>
                                    <th>Mã sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Thông tin khuyến mãi</th>
                                    <th>Sản phẩm nổi bật</th>
                                    <th>Sản phẩm khuyến mãi</th>
                                    <th>Số lượng</th>

                                    <th className="repair-table">Xem chi tiết</th>
                                    <th className="repair-table">Chỉnh sửa</th>
                                    <th className="repair-table">Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product.id || index}>
                                        <td>{product.productCode}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.description}</td>
                                        <td>{product.featured ? "Nổi bật" : "Không nổi bật"}</td>
                                        <td>{product.promotional ? "Khuyến mãi" : "Không khuyến mãi"}</td>
                                        <td>{product.quantityProduct}</td>
                                        <td>
                                            <Link to={`/admin/productDetail/${product.id}`}>
                                                <button className="btn btn-success">
                                                    <MdOutlineRemoveRedEye />
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/admin/updateProduct/${product.id}`}>
                                                <button className="btn btn-warning">
                                                    <GoPencil />

                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <div className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                                                <MdDeleteOutline />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}
export default ListProduct;