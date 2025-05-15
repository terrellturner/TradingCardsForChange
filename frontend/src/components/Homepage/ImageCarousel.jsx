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
		<div className="relative hidden h-96 w-full flex-col rounded-lg md:flex lg:w-2/3">
			<div className="relative flex h-full w-full overflow-hidden">
				{imageUrls.map((url, index) => (
					<React.Fragment key={index}>
						<img
							src={url}
							alt=""
							className="carousel-img h-full w-full shrink-0 grow-0 rounded-lg object-cover"
							style={{ translate: `${-100 * imageIndex}%` }}
						/>
						<div className="absolute bottom-0 left-0 right-0 flex w-full overflow-hidden truncate bg-noir-de-vigne bg-opacity-35 pb-2 pl-5 pt-5 font-sans-serif text-2xl text-[#ffffff] md:h-1/5 md:pb-0">
							<div>Order a brew and crack open some packs this weekend!</div>
						</div>
					</React.Fragment>
				))}
				)
			</div>

			<button
				onClick={showPreviousImage}
				className="carousel-btn absolute bottom-0 left-0 top-0 block p-2 transition-colors delay-100 ease-in-out"
			>
				<FaArrowLeft />
			</button>
			<button
				onClick={showNextImage}
				className="carousel-btn absolute bottom-0 right-0 top-0 block p-2 transition-colors delay-100 ease-in-out"
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
