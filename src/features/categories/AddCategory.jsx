import "../../styles/index.css"
import { useState } from "react";
import { postCategory } from "../../services/ApiCategory";
function AddCateogry() {
    const [categoryName, setCategoryName] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData()
        form.append("categoryName", categoryName);

        try {
            const response = await postCategory(form);
            alert("Thêm dữ liệu thành công")
            setCategoryName("");

        }
        catch (error) {
            alert("Thêm dữ liệu danh mục không thành công")
            console.error(" Lỗi thêm dữ liệu danh mục " + error);

        }
    };
    return (
        <>
            <div className='container-admin'>

                <div className="content-cateogry">
                    {/* {message && <p className="notification-success">Thêm thành công</p>}
                {errorMessage && <p className="notification-error">{errorMessage}</p>} */}
                    <div className="header-add">
                        <h1>Thêm Danh mục</h1>
                    </div>
                    <div className="container-form-category">
                        <div className="form-container">

                            <form onSubmit={handleSubmit}>

                                <div className="form-container-category">
                                    <label htmlFor="categoryName">Thêm tên danh mục:</label>
                                    <input
                                        type="text"
                                        id="categoryName"
                                        name="categoryName"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        required
                                    />
                                    <button className='button-add' type="submit">Thêm</button>
                                </div>


                            </form>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
export default AddCateogry;