import "../../../styles/index.css"
import { useState, useRef, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Product from "./Product";
function ProductSlider({ data = [], getLink }) {
  const datas = data;


  const [currentIndex, setCurrentIndex] = useState(0);
  const [widthBox, setWidthBox] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);
  const BoxRef = useRef(null);
  useEffect(() => {
    const updateWidth = () => {
      if (BoxRef.current) {
        const width = BoxRef.current.offsetWidth;
        console.log("width", width);
        setWidthBox(width);
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1200) setItemsToShow(5);
        else if (screenWidth >= 992) setItemsToShow(4);
        else if (screenWidth >= 768) setItemsToShow(3);
        else setItemsToShow(2);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });

  const changeLeft = () => {
    setCurrentIndex((pre) => Math.max(pre - widthBox, 0));
  };

  const changeRight = () => {
    const maxOffset = (datas.length - itemsToShow) * widthBox;
    setCurrentIndex((prev) => {
      const next = prev + widthBox;
      if (next > maxOffset) {
        return prev;
      }
      return next;
    });
  };
  return (
    <>
      <div
        className="container-box"
      >
        <div
          className="slider-box-product"
          style={{
            display: "flex",
            transform: `translateX(-${currentIndex}px)`,
            transition: "transform 0.7s ease",

          }}
        >
          {data.map((item) => {
            const link = getLink ? getLink(item) : "/productDetail";

            return (
              <Product
                key={item.id}
                preLink={link}
                id={item.id}
                discountInfo="Trả góp 0%"
                image={item.urlPhotoProduct}
                title={item.productName}
                price={item.productVariants?.[0]?.priceDiscount}
                discount={item.productVariants?.[0]?.priceOrigin}
                description={item.description}
              />
            );
          })}
        </div>

        {/* Nút điều hướng */}
        <div className="container-button-slider-product">

          <button onClick={changeLeft} className="btn-left-product">
            <IoIosArrowBack />
          </button>

          <button onClick={changeRight} className="btn-right-product">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </>
  )
}
export default ProductSlider