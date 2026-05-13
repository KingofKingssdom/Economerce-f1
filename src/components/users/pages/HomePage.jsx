import "../../../styles/index.css"
import HotSaleProduct from "../ui/HotSaleProduct";
import OutStandingProduct from "../ui/OutStandingProduct";
import ExperienceBuy from "../ui/ExperienceBuy";
import CategoryBox from "../ui/CategoryBox";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
function HomePage() {
    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: false,
        });
    }, []);
    return (
        <>
            {/* <Banner /> */}
            <div>
                <CategoryBox />
            </div>
            <div data-aos="fade-down">
                <HotSaleProduct />
            </div>

            <div data-aos="fade-right">
                <OutStandingProduct />
            </div>
            <div>
                <ExperienceBuy />
            </div>

        </>
    )
}
export default HomePage;