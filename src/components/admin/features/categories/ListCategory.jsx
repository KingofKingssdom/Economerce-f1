import "../../../../styles/index.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { getCategoryByCategoryCode, getCategory } from "../../../../services/ApiCategory";
import { CgSortAz } from "react-icons/cg";
import { MdFileDownload, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import PageNavigation from "../../common/PageNavigation"
import UpdateCateogry from "./UpdateCategory";
function ListCategory() {
    const [categories, setCategories] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [filterData, setFilterData] = useState("");
    const [idData, setIdData] = useState(0);
    const [showBoxUpdate, setShowBoxUpdate] = useState(false)
    const fetchCategory = async () => {
        try {
            await getCategory().then((response) => {
                setCategories(response.data)
            })
        }
        catch (error) {
            console.log("Lỗi gọi danh mục " + error)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])
    const handleFilterData = (e) => {
        setFilterData(e.target.value);
    }
    const handleSearch = async () => {
        try {
            await getCategoryByCategoryCode(filterData).then((response) => {
                setCategories([response.data]);
            })
        }
        catch (error) {
            console.log("Lỗi lọc danh mục " + error)
        }
    }
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
                            <h2>DANH MỤC</h2>
                            <p>Danh sách cách danh mục trong hệ thống</p>
                        </div>
                        <Link to="/admin/addCategory" className="btn-add-list">
                            <IoAddOutline /> THÊM DANH MỤC
                        </Link>
                    </div>

                    <div className="table-content-list">
                        <div className="content-top-list">
                            <div className="search-item-list">
                                Tìm kiếm theo mã danh mục
                                <div className="container-search-item-list">
                                    <input
                                        value={filterData}
                                        onChange={handleFilterData}
                                        placeholder="Nhập mã tìm kiếm ......."
                                    />
                                    <button
                                        onClick={handleSearch}
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

                        <table className="table-content-list-all">
                            <thead>
                                <tr>
                                    <th>Mã danh mục</th>
                                    <th>Tên danh mục</th>
                                    <th>Chỉnh sửa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayData.map((category) => (
                                    <tr key={category.id}>
                                        <td style={{ color: "red", fontWeight: "bolder" }}>{category.categoryCode}</td>
                                        <td>{category.categoryName}</td>
                                        <td>

                                            <button className="btn-update"
                                                style={{
                                                    border: "none"
                                                }}
                                                onClick={() => handleUpdate(category.id)}
                                            >
                                                <GoPencil />
                                            </button>
                                        </td>

                                    </tr>
                                ))
                                }

                            </tbody>
                        </table>
                        <div>
                            <div className="container-button-change-page">
                                <PageNavigation
                                    resData={categories}
                                    onPageChange={(items) => setDisplayData(items)}
                                />

                            </div>
                        </div>
                    </div>

                </div>
                <div className={`container-update-in-list ${showBoxUpdate ? 'active-box-update' : ''}`} >
                    <div className={`container-box-update-content ${showBoxUpdate ? 'active-box-update-down' : ''}`}>
                        <UpdateCateogry
                            id={idData}
                            onSuccess={() => setShowBoxUpdate(false)}
                        />
                    </div>

                </div>
            </div>
        </>
    )

}
export default ListCategory