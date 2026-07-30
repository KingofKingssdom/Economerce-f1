import "../../../styles/index.css"
import Category from "../ui/Category";
import SearchProduct from "../ui/SearchProduct";
import { CiViewList } from "react-icons/ci";
import { IoMdSearch, IoIosClose } from "react-icons/io";
import { FaCartPlus, FaRegUser } from "react-icons/fa";
import { AiOutlineCaretDown } from "react-icons/ai";
import { LuTruck } from "react-icons/lu";
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import { getUserCurrent } from "../../../services/ApiAuth";
function Header() {

    const location = useLocation(); // sử dụng useLocation để lấy pathname hiện tại 
    const navigate = useNavigate(); // sử dụng useNavigate để chuyển hướng đến trang mong muốn 
    const [showCategory, setShowCategory] = useState(false);
    const [search, setSearch] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [searchItem, setSearchItem] = useState('');
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("");
    const handleCall = () => {
        alert('Liên hệ số điện thoại 0942314');
    }

    const handleCategory = () => {
        setShowCategory((pre) => !pre);
    }

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        setUser(null);
        setShowUserMenu(false);
        navigate("/Login");
    }
    const openBoxSearch = () => {
        setSearch(true);
    }
    const closeBoxSearch = () => {
        setSearch(false);
    }
    const handleSearchChange = (e) => {
        setSearchItem(e.target.value);
    }
    const handleOrder = ()=>{
        if(user){
            navigate("/order");
            setActiveTab("order");
        }
        else{
            navigate("/login");
        }
    }
    const handleCart = () =>{
        if(user){
            navigate("/cart");
            setActiveTab("cart");
        }else{
            navigate("/login");
        }
    }
    useEffect(() => {
        getUserCurrent().then((response) => {
            setUser(response);
        })
    }, [])

    useEffect(() => {
        if (showCategory) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showCategory]);

    return (
        <>
            <div className="container-header">
                <div className='content-header-top'>
                    <div className="content-header-child-top">
                        <div className='header-item-call'
                            onClick={handleCall}
                        >
                            <div className="header-item-call">
                                <p>Hotline: 1900 1234</p>
                            </div>

                        </div>
                        <div className='tb-ship'>
                            Miễn phí vận chuyển từ 500k
                        </div>
                        {/*Box thông tin dành cho mobile*/}
                         <div className='container-login-mobile'>
                            <div className='header-box-right'>
                                <div className='header-item-order' > {/*onClick={() => { user ? navigate("/order") : navigate("/login") }}*/}
                                    <div className="btn-order">
                                        <LuTruck className='order-icon' />
                                    </div>
                                </div>
                                <div className='header-item-cart'>{/* onClick={() => user ? navigate("/cart") : navigate("/login")}*/}
                                    <div className="btn-cart">
                                        <FaCartPlus />
                                    </div>
                                </div>
                                {/* Thông tin user + Logout */}
                                <div className="header-item-username">
                                    <FaRegUser className="icon-login" />

                                    {user ? (
                                        <>
                                            <p
                                                className="name-user"
                                                onClick={() => setShowUserMenu(!showUserMenu)}
                                            >
                                                {user.fullName.split(" ").pop()}
                                            </p>

                                            {showUserMenu && (
                                                <div className="user-dropdown" >
                                                    <button onClick={handleLogout}>
                                                        Đăng xuất <MdOutlineLogout />
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link to="/login" className="login-link" onClick={(e) => e.stopPropagation()}>
                                            Đăng nhập
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='content-header-bottom'>
                    <div className="content-header-child-bottom">
                        <div className="logo">
                            <Link to="/">
                                <img src="./image/Logo.png" alt='Ảnh logo' />
                            </Link>
                        </div>
                        <div className="header-item-category"
                            onClick={handleCategory}
                        >
                            <div className={`btn-category ${showCategory ? 'btn-category-change' : ''}`}>
                                <CiViewList className='icon-category' />
                                <p>Danh mục</p>
                                <div className={`arow-category ${showCategory ? 'arow-chage-category' : ''}`}>
                                    <AiOutlineCaretDown />
                                </div>
                            </div>
                            {/* Ẩn hiện danh mục khi click */}
                            <div className={`nen-category ${showCategory ? 'active' : ''}`}>
                                <div className={`container-category ${showCategory ? 'show' : ''}`}> 
                                    <Category />
                                </div>
                            </div>

                        </div>
                        <div className='header-item-search'>
                            <div className='search-left'>
                                <IoMdSearch className='icon-search' />
                            </div>
                            <input
                                placeholder='Bạn muốn tìm gì hôm nay ?'
                                onFocus={openBoxSearch}
                                onChange={handleSearchChange}
                                value={searchItem}
                            />
                            <div className='close-search'
                                onClick={closeBoxSearch}
                            >
                                <IoIosClose />
                            </div>
                        </div>
                        <div className='header-box-right not-mobile'>
                            <div  onClick={handleOrder}>
                                <div className={`btn-order ${activeTab === "order" ? "active-tab-header" : ""}`}>
                                    <LuTruck/>
                                </div>
                            </div>
                            <div onClick={handleCart}>
                                <div className={`btn-cart ${activeTab === "cart" ? "active-tab-header" : ""}`} >
                                    <FaCartPlus />
                                </div>
                            </div>
                            {/* Thông tin user + Logout */}
                            <div className="header-item-username">
                                <FaRegUser className="icon-login" />
                                {user ? (
                                    <>
                                        <p
                                            className="name-user"
                                            onClick={() => setShowUserMenu(!showUserMenu)}
                                        >
                                            {user.fullName.split(" ").pop()}
                                        </p>

                                        {showUserMenu && (
                                            <div className="user-dropdown">
                                                <button onClick={handleLogout}>
                                                    Đăng xuất <MdOutlineLogout />
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link to="/login" className="login-link" onClick={(e) => e.stopPropagation()}>
                                        Đăng nhập
                                    </Link>
                                )}
                            </div>
                        </div>


                    </div>
                </div>
                
                <div className={`box-show-search ${search ? 'search-show' : ''}`}>
                    <div className="triangle-up">
                    
                    </div>
                    <SearchProduct
                        dataSearch={searchItem}
                    />
                </div>
            </div>



        </>
    )
}
export default Header;