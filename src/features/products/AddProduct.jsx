import "../../styles/index.css"
import { useEffect, useState } from 'react';
import { getBrand } from "../../services/ApiBrand";
import { postProduct } from "../../services/ApiProduct";
import { getCategory } from "../../services/ApiCategory";
function AddProduct() {
    const [productCode, setProductCode] = useState("");
    const [productName, setProductName] = useState("");
    const [quantityProduct, setQuantityProduct] = useState("");
    const [description, setDescription] = useState("");
    const [featured, setFeatured] = useState("");
    const [promotional, setPromotional] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [brandId, setBrandId] = useState("");
    const [urlPhoto, setUrlPhoto] = useState("");



    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    // const [errorMessage, setErrorMessage] = useState("");
    // const [message, setMessage] = useState(false);

    const fetchBrand = async () => {
        try {
            await getBrand().then((response) => {
                setBrands(response.data)
            })
        } catch (error) {
            console.log("Lỗi gọi dữ liệu lấy toàn bộ nhãn hiệu " + error);
        }
    }

    const fetchCategory = async () => {
        try {
            await getCategory().then((response) => {
                setCategories(response.data);
            })
        } catch (error) {
            console.log("Lỗi lấy toàn bộ danh mục " + error);
        }
    }
    useEffect(() => {
        fetchBrand();
        fetchCategory();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("productCode", productCode);
        form.append("productName", productName);
        form.append("quantityProduct", quantityProduct);
        form.append("description", description);
        form.append("featured", featured);
        form.append("promotional", promotional);
        form.append("categoryId", categoryId);
        form.append("brandId", brandId);
        form.append("urlPhoto", urlPhoto);
        try {
            postProduct(form);
            alert("Thêm sản phẩm thành công");

            setProductName("");
            setProductCode("");
            setFeatured("");
            setPromotional("");
            setQuantityProduct("");
            setDescription("");
            setUrlPhoto("");
        } catch (error) {
            alert("Thêm sản phẩm không thành công");
            console.log("Lỗi thêm sản phẩm " + error);
        }
    }

    return (
        <>
            <div className='container-admin'>
                <div className="content-add-product">
                    {/* {message && <p className="notification-success">Thêm thành công</p>}
                {errorMessage && <p className="notification-error">Thêm không thành công</p>} */}

                    <h1>Thêm sản phẩm</h1>

                    <div className="form-container">

                        <form onSubmit={handleSubmit}>
                            <div className="form-add-product">
                                <div className="item-form-common">
                                    <label htmlFor="productCode">Mã sản phẩm:</label>
                                    <input
                                        type="text"
                                        id="productCode"
                                        name="productCode"
                                        value={productCode}
                                        onChange={(e) => setProductCode(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="item-form-common">
                                    <label htmlFor="fullName">Tên sản phẩm:</label>
                                    <input
                                        type="text"
                                        id="productName"
                                        name="productName"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="item-form-common">
                                    <label htmlFor="description">Thông tin khuyến mãi:</label>
                                    <input
                                        type="text"
                                        id="description"
                                        name="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="item-form-common">
                                    <label htmlFor="quantityProduct">Số lượng nhập hàng:</label>
                                    <input
                                        type="number"
                                        id="quantityProduct"
                                        name="quantityProduct"
                                        value={quantityProduct}
                                        onChange={(e) => setQuantityProduct(e.target.value)}
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
                                    <label htmlFor="brandId">Nhãn hiệu sản phẩm:</label>
                                    <select
                                        id="brandId"
                                        name="brandId"
                                        value={brandId}
                                        onChange={(e) => setBrandId(Number(e.target.value))}
                                    >
                                        <option value="">Chọn</option>
                                        {brands.map((brand) => (
                                            <option key={brand.id} value={brand.id}>{brand.brandName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="item-form-common">
                                    <label htmlFor="featured">Sản phẩm nổi bật:</label>
                                    <select
                                        id="featured"
                                        name="featured"
                                        value={featured}
                                        onChange={(e) => setFeatured(e.target.value)}
                                    >
                                        <option value="">Chọn</option>
                                        <option value="true">Có</option>
                                        <option value="false">Không</option>
                                    </select>
                                </div>
                                <div className="item-form-common">
                                    <label htmlFor="promotional">Sản phẩm khuyến mãi:</label>
                                    <select
                                        id="promotional"
                                        name="promotional"
                                        value={promotional}
                                        onChange={(e) => setPromotional(e.target.value)}
                                    >
                                        <option value="">Chọn</option>
                                        <option value="true">Có</option>
                                        <option value="false">Không</option>
                                    </select>
                                </div>
                                <div className="item-form-common">
                                    <label htmlFor="urlPhoto">Chọn ảnh sản phẩm:</label>
                                    <input
                                        type="file"
                                        id="urlPhoto"
                                        name="urlPhoto"
                                        onChange={(e) => setUrlPhoto(e.target.files[0])}
                                    />
                                </div>
                                <div className="container-button-add-product">
                                    <button className='button-add' type="submit">Thêm</button>
                                </div>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddProduct;