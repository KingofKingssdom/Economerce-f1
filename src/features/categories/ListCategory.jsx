import "../../styles/index.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { getCategory } from "../../services/ApiCategory";
import { CgSortAz } from "react-icons/cg";
import { MdFileDownload } from "react-icons/md";
function ListCategory() {
    const [categories, setCategories] = useState([]);

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

    return (
        <>
            <div className="container-admin">

                <div className="content-list">
                    <h2>DANH MỤC</h2>
                    <p>Danh sách cách danh mục trong hệ thống</p>
                    <div className="table-content-list">
                        <div className="content-top-list">
                            <div className="search-item-list">
                                Tìm kiếm theo mã danh mục
                                <div className="container-search-item-list">
                                    <input
                                        // value={ }
                                        // onChange={ }
                                        placeholder="Nhập mã tìm kiếm ......."
                                    />
                                    <button
                                    // onChange={}
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
                                {categories.map((category) => (
                                    <tr key={category.id}>
                                        <td style={{ color: "red", fontWeight: "bolder" }}>{category.categoryCode}</td>
                                        <td>{category.categoryName}</td>
                                        <td>
                                            <Link to={`/admin/updateCategory/${category.id}`}>
                                                <button className="btn btn-warning">
                                                    <GoPencil />
                                                </button>
                                            </Link></td>

                                    </tr>
                                ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListCategory