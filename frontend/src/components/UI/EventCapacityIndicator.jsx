import React from 'react';
import { useGetBookingsPerEventQuery } from '../../slices/bookingApiSlice';

const EventCapacityIndicator = ({
	productId,
	eventStartTime,
	onEventCapacityError,
}) => {
	const {
		data: bookingInfo,
		isLoading: bookingIsLoading,
		isSuccess: bookingQuerySucccessful,
		error: getBookingError,
	} = useGetBookingsPerEventQuery({
		productId,
		eventStartTime,
	});

	if (getBookingError) {
		throw new Error(`Error fetching bookings for event ${productId}.`);
    }
    
    return (
        <div><span></span></div>
    )
};

export default EventCapacityIndicator;
