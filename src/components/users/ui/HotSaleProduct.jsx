import "../../../styles/index.css";
import { useState, useEffect } from "react";
import { getProductFeatured } from "../../../services/ApiProduct";
import ProductSlider from "../common/ProductSlider";
function HotSaleProduct() {
  const [dataProduct, setDataProduct] = useState([]);
  useEffect(() => {
    getProductFeatured().then((response) => {
      setDataProduct(response.data);
    })
  }, [])
  return (
    <>
      <div className="container-hotSale">
        <div className="container-header-hotSale">
          <div className="header-hotSale">
            <p>BẢNG TIN KHUYẾN MÃI</p>
          </div>
          <div className="top-sale">
          </div>
        </div>


        <div className="content-hotSale">

          <ProductSlider
            getLink={(product) => {
              switch (product.categoryId) {
                case 1:
                  return "/phoneDetail";
                case 2:
                  return "/tabletDetail";
                case 3:
                  return "/laptopDetail";
                default:
                  return "/productDetail";
              }
            }}

            data={dataProduct}
          />
        </div>

      </div>
    </>
  )
}
export default HotSaleProduct;