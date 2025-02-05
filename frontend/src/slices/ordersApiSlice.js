import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: order,
                credentials: 'include',
                mode: 'cors',
            }),
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`,
                credentials: 'include',
                mode: 'cors',
            }),
            keepUnusedDataFor: 5,
        }),
        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: { ...details },
            }),
        }),
        getPayPalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getCurrentUserOrders: builder.query({
            query: () => ({ url: `${ORDERS_URL}/my_orders` }),
            keepUnusedDataFor: 5,
        }),
        getOrders: builder.query({
            query: ({
                pageNumber = 1,
                sortField = '_id',
                sortOrder = 'asc',
            }) => ({
                url: `${ORDERS_URL}`,
                params: { pageNumber, sortField, sortOrder },
            }),
            providesTags: ['Orders'],
            keepUnusedDataFor: 5,
            credentials: 'include',
            mode: 'cors',
        }),
        deliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: 'PUT',
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPayPalClientIdQuery,
    useGetCurrentUserOrdersQuery,
    useGetOrdersQuery,
    useDeliverOrderMutation,
} = ordersApiSlice;
