import "../../styles/index.css"
import { getBrand } from "../../services/ApiBrand";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
function ListBrand() {
    const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
    const [brands, setBrands] = useState([]);

    const fetchBrand = async () => {
        try {
            await getBrand().then((response) => {
                setBrands(response.data)
            })
        } catch (error) {
            console.log("Lỗi gọi lấy toàn bộ danh sách sản phẩm " + error);
        }
    }
    useEffect(() => {
        fetchBrand()
    }, [])
    return (
        <>
            <div className="container-admin">
                <div className="content-brand">
                    <h1>NHÃN HIỆU</h1>
                    <div>
                        {/* <input
                            type="text"
                            placeholder="Nhập mã sản phẩm..." 
                        // value={idBrandFilter}
                        // onChange={(e) => setIdBrandFilter(e.target.value)}
                        />*/}
                        {/* <button className="btn btn-success" onClick={handleFilter}>Lọc</button> */}
                    </div>
                    <div className="tb-list-brand">
                        <table class="">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên nhãn hàng</th>
                                    <th>Ảnh nhãn hàng</th>
                                    <th className="repair-table">Chỉnh sửa</th>
                                </tr>
                            </thead>

                            <tbody >
                                {brands.map((brand, index) => (
                                    <tr key={brand.id || index}>
                                        <td>{brand.id}</td>
                                        <td>{brand.brandName}</td>
                                        <td><img src={`${IMAGE_BASE_URL}${brand.urlImageBrand}`} alt="Ảnh nhãn hiệu" /></td>
                                        <td>
                                            <Link to={`/admin/updateBrand/${brand.id}`}>
                                                <button className="btn btn-warning">
                                                    <GoPencil />
                                                </button>
                                            </Link>

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
export default ListBrand;