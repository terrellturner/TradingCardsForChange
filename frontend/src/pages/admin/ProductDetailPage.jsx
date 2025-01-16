import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import {
    useGetUserDetailsQuery,
    useUpdateUserMutation,
} from '../../slices/usersApiSlice';

const EditUserDetailsPage = () => {
    const { id: userId } = useParams();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const {
        data: user,
        isLoading,
        refetch,
        error,
    } = useGetUserDetailsQuery(userId);

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    const nav = useNavigate();

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ userId, firstName, lastName, email, isAdmin });
            toast.success('User updated!');
            refetch();
            nav('/admin/users');
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

    return (
        <div className='p-10 space-y-5'>

            <Link
                to="/admin/users"
            >
                <button className='rounded-lg border border-ipa-beige bg-hops-green p-3 text-ipa-beige'>Go Back</button>
            </Link>
            <div className="flex w-full md:w-1/2 flex-col space-y-5 place-self-center rounded border border-ipa-beige bg-hops-green p-10 text-off-white">
                <h1 className="text-3xl">Edit User</h1>
                {loadingUpdate && <Loader />}
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error.data.message}</Message>
                ) : (
                    <form onSubmit={submitHandler} className="space-y-3">
                        <fieldset id="name" className="flex flex-col space-y-1">
                            <label>First Name</label>
                            <input
                                type="name"
                                placeholder="Enter name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="p-2 text-black"
                            ></input>
                        </fieldset>
                        <fieldset id="name" className="flex flex-col space-y-1">
                            <label>Last Name</label>
                            <input
                                type="name"
                                placeholder="Enter name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="p-2 text-black"
                            ></input>
                        </fieldset>
                        <fieldset
                            id="email"
                            className="flex flex-col space-y-1"
                        >
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter price"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-2 text-black"
                            ></input>
                        </fieldset>
                        <fieldset id="isAdmin" className="my-2">
                            <a>Is Admin?</a>
                            <input
                                type="checkbox"
                                label="Is Admin?"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                                className="mx-2"
                            ></input>
                        </fieldset>
                        <button
                            type="submit"
                            className="rounded-lg border border-ipa-beige p-3"
                        >
                            Update
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditUserDetailsPage;
