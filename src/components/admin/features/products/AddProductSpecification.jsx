import "../../../../styles/index.css"
import { useEffect, useState } from 'react';
import { postProductSpecification } from "../../../../services/ApiProduct";
function AddProductSpecification() {
    //  const [errorMessage, setErrorMessage] = useState("");
    // const [message, setMessage] = useState(false);

    const [nameSpecification, setNameSpecification] = useState("");
    const handleNameSpecification = (e) => {
        setNameSpecification(e.target.value)
    }
    const handleSubmit = async () => {

        try {
            await postProductSpecification(nameSpecification)
            alert("Thêm thông số sản phẩm thành công");
            setNameSpecification("");
        } catch (error) {
            alert("Thêm thông số sản phẩm không thành công ");
            console.log("Lỗi thêm thông số sản phẩm " + error);
        }
    }

    return (
        <>
            <div className='container-admin'>
                <div className="content-cateogry">
                    {/* {message && <p className="notification-success">Thêm thành công</p>}
                    {errorMessage && <p className="notification-error">Thêm không thành công</p>} */}
                    <div className="header-add">
                        <h1>Thêm thông số sản phẩm</h1>
                    </div>
                    <div className="container-form-add">

                    </div>
                    <div style={{ width: '50%', margin: '0 auto' }}>

                        <div className="form-container">
                            <div className="form-content">
                                <div className="item-form-content">
                                    <label htmlFor="nameSpecification" className="lable-form">TÊN THÔNG SỐ</label>
                                    <input
                                        className="input-form"
                                        type="text"
                                        id="nameSpecification"
                                        name="nameSpecification"
                                        value={nameSpecification}
                                        onChange={handleNameSpecification}
                                        placeholder="VD: Màn hình"
                                        required

                                    />
                                </div>


                            </div>
                            <button className='button-add' onClick={handleSubmit}>Thêm thông số</button>
                            <p><b>Vui lòng kiểm tra chính xác thông tin trước khi gửi dữ liệu</b></p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddProductSpecification;