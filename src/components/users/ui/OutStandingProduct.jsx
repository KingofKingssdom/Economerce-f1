import "../../../styles/index.css";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { getProductPromotional } from "../../../services/ApiProduct";
import ProductSlider from "../common/ProductSlider";
function OutStandingProduct() {
    const [productPhone, setProductPhone] = useState([]);
    const [productTablet, setProductTablet] = useState([]);
    const categoryPhone = 1;
    const categoryTablet = 2;
    useEffect(() => {
        getProductPromotional(categoryPhone).then(
            (response) => {
                setProductPhone(response.data);
            }
        )

    }, [])
    useEffect(() => {
        getProductPromotional(categoryTablet).then(
            (response) => {
                setProductTablet(response.data);
            }
        )

    }, [])
    return (
        <>
            <div className="container-outStanding">
                <div className="content-outStading">
                    <div className="container-outStanding-header">
                        <h3>SẢN PHẨM NỔI BẬT NHẤT</h3>
                    </div>
                    <div className="container-phone">
                        <div className="title-box-product">
                            <div className="container-title-product">
                                <h2>ĐIỆN THOẠI</h2>
                                <p>Khám phá những dòng điện thoại mới nhất</p>
                            </div>
                            <Link to="/phoneProduct"><button className="btn-see-all">Xem tất cả <div className="iconrow-btn-see-all"><FaArrowRight /></div></button> </Link>
                        </div>
                        <div className="item-box-phone-noibat">
                            <div className="box-banner-noibat">
                                <img src='./image/BannerPhoneNoiBat.png' alt="banner sản phẩm" />
                            </div>
                            <div className="box-product-noibat">
                                <ProductSlider
                                    data={productPhone}
                                    links="/phoneDetail"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="title-box-product">
                            <div className="container-title-product">
                                <h2>Tablet</h2>
                                <p>Giá trị và làm việc không giới hạn</p>
                            </div>
                            <Link to="/tabletProduct"><button className="btn-see-all">Xem tất cả <div className="iconrow-btn-see-all"><FaArrowRight /></div></button> </Link>
                        </div>
                        <div className="item-box-tablet-noibat">
                            <div className="box-banner-noibat">
                                <img src='./image/BannerPhoneNoiBat.png' alt="banner sản phẩm" />
                            </div>
                            <div className="box-product-noibat">
                                <ProductSlider
                                    data={productTablet}
                                    links="/tabletDetail"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default OutStandingProduct;