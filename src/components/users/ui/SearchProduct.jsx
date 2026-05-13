import "../../../styles/index.css"
import { useState, useEffect } from "react";
import { getProductByName } from "../../../services/ApiProduct";
import { Link } from 'react-router-dom';
function SearchProduct(props) {
    const API_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
    const receiveData = props.dataSearch

    const [results, setResults] = useState([]);

    const fetchProducts = async (value) => {
        try {
            getProductByName(value).then((response) => {
                setResults(response.data);
            })

        } catch (error) {
            console.error("Lỗi khi tìm sản phẩm:", error);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (receiveData.trim() !== "") {
                fetchProducts(receiveData);
            } else {
                setResults([]);
            }
        }, 400); // 0.4s debounce tránh gọi API liên tục

        return () => clearTimeout(delayDebounce);
    }, [receiveData]);



    return (
        <>
            {results.length > 0 ? (
                <ul className="search-results">
                    {results.map((item) => (
                        < Link to={`${item.resCategory.id === 1
                            ? "/phoneDetail"
                            : item.categoryId === 2
                                ? "/laptop"
                                : item.categoryId === 3
                                    ? "/watch"
                                    : "/product"


                            }/${item.id}`}
                        // onClick={closeBox}
                        >
                            <li key={item.id}>
                                <div style={{ width: '40px', height: '40px', marginRight: '10px', overflow: 'hidden' }}>
                                    <img src={`${API_BASE_URL}${item.urlImageProduct}`} alt={item.name} style={{
                                        objectFit: "cover", width: "100%", height: "100%"
                                    }} />
                                </div>
                                <div style={{ fontWeight: "normal", fontSize: "15px" }}>
                                    {item.productName}
                                </div>

                            </li>
                        </Link>

                    ))}
                </ul>
            ) : (<div className='show-search-text'>Không có kết quả tìm kiếm</div>)}

        </>
    )
}
export default SearchProduct