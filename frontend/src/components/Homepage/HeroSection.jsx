import React from 'react';
import ImageCarousel from './ImageCarousel';
import Logo from '../UI/Logo';

const HeroSection = ({ sortedEvents }) => {
	console.log(sortedEvents);

	return (
		<div className="flex w-full flex-row place-items-center justify-center px-6 lg:space-x-6">
			<Logo classNames={`hidden w-1/3 lg:flex`} />
			{sortedEvents.length > 0 ? (
				<ImageCarousel sortedEvents={sortedEvents} />
			) : (
				<div className="h-96 w-1/2 animate-pulse rounded-lg bg-zinc-500"></div>
			)}
		</div>
	);
};

export default HeroSection;
