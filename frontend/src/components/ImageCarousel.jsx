import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ImageCarousel = ({ imageUrls }) => {
    const [imageIndex, setImageIndex] = useState(0);

    const showNextImage = () => {
        setImageIndex((index) => {
            if (index === imageUrls.length - 1) return 0;
            return index + 1;
        });
    };
    const showPreviousImage = () => {
        setImageIndex((index) => {
            if (index === 0) return imageUrls.length - 1;
            return index - 1;
        });
    };

    return (
        <div className="relative flex flex-col w-full rounded-lg h-96 lg:w-2/3">
            <div className="relative flex w-full h-full overflow-hidden">
                {imageUrls.map((url) => (
                    <>
                        <img
                            key={url}
                            src={url}
                            alt=""
                            className="object-cover w-full h-full rounded-lg carousel-img shrink-0 grow-0"
                            style={{ translate: `${-100 * imageIndex}%` }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 flex h-1/5 w-full bg-newsletter-black bg-opacity-35 pl-5 pt-5 font-sans-serif text-3xl text-[#ffffff]">
                            <div>
                                EDH stands for &quot;Everyone&apos;s Drinking
                                Here!&quot;
                            </div>
                        </div>
                    </>
                ))}
                )
            </div>

            <button
                onClick={showPreviousImage}
                className="absolute top-0 bottom-0 left-0 block p-2 transition-colors ease-in-out delay-100 carousel-btn"
            >
                <FaArrowLeft />
            </button>
            <button
                onClick={showNextImage}
                className="absolute top-0 bottom-0 right-0 block p-2 transition-colors ease-in-out delay-100 carousel-btn"
            >
                <FaArrowRight />
            </button>
        </div>
    );
};

export default ImageCarousel;

ImageCarousel.propTypes = {
    imageUrls: PropTypes.array,
};
