import "../../styles/index.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { getCategory } from "../../services/ApiCategory";
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
                    <div className="top-content-list">
                        <h2>Danh mục</h2>
                    </div>

                    <div className="table-content-list-category">
                        <table className="">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên danh mục</th>
                                    <th>Chỉnh sửa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category.id}>
                                        <td>{category.id}</td>
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