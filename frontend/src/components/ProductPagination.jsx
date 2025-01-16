import React from "react";
import { Link } from 'react-router-dom';


const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
    return (
        pages > 1 && (
            <ul>
                {[...Array(pages).keys()].map((x) => (
                    <Link
                        key={x + 1}
                        to={
                            !isAdmin
                                ? keyword
                                    ? `/search/${keyword}/page/${x + 1}`
                                    : `/page/${x + 1}`
                                : `/admin/products/${x + 1}`
                        }
                    >
                        <li>{x + 1}</li>
                    </Link>
                ))}
            </ul>
        )
    );
};

export default Paginate;
