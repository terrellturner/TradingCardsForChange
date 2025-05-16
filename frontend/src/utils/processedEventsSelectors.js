import { createSelector } from '@reduxjs/toolkit';
import { productsApiSlice } from '../slices/productsApiSlice';
import createEventRecurrences from './eventUtils';

const selectEventsResult = productsApiSlice.endpoints.getAllProducts.select();

const selectRawEvents = createSelector(
	selectEventsResult,
	(eventsResult) => eventsResult?.data ?? []
);

// Return an array of events from the getAllProducts endpoint, and process the rrule value if present to return an array of events for each recurrence.
export const selectEvents = createSelector([selectRawEvents], (rawEvents) => {
	const newEvents = [];
	for (const event of rawEvents) {
		if (event.isRecurring) {
			newEvents.push(...createEventRecurrences(event));
		} else {
			newEvents.push(event);
		}
	}
	console.log(newEvents);

	return {
		events: newEvents,
		isLoading: rawEvents?.isLoading ?? false,
		isFetching: rawEvents?.isFetching ?? false,
		isSuccess: rawEvents?.isSuccess ?? false,
		error: rawEvents?.error,
	};
});
