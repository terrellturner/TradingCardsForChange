import React, { useState } from 'react';
import CafeLogo from '/images/logo/logo.svg?&react';

const AboutPage = () => {
	return (
		<div className="my-auto flex w-full flex-row px-10">
			<img src={CafeLogo} alt="" className="hidden w-2/3 lg:block" />
			<div className="flex w-full flex-col items-center justify-around space-y-16 px-10 py-10">
				<h1 className=" font-serif text-7xl text-off-white">About Us</h1>
				<span className="font-sans-serif text-off-white first-letter:float-left first-letter:pb-2 first-letter:pr-2 first-letter:font-serif first-letter:text-7xl">
					At Trading Cards For Change, we've mastered the art of bringing
					together three amazing things: good drinks, trading cards, and
					charitable giving. Our story began with a simple idea: what if we
					could transform our love of coffee and beer into a force for positive
					change in our community? That's exactly what we did. We organize
					regular meetups at local cafes and breweries across the Twin Cities,
					creating spaces where both seasoned players and newcomers can shuffle
					up, grab a pint, and make lasting connections. Our events range from
					casual game nights to competitive tournaments, all while supporting
					local businesses and raising funds for worthy causes. What sets us
					apart isn't just our unique combination of interests – it's our
					commitment to fostering an inclusive, friendly environment where
					everyone can feel comfortable joining in. Join us at our next event to
					experience the perfect blend of gaming, good atmosphere, and a sense
					of community at the heart our our charitable spirit. Whether you're
					here to perfect your deck strategy, discover your new favorite drink,
					or simply meet some fantastic people, there's a seat at our table for
					you.
				</span>
			</div>
		</div>
	);
};

export default AboutPage;
