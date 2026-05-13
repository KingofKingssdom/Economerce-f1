import "../../../../styles/index.css"
import { useEffect, useState } from "react";
import ProductList from "../../common/ProducList";
import { getBrandByCategoryId } from "../../../../services/ApiBrand";
import { getProductByCategoryId } from "../../../../services/ApiProduct";
function PhoneListProduct() {
    const [dataBrand, setDataBrand] = useState(null);
    const [dataProduct, setDataProduct] = useState([]);
    const categoryPhone = 1;
    const linkPhone = "/phoneDetail"
    const fetchBrand = async () => {
        try {
            await getBrandByCategoryId(categoryPhone).then((response) => {
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
            await getProductByCategoryId(categoryPhone).then((response) => {
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
                    categoryId={categoryPhone}
                    link={linkPhone}
                />
            </div>
        </>
    )
}
export default PhoneListProduct