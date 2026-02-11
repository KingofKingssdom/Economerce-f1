import { useEffect, useState } from "react";
import "../../styles/index.css"
import { getCategory } from "../../services/ApiCategory";
import { postBrand } from "../../services/ApiBrand";
function AddBrand() {
    // const [errorMessage, setErrorMessage] = useState("");
    // const [message, setMessage] = useState("");


    const [brandName, setBrandName] = useState("");
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
        form.append("brandName", brandName);
        form.append("urlImageBrand", urlImageBrand);
        form.append("categoryId", categoryId);
        try {
            await postBrand(form);
            alert("Thêm nhãn hàng thành công ")
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
                <div className="content-brand">
                    {/* {message && <p className="notification-success">Thêm thành công</p>}
                {errorMessage && <p className="notification-error">{errorMessage}</p>} */}
                    <div className="header-add">
                        <h1>Thêm nhãn hàng</h1>
                    </div>
                    <div className="form-container">

                        <form onSubmit={handleSubmit}>

                            <div className="item-form-common">
                                <label htmlFor="brandName">Tên nhãn hàng:</label>
                                <input
                                    type="text"
                                    id="brandName"
                                    name="brandName"
                                    value={brandName}
                                    onChange={(e) => setBrandName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="item-form-common">
                                <label htmlFor="categoryId">Danh mục sản phẩm:</label>
                                <select
                                    id="categoryId"
                                    name="categoryId"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(Number(e.target.value))}
                                >
                                    <option value="">Chọn</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.categoryName}</option>
                                    ))}

                                </select>
                            </div>
                            <div className="item-form-common">
                                <label htmlFor="urlImageBrand">Chọn ảnh nhãn hàng:</label>
                                <input
                                    type="file"
                                    id="urlImageBrand"
                                    name="urlImageBrand"
                                    onChange={(e) => setUrlImageBrand(e.target.files[0])}
                                />
                            </div>

                            <button className='button-add' type="submit">Thêm</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddBrand;