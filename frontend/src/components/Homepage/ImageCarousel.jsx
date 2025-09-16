import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ImageCarousel = ({ sortedEvents }) => {
	const [imageIndex, setImageIndex] = useState(0);

	const showNextImage = () => {
		setImageIndex((index) => {
			if (index === sortedEvents.length - 1) return 0;
			return index + 1;
		});
	};
	const showPreviousImage = () => {
		setImageIndex((index) => {
			if (index === 0) return sortedEvents.length - 1;
			return index - 1;
		});
	};

	return (
		<div className="relative hidden h-96 w-full flex-col rounded-lg md:flex lg:w-1/2">
			<div className="relative flex h-full w-full overflow-hidden">
				{sortedEvents.map((event, index) => (
					<div
						key={index}
						className="relative h-full w-full shrink-0"
						style={{ translate: `${-100 * imageIndex}%` }}
					>
						<img
							src={event.image}
							alt={event.title || ''}
							className="carousel-img h-full w-full shrink-0 grow-0 rounded-lg object-cover"
						/>
						<div className="absolute bottom-0 left-0 right-0 flex w-full  bg-noir-de-vigne bg-opacity-80 pb-2 pl-5 pt-5 font-sans-serif text-2xl text-creased-khaki md:h-1/5 md:pb-0">
							<div className="truncate">
								{new Date(event.startTime).toLocaleDateString('en-US')} - {` `}
								{event.title}
							</div>
						</div>
					</div>
				))}
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
