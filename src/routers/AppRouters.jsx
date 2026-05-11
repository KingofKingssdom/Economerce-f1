import "../styles/index.css"
import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import { IoIosArrowUp } from "react-icons/io";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout"
import HomePage from "../pages/user/HomePage";
import AdminHomePage from "../pages/admin/AdminHomePage";
import AddCategory from "../features/categories/AddCategory";
import Login from "../features/Login";
import ListCategory from "../features/categories/ListCategory";
import AddBrand from "../features/brands/AddBrand";
import ListBrand from "../features/brands/ListBrand";
import AddProduct from "../features/products/AddProduct";
import AddProductVariant from "../features/products/AddProductVariant";
import ListProduct from "../features/products/ListProduct";
import ListOrder from "../features/order/ListOrder";
import AddProductSpecification from "../features/products/AddProductSpecification";
import AddProductSpecificationDetail from "../features/products/AddProductSpecificationDetail";
import ListProductDetail from "../features/products/ListProductDetail";
import PhoneProductDetail from "../features/user/phone/PhoneProductDetail";
import Cart from "../features/user/cart/Cart";
import PayMethod from "../features/user/pay/Paymethod";
import PayResult from "../features/user/pay/Payresult";
import Order from "../features/user/order/Order";
import OrderDetail from "../features/user/order/OrderDetail";
import PhoneListProduct from "../features/user/phone/PhoneListProduct";
import { ImImage } from "react-icons/im";
import AdminProtectedRoute from "./AdminProtectedRoute"
import TabletProduct from "../features/user/tablet/TabletListProduct";
import LaptopListProduct from "../features/user/laptop/LaptopListProduct";
import TabletProductDetail from "../features/user/tablet/TabletProductDetail";
import LaptopProductDetail from "../features/user/laptop/LaptopProductDetail";
import SoundListProduct from "../features/user/sound/SoundListProduct";
import SoundProductDetail from "../features/user/sound/SoundProductDetail";
import WatchListProduct from "../features/user/watch/WatchListProduct";
import WatchProductDetail from "../features/user/watch/WatchProductDetail";
import ScreenListProduct from "../features/user/screen/ScreenListProduct";
import ScreenProductDetail from "../features/user/screen/ScreenProductDetail";
import TiviListProduct from "../features/user/tivi/TiviListProduct";
import TiviProductDetail from "../features/user/tivi/TiviProductDetail";
import UpdateCateogry from "../features/categories/UpdateCategory";
function AppRouters() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <>
            <Routes>
                {/* Layout User */}
                <Route element={<UserLayout />}>

                    <Route path="/" element={<HomePage />} />
                    <Route path="/phoneDetail/:id" element={<PhoneProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/payOnline" element={<PayMethod />} />
                    <Route path="/pay-result" element={<PayResult />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/orderDetail/:id" element={<OrderDetail />} />
                    <Route path="/phoneProduct" element={<PhoneListProduct />} />
                    <Route path="/tabletProduct" element={<TabletProduct />} />
                    <Route path="/laptopProduct" element={<LaptopListProduct />} />
                    <Route path="/tabletDetail/:id" element={<TabletProductDetail />} />
                    <Route path="/laptopDetail/:id" element={<LaptopProductDetail />} />
                    <Route path="/soundProduct" element={<SoundListProduct />} />
                    <Route path="/soundDetail/:id" element={<SoundProductDetail />} />
                    <Route path="/watchProduct" element={<WatchListProduct />} />
                    <Route path="/screenProduct" element={<ScreenListProduct />} />
                    <Route path="/tiviProduct" element={<TiviListProduct />} />
                    <Route path="/screenDetail/:id" element={<ScreenProductDetail />} />
                    <Route path="/watchDetail/:id" element={<WatchProductDetail />} />
                    <Route path="/tiviDetail/:id" element={<TiviProductDetail />} />
                    {/*  
                        <Route path="/confirmInformation/:id" element={<Information />} />
                        */}

                </Route>
                <Route path="/login" element={<Login />} />

                {/* Layout Admin */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="/admin/homePage" element={
                        <AdminProtectedRoute>
                            <AdminHomePage />
                        </AdminProtectedRoute>

                    } />
                    {/* <Route path="/admin/homePage" element={<AdminHomePage />} /> */}
                    <Route path="/admin/addCategory" element={<AddCategory />} />
                    <Route path="/admin/listCategory" element={<ListCategory />} />
                    <Route path="/admin/addBrand" element={<AddBrand />} />
                    <Route path="/admin/listBrand" element={<ListBrand />} />
                    <Route path="/admin/addProduct" element={<AddProduct />} />
                    <Route path="/admin/addProductVariant/:productId" element={<AddProductVariant />} />
                    <Route path="/admin/listProduct" element={<ListProduct />} />
                    <Route path="/admin/listOrder" element={<ListOrder />} />
                    <Route path="/admin/addSpecification" element={<AddProductSpecification />} />
                    <Route path="/admin/addSpecificationDetail" element={<AddProductSpecificationDetail />} />
                    <Route path="/admin/product-variants/id/:id" element={<ListProductDetail />} />
                    <Route path="/admin/updateCategory/:id" element={<UpdateCateogry />} />


                    {/*   
                       
                        
                        
                      
                        
                       
                        
                        <Route path="/admin/updateBrand/:id" element={<UpdateBrand />} />
                        <Route path="/admin/updateProduct/:id" element={<UpdateProduct />} />
                        <Route path="/admin/listUser" element={<ListUser />} />
                       
                        <Route path="/admin/orderDetail/:id" element={<ListOrderDetail />} />
                        
                       
                        
                        
               
                {/* <Route path="/admin/login" element={<LoginAdmin />} /> */}
                </Route>
            </Routes>


            {showButton && (
                <div className="button-scroll-top" onClick={handleScrollToTop}>
                    <IoIosArrowUp className="icon-scroll" />
                    <p>Lên đầu</p>
                </div>
            )}

        </>
    )
}
export default AppRouters;