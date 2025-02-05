import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
                credentials: 'include',
                mode: 'cors',
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
                credentials: 'include',
                mode: 'cors',
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
        getUsers: builder.query({
            query: ({
                pageNumber = 1,
                sortField = '_id',
                sortOrder = 'asc',
            }) => ({
                url: '/api/users',
                params: { pageNumber, sortField, sortOrder },
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
            credentials: 'include',
            mode: 'cors',
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
                credentials: 'include',
                mode: 'cors',
            }),
        }),
        getUserDetails: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Users'],
        }),
        resetPassword: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/reset-password`,
                method: 'PUT',
                body: { userId },
                credentials: 'include',
                mode: 'cors',
            }),
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/change-password`,
                method: 'PUT',
                body: data,
                credentials: 'include',
                mode: 'cors',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
} = usersApiSlice;
