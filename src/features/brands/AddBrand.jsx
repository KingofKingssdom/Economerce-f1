import { useEffect, useState } from "react";
import "../../styles/index.css"
import { getCategory } from "../../services/ApiCategory";
import { postBrand } from "../../services/ApiBrand";
function AddBrand() {
    // const [errorMessage, setErrorMessage] = useState("");
    // const [message, setMessage] = useState("");


    const [brandName, setBrandName] = useState("");
    const [brandCode, setBrandCode] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [urlImageBrand, setUrlImageBrand] = useState("");

    const [categories, setCategories] = useState([]);

    async function fetchCategory() {
        try {
            await getCategory().then((response) => {
                setCategories(response.data)
            })
        } catch (error) {
            console.log("Lỗi gọi api lấy toàn bộ danh mục " + error);
        }
    }
    useEffect(() => {
        fetchCategory()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData()
        form.append("BrandCode", brandCode);
        form.append("BrandName", brandName);
        form.append("UrlImageBrand", urlImageBrand);
        form.append("CategoryIds", categoryId);
        try {
            await postBrand(form);
            alert("Thêm nhãn hàng thành công ")
            setBrandCode("");
            setBrandName("");
            setCategoryId("");
            setUrlImageBrand("");
        } catch (error) {
            alert("Thêm nhãn hàng thất bại")
            console.log("Lỗi thêm nhãn hàng " + error);
        }
    }

    return (
        <>
            <div className='container-admin'>
                <div className="content-cateogry">
                    {/* {message && <p className="notification-success">Thêm thành công</p>}
                {errorMessage && <p className="notification-error">{errorMessage}</p>} */}
                    <div className="header-add">
                        <h1>Thêm nhãn hàng</h1>
                        <p>Quản lý các nhóm nhãn hàng trong hệ thống cửa hàng của bạn</p>
                    </div>
                    <div className="container-form-add">

                        <div className="form-container">

                            <div className="form-content">
                                <div className="item-form-content">
                                    <label htmlFor="brandCode" className="lable-form">MÃ NHÃN HÀNG</label>
                                    <input
                                        className="input-form"
                                        type="text"
                                        id="brandCode"
                                        name="brandCode"
                                        value={brandCode}
                                        onChange={(e) => setBrandCode(e.target.value)}
                                        placeholder="VD: DT001AP"
                                        required
                                    />
                                </div>
                                <div className="item-form-common">
                                    <label
                                        htmlFor="categoryId"
                                        style={{
                                            position: 'absolute',
                                            top: '240px',
                                            right: '450px',
                                            fontWeight: 'bolder'
                                        }}>DANH MỤC SẢN PHẨM</label>
                                    <select
                                        style={{
                                            display: 'block',
                                            marginTop: '7px',
                                            width: '150px',
                                            marginRight: '50px',
                                            border: '1px solid rgb(205, 25, 24)',
                                            height: '25px',
                                            borderRadius: '5px'
                                        }}
                                        id="categoryId"
                                        name="categoryId"
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(Number(e.target.value))}
                                    >
                                        <option value="">Lựa chọn</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.categoryName}</option>
                                        ))}

                                    </select>
                                </div>

                            </div>
                            <div className="form-content">
                                <div className="item-form-content">
                                    <label htmlFor="brandName" style={{
                                        fontWeight: 'bolder',
                                        marginLeft: '-85px'
                                    }}>TÊN NHÃN HÀNG</label>
                                    <input
                                        className="input-form"
                                        type="text"
                                        id="brandName"
                                        name="brandName"
                                        placeholder="VD: Apple"
                                        value={brandName}
                                        onChange={(e) => setBrandName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="item-form-content">
                                    <label htmlFor="UrlImageBrand" style={{
                                        fontWeight: 'bolder',
                                        marginLeft: '-50px'
                                    }}>ẢNH NHÃN HÀNG</label>
                                    <input

                                        type="file"
                                        id="UrlImageBrand"
                                        name="UrlImageBrand"
                                        onChange={(e) => setUrlImageBrand(e.target.files[0])}
                                    />
                                </div>
                            </div>

                            <button
                                className='button-add'
                                onClick={handleSubmit}
                            >Thêm
                            </button>
                            <p><b>Vui lòng kiểm tra chính xác thông tin trước khi gửi dữ liệu</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddBrand;