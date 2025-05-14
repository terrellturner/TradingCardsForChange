import { apiSlice } from './apiSlice';
import { BOOKINGS_URL } from '../constants';

export const bookingApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createBooking: builder.mutation({
			query: (bookingData) => ({
				url: BOOKINGS_URL,
				method: 'POST',
				body: bookingData,
			}),
			invalidatesTags: ['Products', 'Bookings'],
		}),
		getBookingsPerEvent: builder.query({
			query: ({ productId, eventStartTime }) => ({
				url: `${BOOKINGS_URL}`,
				params: { eventStartTime, productId },
				keepUnusedDataFor: 5,
				credentials: 'include',
				mode: 'cors',
			}),
			providesTags: ['Bookings'],
		}),
		updateBooking: builder.mutation({
			query: ({ bookingId, status }) => ({
				url: `${BOOKINGS_URL}/${bookingId}`,
				method: 'PUT',
				body: { status },
			}),
			invalidatesTags: ['Products'],
		}),
	}),
});

export const {
	useCreateBookingMutation,
	useGetBookingsPerEventQuery,
	useUpdateBookingMutation,
} = bookingApiSlice;
