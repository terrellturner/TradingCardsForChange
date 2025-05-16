import { PRODUCTS_URL, UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: ({ pageNumber = 1, sortField = '_id', sortOrder = 'asc' }) => ({
				url: `${PRODUCTS_URL}`,
				params: { pageNumber, sortField, sortOrder },
			}),
			providesTags: ['Products'],
			keepUnusedDataFor: 5,
			credentials: 'include',
			mode: 'cors',
			invalidatesTags: ['ProductEdit'],
		}),
		getAllProducts: builder.query({
			query: () => ({
				url: `${PRODUCTS_URL}/all`,
			}),
			providesTags: ['Products'],
			credentials: 'include',
			mode: 'cors',
			invalidatesTags: ['ProductEdit'],
		}),
		getProductDetails: builder.query({
			query: (productId) => ({
				url: `${PRODUCTS_URL}/${productId}`,
			}),
			keepUnusedDataFor: 5,
		}),
		createProduct: builder.mutation({
			query: (data) => ({
				url: PRODUCTS_URL,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Products'],
		}),
		updateProduct: builder.mutation({
			query: (data) => ({
				url: `${PRODUCTS_URL}/${data.productId}`,
				method: 'PUT',
				body: data,
				credentials: 'include',
				mode: 'cors',
			}),
			providesTags: ['ProductEdit'],
			invalidatesTags: ['Products'],
		}),
		uploadProductImage: builder.mutation({
			query: (data) => ({
				url: `${UPLOAD_URL}`,
				method: 'POST',
				body: data,
			}),
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
	useUpdateProductMutation,
	useUploadProductImageMutation,
} = productsApiSlice;
