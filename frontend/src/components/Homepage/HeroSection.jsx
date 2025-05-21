import React from 'react';
import ImageCarousel from './ImageCarousel';
import Logo from '../UI/Logo';

const HeroSection = ({ sortedEvents }) => {
	return (
		<div className="flex w-full flex-row place-items-center justify-center px-6 lg:space-x-6">
			<Logo classNames={`hidden w-1/3 lg:flex`} />
			<ImageCarousel sortedEvents={sortedEvents} />
		</div>
	);
};

export default HeroSection;
