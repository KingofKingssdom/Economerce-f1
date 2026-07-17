import "../../../../styles/index.css"
import Carousel from 'react-bootstrap/Carousel';

function BannerCarousel() {
    return(
        <>
        <div className="container-banner">
            <Carousel>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="./image/Banner1.png"
            alt="Banner1"
            />
        </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./image/Banner2.png"
          alt="Banner2"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./image/Banner3.png"
          alt="Banner3"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./image/Banner4.png"
          alt="Banner4"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./image/Banner5.png"
          alt="Banner5"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./image/Banner6.png"
          alt="Banner6"
        />
      </Carousel.Item>
    </Carousel>
        </div>
        </>
    )
}
export default BannerCarousel