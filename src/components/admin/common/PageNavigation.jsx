import { MdFileDownload, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from "react";

function PageNavigation(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentItems = props.resData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(props.resData.length / pageSize);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    useEffect(() => {
        if (props.onPageChange) {
            props.onPageChange(currentItems);
        }
    }, [currentPage, props.resData]);

    return (
        <>
            <div>
                <div className="container-button-change-page">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        style={{
                            border: '1px solid rgb(205, 25, 24)',
                            textAlign: 'center',
                            borderRadius: '3px',
                            backgroundColor: currentPage === 1 ? 'rgb(225, 98, 98)' : 'rgb(205, 25, 24)',
                            color: 'white',
                            fontSize: '17px',
                            cursor: 'pointer'
                        }}
                    >
                        <MdKeyboardArrowLeft />
                    </button>

                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            style={{
                                backgroundColor: currentPage === number ? 'rgb(205, 25, 24)' : 'white',
                                fontWeight: currentPage === number ? 'bold' : 'normal',
                                color: currentPage == number ? 'white' : 'black',
                                cursor: "pointer",
                                border: '1px solid black'
                            }}
                        >
                            {number}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        style={{
                            border: '1px solid rgb(205, 25, 24)',
                            textAlign: 'center',
                            borderRadius: '3px',
                            backgroundColor: currentPage === totalPages ? 'rgb(225, 98, 98)' : 'rgb(205, 25, 24)',
                            color: 'white',
                            fontSize: '17px',
                            cursor: 'pointer'
                        }}
                    >
                        <MdKeyboardArrowRight />
                    </button>
                </div>
            </div>
        </>
    )

}
export default PageNavigation