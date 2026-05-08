import "../../../styles/index.css"
import { useEffect, useState } from "react";
import ProductList from "../../../components/users/common/ProducList"
import { getBrandByCategoryId } from "../../../services/ApiBrand";
import { getProductByCategoryId } from "../../../services/ApiProduct";
function TabletListProduct() {
    const [dataBrand, setDataBrand] = useState(null);
    const [dataProduct, setDataProduct] = useState([]);
    const categoryTablet = 2;
    const linkTablet = "/phoneDetail"
    const fetchBrand = async () => {
        try {
            await getBrandByCategoryId(categoryTablet).then((response) => {
                setDataBrand(response.data);
            })
        } catch (error) {
            console.log('Lỗi lấy nhãn hiệu theo danh mục ' + error)
        }
    }
    useEffect(() => {
        fetchBrand()
    }, [])
    const fetchProduct = async () => {
        try {
            await getProductByCategoryId(categoryTablet).then((response) => {
                setDataProduct(response.data);
            })
        } catch (error) {
            console.log('Lỗi lấy sản phẩm theo danh mục ' + error)
        }
    }
    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <>
            <div className="container-detail">
                <p className="name-product-detail"></p>
                <ProductList
                    dataBrand={dataBrand}
                    dataProduct={dataProduct}
                    categoryId={categoryTablet}
                    link={linkTablet}
                />
            </div>
        </>
    )
}
export default TabletListProduct