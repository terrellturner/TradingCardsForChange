import React from 'react';
import PropTypes from 'prop-types';

const Loader = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full items-center bg-newsletter-black bg-opacity-80">
            <img src={"https://pmv1txxicxtao8iw.public.blob.vercel-storage.com/TCBC_Color-ilKYEGVXlbq77GKiuWX2FeYGnoyIm5.svg"} className="aspect-square h-4/5 grow" alt="" />
        </div>
    );
};

export default Loader;
