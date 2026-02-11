import "../../styles/index.css"
import { useState } from 'react';
import { FaListAlt, FaFolder, FaHome, FaFacebookMessenger, FaFileInvoiceDollar, FaRegListAlt } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { MdCategory, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineSubject } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
function Sidebar() {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [show, setShow] = useState(false);
    const tonggleShow = () => {
        setShow(!show)
    }

    const [product, setProduct] = useState(false);
    const tongleProduct = () => {
        setProduct(!product);
    }

    const [order, setOrder] = useState(false);
    const tongleOrder = () => {
        setOrder(!order);
    }

    const [brand, setBrand] = useState(false);
    const tonggleBrand = () => {
        setBrand(!brand);
    }
    const [specification, setSpecification] = useState(false);
    const tonggleSpec = () => {
        setSpecification(!specification)
    }
    return (
        <>
            <div className="sidebar">
                <div className='sidebar-hearder'>
                    <img src='/image/Logo.png' className='image-logo' alt='Logo' />
                    TechStore
                </div>
                <div className='container-select-item'>
                    <div className='select-item'>
                        <div className='content-item'>
                            <Link to="/admin/homePage"> <i><FaHome /></i> Trang chủ</Link>
                        </div>
                    </div>
                    <div className={`dropdown ${activeDropdown === "category" ? "select-item-active" : ""}`}
                    >

                        <div className='select-item'
                            onClick={
                                () => {
                                    tonggleShow();
                                    setActiveDropdown("category");
                                }}>
                            <div className='content-item'>
                                <i><MdCategory /></i>Danh mục<MdOutlineKeyboardArrowDown />
                            </div>
                        </div>
                        {show && <div className='item-select-child'>
                            <Link to="/admin/addCategory" >
                                <div className='select-item-child'>
                                    <div className='content-item'>
                                        <i><FaFolder /></i>  <p>Thêm danh mục mới</p>
                                    </div>

                                </div>
                            </Link>
                            <Link to="/admin/listCategory">
                                <div className='select-item-child'>
                                    <div className='content-item'>
                                        <i><FaListAlt /></i>  <p>Quản lý danh mục</p>
                                    </div>

                                </div>
                            </Link>
                        </div>}
                    </div>
                    <div className={`dropdown ${activeDropdown === "brand" ? "select-item-active" : ""}`}>
                        <div className='select-item'>
                            <div className='content-item'
                                onClick={
                                    () => {
                                        tonggleBrand();
                                        setActiveDropdown("brand");
                                    }}
                            >
                                <i><MdOutlineSubject /></i>  Nhãn hiệu<MdOutlineKeyboardArrowDown />
                            </div>
                        </div>
                        {brand && <div className='item-select-child'>
                            <Link to="/admin/addBrand">
                                <div className='select-item-child'>
                                    <div className='content-item'>
                                        <i><FaFolder /></i> <p>Thêm nhãn hiệu</p>
                                    </div>

                                </div>

                            </Link>
                            <Link to="/admin/listBrand">
                                <div className='select-item-child'>
                                    <div className='content-item'>
                                        <i><FaListAlt /></i>  <p>Quản lý nhãn hiệu</p>
                                    </div>

                                </div>
                            </Link>
                        </div>}
                    </div>
                    <div className={`dropdown ${activeDropdown === "product" ? "select-item-active" : ""}`}>
                        <div className='select-item'
                            onClick={
                                () => {
                                    tongleProduct();
                                    setActiveDropdown("product");
                                }}
                        >
                            <div className='content-item'>
                                <i><AiFillProduct /></i>  Sản phẩm <MdOutlineKeyboardArrowDown />
                            </div>

                        </div>
                        {product && <div className='item-select-child'>
                            <Link to="/admin/addProduct">
                                <div className='select-item-child'>
                                    <div className='content-item'>
                                        <i><FaFolder /></i> <p>Thêm sản phẩm</p>
                                    </div>

                                </div>
                            </Link>
                            <Link to="/admin/addProductColor">
                                <div className='select-item-child'>
                                    <div className='content-item'>
                                        <i><FaFolder /></i> <p>Thêm màu sắc sản phẩm</p>
                                    </div>

                                </div>
                            </Link>
                            <Link to="/admin/addProductVariant">
                                <div className='select-item-child'>
                                    <div className='content-item'>
                                        <i><FaFolder /></i> <p>Thêm phiên bản sản phẩm</p>
                                    </div>

                                </div>
                            </Link>
                            <Link to="/admin/listProduct">
                                <div className='select-item-child'>
                                    <div className='content-item'>
                                        <i><FaListAlt /></i>  <p>Quản lý sản phẩm</p>
                                    </div>

                                </div>

                            </Link>
                        </div>}
                    </div>

                    <div className={`dropdown ${activeDropdown === "order" ? "select-item-active" : ""}`}
                    >
                        <div className='select-item'
                            onClick={
                                () => {
                                    tongleOrder();
                                    setActiveDropdown("order");
                                }}
                        >
                            <div className='content-item'>
                                <i><FaFileInvoiceDollar /></i>  Đơn hàng <MdOutlineKeyboardArrowDown />
                            </div>

                        </div>
                        {order && <div className='item-select-child'>
                            <Link to="/admin/listOrder">
                                <div className='select-item-child'>
                                    <div className='content-item'>
                                        <i><FaListAlt /></i>  <p>Quản lý đơn hàng</p>
                                    </div>

                                </div>

                            </Link>

                        </div>}
                    </div>
                    <div className={`dropdown ${activeDropdown === "specification" ? "select-item-active" : ""}`}
                    >
                        <div className='select-item'
                            onClick={
                                () => {
                                    tonggleSpec()
                                    setActiveDropdown("specification");

                                }}
                        >

                            <div className='content-item'>

                                <i><FaRegListAlt /></i> Thông số sản phẩm<MdOutlineKeyboardArrowDown />

                            </div>



                        </div>
                        {specification && <div className='item-select-child'>
                            <Link to="/admin/addSpecification">
                                <div className='select-item-child'>
                                    <div className='content-item'>
                                        <i><FaFolder /></i> <p>Thêm loại thông số</p>

                                    </div>
                                </div>
                            </Link>
                            <Link to="/admin/addSpecificationDetail">
                                <div className='select-item-child'>
                                    <div className='content-item'>
                                        <i><FaFolder /></i> <p>Thêm chi tiết thông số</p>
                                    </div>

                                </div>

                            </Link>


                        </div>}

                    </div>
                    <div><FaFacebookMessenger /> Tin nhắn</div>
                </div>
            </div >
        </>
    )
}
export default Sidebar;