import React from 'react'
import {
    useGetUsersQuery,
    useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";



const UserListPage = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [deleteUser, { isLoading: loadingDeleteUser }] =
        useDeleteUserMutation();

    const deleteHandler = async (id) => {
        if (window.confirm("Deleting user. Are you sure?")) {
            try {
                await deleteUser(id);
                toast.success("User deleted.");
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        }
    };

    return (
        <>

            {loadingDeleteUser && <Loader />}
            {isLoading ? (
                <h1>Loading...</h1>
            ) : error ? (
                <h2>{error?.data?.message || error.error}</h2>
            ) : (
                <div className='flex flex-col'>
                    <h1 className='text-5xl text-off-white p-12 font-bold'>Users</h1>
                    <div className=' text-ipa-beige flex-row self-center p-20 w-11/12 hidden md:flex'>
                        <table className="table-fixed w-full bg-hops-green rounded-2xl border-ipa-beige border border-spacing-0 border-separate overflow-hidden">
                            <thead className='h-10'>
                                <tr>
                                    <th>ID</th>
                                    <th>FIRST NAME</th>
                                    <th>LAST NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN?</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {users.map((user) => (
                                    <tr className='text-center odd:bg-newsletter-black text-off-white' key={user._id}>
                                        <td className='p-3 truncate'>{user._id}</td>
                                        <td className='p-3 truncate'>{user.firstName}</td>
                                        <td className='p-3 truncate'>{user.lastName}</td>
                                        <td className='p-3 truncate'>
                                            <a href={`mailto:${user.email}`}>{user.email}</a>
                                        </td>
                                        <td className='p-3 truncate'>
                                            {user.isAdmin ? (
                                                <FaCheck className='mx-auto fill-green-600' />
                                            ) : (
                                                <FaTimes className='mx-auto' style={{ color: "red" }} />
                                            )}
                                        </td>
                                        <td className='p-3 space-x-4 text-ipa-beige'>
                                            <Link to={`/admin/user/${user._id}/edit`}>
                                                <button className="btn-sm">
                                                    <FaEdit />
                                                </button>
                                            </Link>
                                            <button
                                                className="btn-sm"
                                                onClick={() => deleteHandler(user._id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserListPage;