import React, { useEffect } from 'react';
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
	const { data: products, isLoading } = useGetAllProductsQuery();

	const {
		events,
		isLoading: isEventListLoading,
		error: eventError,
	} = useSelector(selectEvents);

	useEffect(() => {
		if (eventError) {
			toast.error(eventError?.data?.message || eventError.error);
			return;
		}
	}, [eventError]);

	const sortedEvents = events.sort((a, b) => {
		return new Date(b.startTime) - new Date(a.startTime);
	});
	
	const sortedEventsLatest = events
		.filter((event) => {
			return new Date(event.startTime) >= new Date();
		})
		.sort((a, b) => {
			return new Date(a.startTime) - new Date(b.startTime);
		})
		.slice(0, 5);

	console.log(sortedEventsLatest);

	if (isLoading || isEventListLoading) {
		return <Loader />;
	}

	return (
		<motion.div
			variants={defaultMotion}
			initial="initial"
			animate="open"
			exit="closed"
			className="flex h-full grow flex-col items-center bg-noir-de-vigne "
		>
			<HeroSection sortedEvents={sortedEventsLatest} />
			<IntroductionSection />
			<div id="events" className="w-full">
				<CalendarSection
					isLoading={isLoading}
					products={products}
					eventList={sortedEvents}
				/>
				{/* Mobile list view <800px */}
				<MobileEventSection
					isLoading={isLoading}
					products={products}
					mobileEvents={sortedEventsLatest}
				/>
			</div>
		</motion.div>
	);
};

export default HomePage;
