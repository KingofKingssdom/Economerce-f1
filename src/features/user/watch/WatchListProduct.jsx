import "../../../styles/index.css"
import { useEffect, useState } from "react";
import ProductList from "../../../components/users/common/ProducList"
import { getBrandByCategoryId } from "../../../services/ApiBrand";
import { getProductByCategoryId } from "../../../services/ApiProduct";
function WatchListProduct() {
    const [dataBrand, setDataBrand] = useState(null);
    const [dataProduct, setDataProduct] = useState([]);
    const categoryWatch = 5;
    const linkWatch = "/watchDetail"
    const fetchBrand = async () => {
        try {
            await getBrandByCategoryId(categoryWatch).then((response) => {
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
            await getProductByCategoryId(categoryWatch).then((response) => {
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
                    categoryId={categoryWatch}
                    link={linkWatch}
                />
            </div>
        </>
    )
}
export default WatchListProduct