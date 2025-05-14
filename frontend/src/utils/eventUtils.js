import React from 'react';
import { RRule } from 'rrule';

// Takes in a single event object and generates an array of recurring events based on the provided RRULE string.
const createEventRecurrences = (event) => {
	let recurringEvents = [];

	const startDate = new Date(event.startTime);
	const endDate = new Date(event.endTime);
	endDate.setFullYear(endDate.getFullYear() + 1);

	try {
		const rule = RRule.fromString(event.rrule);
		const dates = rule.between(startDate, endDate);

		const eventDurationMs =
			new Date(event.endTime).valueOf() - new Date(event.startTime).valueOf();

		for (const date of dates) {
			console.log(date);

			recurringEvents.push({
				_id: event._id,
				title: event.title,
				startTime: new Date(date).valueOf(),
				endTime: new Date(date).valueOf() + eventDurationMs,
				allDay: false,
				eventLocation: event.eventLocation || 'Default',
				countInStock: event.countInStock,
				maximumEventCapacity: event.maximumEventCapacity,
				image: event.image,
				description: event.description,
				isRecurring: event.recurringPattern,
			});
		}
		return recurringEvents;
	} catch (error) {
		console.error('Error parsing RRULE string for product:', event.name, error);
	}
};

export default createEventRecurrences;
