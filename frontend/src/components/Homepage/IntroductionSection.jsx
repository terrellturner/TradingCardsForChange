import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import WavyDecorationTop from '/images/wave-top.svg?&react';
import WavyDecorationBottom from '/images/wave-bottom.svg?&react';

const IntroductionSection = () => {
	return (
		<motion.div className="flex w-full flex-col overflow-hidden text-center font-sans-serif">
			<img src={WavyDecorationTop} alt="" className="-mt-28 md:mt-0" />
			<div className="space-y-10 bg-egyptian-earth px-10 py-10 pt-24 md:pt-0 lg:px-0">
				<a className="text-xl text-noir-de-vigne">Welcome to</a>
				<h2 className="flex flex-col px-2 font-serif text-6xl text-creased-khaki md:text-7xl lg:px-64 xl:px-96">
					<a>Trading Cards For Change!</a>
				</h2>
				<p className="px-2 text-2xl lg:px-64 xl:px-96">
					We bring good people, fun games, and delicious drinks together to
					create positive change for the world. Take a look at our events below,
					and create an account to place and track orders.
				</p>
				<Link
					to="/about"
					className="my-5 flex flex-row items-center justify-center space-x-2 text-xl font-bold text-creased-khaki"
				>
					<span>Our Story</span> <FaArrowRight className="-mb-1" />
				</Link>
			</div>
			<img src={WavyDecorationBottom} alt="" className="-mt-1" />
		</motion.div>
	);
};

export default IntroductionSection;
