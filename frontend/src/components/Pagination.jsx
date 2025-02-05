import React from 'react';
import PropTypes from 'prop-types';
import { Link, useSearchParams } from 'react-router-dom';

const Pagination = ({
    pages,
    page,
    isAdmin = false,
    keyword = '',
    paginationType,
    className,
}) => {
    const [searchParams] = useSearchParams();

    const queryString = Array.from(searchParams.entries())
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

    const getPageUrl = (pageNum) => {
        const baseUrl = !isAdmin
            ? keyword
                ? `/search/${keyword}/page/${pageNum}`
                : `/page/${pageNum}`
            : `/admin/${paginationType}/${pageNum}`;

        return `${baseUrl}${queryString ? '?' + queryString : ''}`;
    };

    const getVisiblePages = () => {
        let start = Math.max(1, page - 1);
        let end = Math.min(pages, start + 2);

        if (end === pages) {
            start = Math.max(1, end - 2);
        }

        if (start === 1) {
            end = Math.min(pages, start + 2);
        }

        return Array.from({ length: (end - start + 1) }, (_, i) => start + i);

    };

    return (
        pages > 1 && (
            <ul className={`flex h-full flex-row space-x-2 ${className}`}>

                {page > 1 && (
                    <Link to={getPageUrl(page - 1)}>
                        <li className="rounded bg-ipa-beige p-2 px-4">Prev</li>
                    </Link>
                )}

                {getVisiblePages().map((pageNum) => (
                    <Link key={pageNum} to={getPageUrl(pageNum)}>
                        <li
                            className={`rounded bg-ipa-beige p-2 px-4 ${pageNum === page
                                ? 'border border-ipa-beige bg-newsletter-black text-ipa-beige'
                                : ''
                                }`}
                        >
                            {pageNum}
                        </li>
                    </Link>
                ))}

                {page < pages && (
                    <Link to={getPageUrl(page + 1)}>
                        <li className="rounded bg-ipa-beige p-2 px-4">Next</li>
                    </Link>
                )}
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
    className: PropTypes.string,
};