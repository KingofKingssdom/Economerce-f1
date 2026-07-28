import "../../../../styles/index.css"
import { useEffect, useState } from "react";
import ProductList from "../../common/ProducList";
import { getBrandByCategoryId } from "../../../../services/ApiBrand";
import { getProductByCategoryId } from "../../../../services/ApiProduct";
function LaptopListProduct() {
    const [dataBrand, setDataBrand] = useState(null);
    const [dataProduct, setDataProduct] = useState([]);
    const categoryLaptop = 3;
    const linkLaptop = "/laptopDetail"
    const fetchBrand = async () => {
        try {
            await getBrandByCategoryId(categoryLaptop).then((response) => {
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
            await getProductByCategoryId(categoryLaptop).then((response) => {
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
                    categoryId={categoryLaptop}
                    link={linkLaptop}
                />
            </div>
        </>
    )
}
export default LaptopListProduct