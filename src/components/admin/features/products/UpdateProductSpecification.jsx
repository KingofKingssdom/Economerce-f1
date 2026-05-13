import "../../../../styles/index.css"
import { useState } from "react";
import { putProductSpecification } from "../../../../services/ApiProduct";
import { useParams } from "react-router-dom";
function UpdateSpecification(props) {
    const productSpecificationId = props.id
    const close = props.onSuccess;
    const [nameSpecification, setNameSpecification] = useState("");
    const handleNameSpecification = (e) => {
        setNameSpecification(e.target.value)
    }
    const handleSubmit = async () => {

        try {
            await putProductSpecification(productSpecificationId, nameSpecification)
            alert("Cập nhập thông số sản phẩm thành công");
            setNameSpecification("");
            window.location.reload()
        } catch (error) {
            alert("Cập nhập thông số sản phẩm không thành công ");
            console.log("Lỗi thêm thông số sản phẩm " + error);
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
                            <h1>Cập nhập thông số</h1>
                            <p>Quản lý các thông số trong hệ thống cửa hàng của bạn</p>
                        </div>
                        <div className="form-container" style={{ margin: '60px auto', width: '50%' }}>
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
                            <button className='button-add' onClick={handleSubmit}>Cập nhập thông số</button>
                            <p><b>Vui lòng kiểm tra chính xác thông tin trước khi gửi dữ liệu</b></p>

                        </div>
                    </div>



                </div>

            </div>
        </>
    )
}
export default UpdateSpecification;