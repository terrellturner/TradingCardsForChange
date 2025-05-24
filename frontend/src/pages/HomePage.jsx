import React, { useEffect } from 'react';
import { useGetAllProductsQuery } from '../slices/productsApiSlice';
import { motion } from 'motion/react';
import Loader from '../components/UI/Loader';
import { defaultMotion } from '../constants';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import HeroSection from '../components/Homepage/HeroSection';
import IntroductionSection from '../components/Homepage/IntroductionSection';
import CalendarSection from '../components/Homepage/CalendarSection';
import MobileEventSection from '../components/Homepage/MobileEventSection';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
	selectEvents,
	selectSortedEventsForCalendar,
	selectSortedEventsForMobile,
} from '../selectors/processedEventsSelectors';

const HomePage = () => {
	const { data: products, isLoading } = useGetAllProductsQuery();

	const { isLoading: isEventListLoading, error: eventError } =
		useSelector(selectEvents);

	console.log(
		'HomePage Render:',
		'isLoading (products):',
		isLoading,
		'isEventListLoading (events):',
		isEventListLoading
	);

	useEffect(() => {
		if (eventError) {
			toast.error(eventError?.data?.message || eventError.error);
			return;
		}
	}, [eventError]);

	const sortedEventsCalendar = useSelector(selectSortedEventsForCalendar);
	const sortedEventsTop = useSelector(selectSortedEventsForMobile);

	if (isLoading && isEventListLoading) {
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
			<HeroSection sortedEvents={sortedEventsTop} />
			<IntroductionSection />
			<div id="events" className="w-full">
				<CalendarSection
					isLoading={isLoading}
					products={products}
					eventList={sortedEventsCalendar}
				/>
				{/* Mobile list view <800px */}
				<MobileEventSection
					isLoading={isLoading}
					products={products}
					mobileEvents={sortedEventsTop}
				/>
			</div>
		</motion.div>
	);
};

export default HomePage;
