import "../../styles/index.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { getCategory } from "../../services/ApiCategory";
import { CgSortAz } from "react-icons/cg";
import { MdFileDownload, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
function ListCategory() {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;

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
    const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(categories.length / pageSize);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
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
                                {currentItems.map((category) => (
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
                        <div>
                            <div className="container-button-change-page">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    style={{
                                        border: '1px solid rgb(205, 25, 24)',
                                        textAlign: 'center',
                                        borderRadius: '3px',
                                        backgroundColor: currentPage === 1 ? 'rgb(225, 98, 98)' : 'rgb(205, 25, 24)',
                                        color: 'white',
                                        fontSize: '17px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <MdKeyboardArrowLeft />
                                </button>

                                {pageNumbers.map(number => (
                                    <button
                                        key={number}
                                        onClick={() => setCurrentPage(number)}
                                        style={{
                                            backgroundColor: currentPage === number ? 'rgb(205, 25, 24)' : 'white',
                                            fontWeight: currentPage === number ? 'bold' : 'normal',
                                            color: currentPage == number ? 'white' : 'black',
                                            cursor: "pointer",
                                            border: '1px solid black'
                                        }}
                                    >
                                        {number}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    style={{
                                        border: '1px solid rgb(205, 25, 24)',
                                        textAlign: 'center',
                                        borderRadius: '3px',
                                        backgroundColor: currentPage === totalPages ? 'rgb(225, 98, 98)' : 'rgb(205, 25, 24)',
                                        color: 'white',
                                        fontSize: '17px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <MdKeyboardArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default ListCategory