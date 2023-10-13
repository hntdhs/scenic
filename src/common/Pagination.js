import React from 'react';

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    const nextPage = () => {
            if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    };
    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    };
    return (
        <nav>
            <ul className="pagination pagination-lg">
                <li className="page-item">
                    <a className="page-link" onClick={prevPage} href='#'>Previous</a>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} className="page-item">
                    <a className="page-link" onClick={() => setCurrentPage(pgNumber)} href='#'>{pgNumber}</a>
                    </li>
                ))}
                <li className="page-item">
                    <a onClick={nextPage} href='#'>Next</a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination