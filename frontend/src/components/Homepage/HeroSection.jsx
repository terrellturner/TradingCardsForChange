import React from 'react';
import ImageCarousel from './ImageCarousel';
import Logo from '../UI/Logo';

const HeroSection = () => {
	const heroImages = import.meta.env.VITE_HERO_IMG_URLS.split(',');
	return (
		<div className="flex w-full flex-row place-items-center justify-center px-6 md:px-16 lg:space-x-6">
			<Logo />
			<ImageCarousel imageUrls={heroImages} />
		</div>
	);
};

export default HeroSection;
