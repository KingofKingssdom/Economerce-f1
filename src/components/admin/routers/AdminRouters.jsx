import { Route } from 'react-router-dom';
import AdminProtectedRoute from './AdminProtectedRoute';
import AdminHomePage from '../pages/AdminHomePage';
import AddCateogry from '../features/categories/AddCategory';
import ListCategory from '../features/categories/ListCategory';
import AddBrand from '../features/brands/AddBrand';
import ListBrand from '../features/brands/ListBrand';
import AddProduct from '../features/products/AddProduct';
import AddProductVariant from '../features/products/AddProductVariant';
import ListProduct from '../features/products/ListProduct';
import ListOrder from '../features/orders/ListOrder';
import AddProductSpecification from '../features/products/AddProductSpecification';
import ListProductDetail from '../features/products/ListProductDetail';
import ListOrderDetail from '../features/orders/ListOrderDetail';
import ListProductSpecification from '../features/products/ListProductSpecification';
const AdminRouter = (
    <>
        <Route path="/admin/homePage" element={
            <AdminProtectedRoute>
                <AdminHomePage />
            </AdminProtectedRoute>
        } />
        <Route path="/admin/addCategory" element={
            <AdminProtectedRoute>
                <AddCateogry />
            </AdminProtectedRoute>
        } />
        <Route path="/admin/listCategory" element={
            <AdminProtectedRoute>
                <ListCategory />
            </AdminProtectedRoute>

        } />
        <Route path="/admin/addBrand" element={
            <AdminProtectedRoute>
                <AddBrand />
            </AdminProtectedRoute>
        } />
        <Route path="/admin/listBrand" element={
            <AdminProtectedRoute>
                <ListBrand />
            </AdminProtectedRoute>
        } />
        <Route path="/admin/addProduct" element={
            <AdminProtectedRoute>
                <AddProduct />
            </AdminProtectedRoute>
        } />
        <Route path="/admin/addProductVariant/:productId" element={
            <AdminProtectedRoute>
                <AddProductVariant />
            </AdminProtectedRoute>
        } />
        <Route path="/admin/listProduct" element={
            <AdminProtectedRoute>
                <ListProduct />
            </AdminProtectedRoute>
        } />
        <Route path="/admin/listOrder" element={
            <AdminProtectedRoute>
                <ListOrder />
            </AdminProtectedRoute>
        } />
        <Route path="/admin/addProductSpecification" element={
            <AdminProtectedRoute>
                <AddProductSpecification />
            </AdminProtectedRoute>
        } />
        {/* <Route path="/admin/addSpecificationDetail" element={
            <AdminProtectedRoute>
                <AddProductSpecificationDetail />
            </AdminProtectedRoute>
        } /> */}
        <Route path="/admin/product-variants/id/:id" element={
            <AdminProtectedRoute>
                <ListProductDetail />
            </AdminProtectedRoute>
        } />
        <Route path="/admin/orderDetail/:id" element={
            <AdminProtectedRoute>
                <ListOrderDetail />
            </AdminProtectedRoute>
        } />
        <Route path="/admin/listSpecification" element={
            <AdminProtectedRoute>
                <ListProductSpecification />
            </AdminProtectedRoute>
        } />
    </>
)
export default AdminRouter