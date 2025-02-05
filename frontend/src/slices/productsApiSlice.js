import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({
                pageNumber = 1,
                sortField = '_id',
                sortOrder = 'asc',
            }) => ({
                url: `${PRODUCTS_URL}`,
                params: { pageNumber, sortField, sortOrder },
            }),
            providesTags: ['Products'],
            keepUnusedDataFor: 5,
            credentials: 'include',
            mode: 'cors',
        }),
        getAllProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/all`,
            }),
            keepUnusedDataFor: 5,
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useGetAllProductsQuery,
} = productsApiSlice;
