import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Pagination = ({ pages, page, isAdmin = false, keyword = "", paginationType, className }) => {
    return (
        pages > 1 && (
            <ul className={`h-full flex flex-row space-x-2 ${className}`}>
                <li className="p-2 px-4 rounded bg-ipa-beige">Prev</li>
                {[...Array(pages).keys()].map((x) => (
                    <Link
                        key={x + 1}
                        to={
                            !isAdmin
                                ? keyword
                                    ? `/search/${keyword}/page/${x + 1}`
                                    : `/page/${x + 1}`
                                : `/admin/${paginationType}/${x + 1}`
                        }
                    >
                        <li className={`p-2 px-4 rounded bg-ipa-beige ${x + 1 === page ? 'bg-newsletter-black border border-ipa-beige text-ipa-beige' : ''}`}>{x + 1}</li>
                    </Link>
                ))}
                <li className="p-2 px-4 rounded bg-ipa-beige">Next</li>
            </ul>
        )
    );
};

export default Pagination;

Pagination.propTypes = {
    pages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    paginationType: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool,
    keyword: PropTypes.string,
    className: PropTypes.string
};