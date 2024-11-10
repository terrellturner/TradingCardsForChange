import React from 'react';
import PropTypes from 'prop-types';

const ContentContainer = (props) => {
    return (
        <div
            onClick={props.handleClick}
            className={`text-white space-y-8 rounded-lg border border-ipa-beige p-5 text-off-white md:space-x-8 ${props.className}`}
        >
            {props.children}
        </div>
    );
};

export default ContentContainer;

ContentContainer.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    handleClick: PropTypes.any,
};
