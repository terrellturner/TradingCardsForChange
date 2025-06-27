import { createSelector } from '@reduxjs/toolkit';
import { productsApiSlice } from '../slices/productsApiSlice';
import createEventRecurrences from '../utils/eventUtils';

const selectEventsResult = productsApiSlice.endpoints.getAllProducts.select();

const selectRawEvents = createSelector(
	selectEventsResult,
	(eventsResult) => eventsResult?.data ?? []
);

export const selectEvents = createSelector(
	[selectRawEvents, selectEventsResult],
	(rawEventsData, queryResult) => {
		const processedEventList = [];
		for (const event of rawEventsData) {
			if (event.isRecurring) {
				processedEventList.push(...createEventRecurrences(event));
			} else {
				processedEventList.push(event);
			}
		}

		return {
			events: processedEventList, //
			isLoading: queryResult?.isLoading ?? false,
			isFetching: queryResult?.isFetching ?? false,
			isSuccess: queryResult?.isSuccess ?? false,
			error: queryResult?.error,
		};
	}
);

export const selectSortedEventsForCalendar = createSelector(
	[selectEvents],
	(processedEventData) => {
		const { events } = processedEventData;
		const newEvents = events;

		if (events.length === 0) {
			return [];
		}

		return newEvents.sort(
			(a, b) => new Date(b.startTime) - new Date(a.startTime)
		);
	}
);

export const selectSortedEventsForMobile = createSelector(
	[selectEvents],
	(processedEventData) => {
		const { events } = processedEventData;
		const newEvents = events;
		if (!Array.isArray(events) || events.length === 0) return [];
		const now = new Date();
		return newEvents
			.filter((event) => new Date(event.startTime) >= now)
			.sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
			.slice(0, 5);
	}
);
