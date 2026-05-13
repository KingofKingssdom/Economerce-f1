import "../../../../styles/index.css"
import { useState, useEffect } from "react";
import { putBrand } from "../../../../services/ApiBrand";
import { useParams } from "react-router-dom";
import { getCategory } from "../../../../services/ApiCategory";
function UpdateBrand(props) {
    const idBrand = props.id
    const close = props.onSuccess;
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

    const handleCategoryCode = (e) => {
        setCategoryCode(e.target.value)
    }
    const handleCategoryName = (e) => {
        setCategoryName(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData()
        form.append("BrandCode", brandCode);
        form.append("BrandName", brandName);
        form.append("UrlImageBrand", urlImageBrand);
        form.append("CategoryIds", categoryId);
        try {
            await putBrand(idBrand, form);
            alert("Cập nhập nhãn hiệu thành công ")
            close();
            window.location.reload()
            setBrandCode("");
            setBrandName("");
            setCategoryId("");
            setUrlImageBrand("");
            window.location.reload();
        } catch (error) {
            alert("Thêm nhãn hàng thất bại")
            console.log("Lỗi thêm nhãn hàng " + error);
        }
    }

    return (
        <>
            <div className=''>

                <div className="content-cateogry" style={{ margin: '50px auto', width: '95%', borderRadius: '10px', backgroundColor: '#FFF8F7' }}>
                    {/* {message && <p className="notification-success">Thêm thành công</p>}
                {errorMessage && <p className="notification-error">{errorMessage}</p>} */}
                    <div>
                        <div className="header-add">
                            <h1>Cập nhập nhãn hàng</h1>
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
                                                top: '180px',
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
                                            marginLeft: '-55px'
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
                                >Cập nhập nhãn hàng
                                </button>
                                <p><b>Vui lòng kiểm tra chính xác thông tin trước khi gửi dữ liệu</b></p>
                            </div>
                        </div>
                    </div>



                </div>

            </div>
        </>
    )
}
export default UpdateBrand;