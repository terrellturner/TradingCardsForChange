import React from 'react';
import PropTypes from 'prop-types';
import TCBC from '/images/logo/TCBC_Color.svg';

const Loader = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full items-center bg-newsletter-black bg-opacity-80">
            <img src={TCBC} className="aspect-square h-4/5 grow" alt="" />
        </div>
    );
};

export default Loader;
