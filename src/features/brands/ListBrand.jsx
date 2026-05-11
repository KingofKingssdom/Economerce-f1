import "../../styles/index.css"
import { getBrand } from "../../services/ApiBrand";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import { IoAddOutline } from "react-icons/io5";
import { CgSortAz } from "react-icons/cg";
import { MdFileDownload } from "react-icons/md";
import PageNavigation from "../../components/admin/ui/PageNavigation";
function ListBrand() {
    const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
    const [brands, setBrands] = useState([]);
    const [displayData, setDisplayData] = useState([]);
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
                <div className="content-list">
                    <div className="container-content-list">
                        <div>
                            <h2>NHÃN HÀNG</h2>
                            <p>Danh sách cách nhãn hàng trong hệ thống</p>
                        </div>
                        <Link to="/admin/addBrand" className="btn-add-list">
                            <IoAddOutline /> THÊM NHÃN HÀNG
                        </Link>
                    </div>
                    <div className="table-content-list" style={{ height: '430px' }}>
                        <div className="content-top-list">
                            <div className="search-item-list">
                                Tìm kiếm theo mã nhãn hiệu
                                <div className="container-search-item-list">
                                    <input
                                        // value={filterData}
                                        // onChange={handleFilterData}
                                        placeholder="Nhập mã tìm kiếm ......."
                                    />
                                    <button
                                    // onClick={handleSearch}
                                    >Tìm</button>
                                </div>

                            </div>
                            <div className="filter-item-list">
                                <div className="filter-sort">
                                    <CgSortAz />
                                </div>
                                <div className="filter-download">
                                    <MdFileDownload />
                                </div>
                            </div>
                        </div>
                        <table class="table-content-list-all">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên nhãn hàng</th>
                                    <th>Ảnh nhãn hàng</th>
                                    <th className="repair-table">Chỉnh sửa</th>
                                </tr>
                            </thead>

                            <tbody >
                                {displayData.map((brand, index) => (
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
                        <div className="container-button-change-page"

                        >
                            <PageNavigation
                                resData={brands}
                                onPageChange={(items) => setDisplayData(items)}
                            />

                        </div>
                    </div>

                </div>
            </div >
        </>
    )
}
export default ListBrand;