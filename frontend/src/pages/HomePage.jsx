import React from 'react';
import { useGetAllProductsQuery } from '../slices/productsApiSlice';
import { motion } from 'framer-motion';
import Loader from '../components/UI/Loader';
import { defaultMotion } from '../constants';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import HeroSection from '../components/Homepage/HeroSection';
import IntroductionSection from '../components/Homepage/IntroductionSection';
import CalendarSection from '../components/Homepage/CalendarSection';
import MobileEventSection from '../components/Homepage/MobileEventSection';
import { selectEvents } from '../utils/processedEventsSelectors';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const HomePage = () => {
	const { data: products, isLoading, error } = useGetAllProductsQuery();

	const {
		events,
		isLoading: isEventListLoading,
		isSuccess,
		isError,
		error: eventError,
	} = useSelector(selectEvents);

	const sortedEvents = events.sort((a, b) => {
		return new Date(a.start) - new Date(b.start);
	});

	if (isLoading || isEventListLoading) {
		return <Loader />;
	}

	if (error) {
		toast.error(error?.data?.message || error.error);
		return;
	}

	return (
		<motion.div
			variants={defaultMotion}
			initial="initial"
			animate="open"
			exit="closed"
			className="flex h-full grow flex-col items-center bg-noir-de-vigne md:space-y-10"
		>
			<HeroSection />
			<IntroductionSection />
			<CalendarSection
				isLoading={isLoading}
				products={products}
				eventList={sortedEvents}
			/>
			{/* Mobile list view <800px */}
			<MobileEventSection
				isLoading={isLoading}
				products={products}
				mobileEvents={sortedEvents}
			/>
		</motion.div>
	);
};

export default HomePage;
