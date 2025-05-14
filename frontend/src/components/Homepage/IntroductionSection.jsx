import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import WavyDecorationTop from '/images/wave-top.svg?&react';
import WavyDecorationBottom from '/images/wave-bottom.svg?&react';

const IntroductionSection = () => {
	return (
		<motion.div className="my-10 flex w-full flex-col  pb-10 pt-5 text-center">
			<img src={WavyDecorationTop} alt="" />
			<div className="space-y-10 bg-egyptian-earth">
				<a className="text-xl text-noir-de-vigne">Welcome to</a>
				<h2 className="flex flex-col px-96 font-serif text-7xl text-creased-khaki">
					<a>Trading Cards For Change!</a>
				</h2>
				<p className="px-96 font-sans-serif text-2xl">
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
			<img src={WavyDecorationBottom} alt="" />
		</motion.div>
	);
};

export default IntroductionSection;
