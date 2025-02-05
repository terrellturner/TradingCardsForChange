import React, { useState, useEffect } from 'react';
import {
    useGetUsersQuery,
    useDeleteUserMutation,
    useResetPasswordMutation,
} from '../../slices/usersApiSlice';
import {
    FaTrash,
    FaEdit,
    FaCheck,
    FaTimes,
    FaSortUp,
    FaSortDown,
    FaLockOpen,
    FaCopy,
    FaFilter,
    FaArchive,
} from 'react-icons/fa';
import Loader from '../../components/Loader';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Pagination from '../../components/Pagination';
import SortDropdown from '../../components/SortDropdown';
import ConfirmationPrompt from '../../components/ConfirmationPrompt';

const UserListPage = () => {
    const tableHeaders = [
        { displayName: 'ID', queryName: '_id' },
        { displayName: 'First Name', queryName: 'firstName' },
        { displayName: 'Last Name', queryName: 'lastName' },
        { displayName: 'Email', queryName: 'email' },
        { displayName: 'Is Admin?', queryName: 'isAdmin' },
    ];
    const { pageNumber } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const sortField = searchParams.get('sortField') || '';
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    const [userData, setUserData] = useState([]);
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        message: '',
        onConfirm: null,
    });

    const { data, isLoading, error } = useGetUsersQuery({
        pageNumber,
        sortField,
        sortOrder,
    });
    const [deleteUser, { isLoading: loadingDeleteUser }] =
        useDeleteUserMutation();
    const [resetPassword, { isLoading: loadingPasswordReset }] =
        useResetPasswordMutation();

    const sortBy = (key) => {
        const newSort =
            key === sortField && sortOrder === 'asc' ? 'desc' : 'asc';

        setSearchParams({ sortField: key, sortOrder: newSort });
    };

    const getSortingIcon = (colKey) => {
        if (sortField !== colKey) {
            return null;
        }

        return sortOrder === 'asc' ? (
            <FaSortUp className="mt-2" />
        ) : (
            <FaSortDown />
        );
    };

    const openModal = (message, onConfirm) => {
        setModalConfig({
            isOpen: true,
            message,
            onConfirm,
        });
    };

    const closeModal = () => {
        setModalConfig({
            isOpen: false,
            message: '',
            onConfirm: null,
        });
    };

    const resetPasswordHandler = async (user) => {
        await resetPassword(user._id);
    };

    const deactivateUserHandler = async (id) => {
        console.log('Deactivated.');
    }

    useEffect(() => {
        if (data?.users) {
            setUserData(data?.users);
        }
    }, [data?.users]);

    return (
        <>
            {loadingDeleteUser && <Loader />}
            {isLoading || !userData ? (
                <h1>Loading...</h1>
            ) : error ? (
                <h2>{error?.data?.message || error.error}</h2>
            ) : window.innerWidth > 800 ? (
                //Desktop view
                <div className="flex flex-col">
                    <h1 className="p-12 text-5xl font-bold text-off-white">
                        Users
                    </h1>
                    <div className="hidden w-5/6 flex-row self-center p-20 text-ipa-beige md:flex">
                        <table className="w-full table-fixed border-separate border-spacing-0 overflow-hidden rounded-2xl border border-ipa-beige bg-hops-green">
                            <thead className="h-10">
                                <tr className="select-none">
                                    {tableHeaders.map((header, index) => (
                                        <th
                                            key={index}
                                            className="cursor-pointer p-3"
                                            onClick={() =>
                                                sortBy(header.queryName)
                                            }
                                        >
                                            <div className="flex flex-row justify-items-center justify-self-center">
                                                {header.displayName}{' '}
                                                {getSortingIcon(
                                                    header.queryName
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                    <th className="p-3"></th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {userData.map((user) => (
                                    <tr
                                        className="text-center text-off-white odd:bg-newsletter-black"
                                        key={user._id}
                                    >
                                        <td className="truncate p-3">
                                            {user._id}
                                        </td>
                                        <td className="truncate p-3">
                                            {user.firstName}
                                        </td>
                                        <td className="truncate p-3">
                                            {user.lastName}
                                        </td>
                                        <td className="truncate p-3">
                                            <a href={`mailto:${user.email}`}>
                                                {user.email}
                                            </a>
                                        </td>
                                        <td className="truncate p-3">
                                            {user.isAdmin ? (
                                                <FaCheck className="mx-auto fill-green-600" />
                                            ) : (
                                                <FaTimes
                                                    className="mx-auto"
                                                    style={{ color: 'red' }}
                                                />
                                            )}
                                        </td>
                                        <td className="space-x-4 p-3 text-ipa-beige">
                                            <Link
                                                to={`/admin/user/${user._id}/edit`}
                                            >
                                                <button className="btn-sm">
                                                    <FaEdit />
                                                </button>
                                            </Link>
                                            <button
                                                className="btn-sm"
                                                onClick={() =>
                                                    openModal((`Warning! This action will completely reset the user's password and prompt them for a new one on next login, leaving their account in a vulnerable state. Use with caution. Continue? `), () => {
                                                        resetPasswordHandler(
                                                            user
                                                        );
                                                    })
                                                }
                                            >
                                                <FaLockOpen />
                                            </button>
                                            <button
                                                className="btn-sm"
                                                onClick={() =>
                                                    openModal((`This action will deactivate the user's account, effectively archiving it and preventing future logins. Continue?`), (() => { deactivateUserHandler(user) }))
                                                }
                                            >
                                                <FaArchive />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        pages={data.pages}
                        page={data.page}
                        paginationType="users"
                        isAdmin={true}
                        className={'place-self-center'}
                    />
                </div>
            ) : (
                //Mobile view
                <div className="my-auto flex flex-col space-y-10 px-12 py-6">
                    <SortDropdown
                        headers={tableHeaders}
                        sortedField={sortField}
                        sortedDirection={sortOrder}
                        onSort={sortBy}
                    />
                    <div className="flex flex-col place-items-center space-y-10 ">
                        {userData.map((user) => (
                            <div
                                key={user._id}
                                className=" flex w-full flex-col rounded-2xl border-2 border-ipa-beige bg-hops-green p-6"
                            >
                                <div className="truncate text-3xl font-bold text-off-white">
                                    {user.firstName} {user.lastName}
                                </div>
                                <div className="mb-3 flex flex-row items-center py-1 text-sm text-off-white">
                                    <FaCopy />
                                    <span className="w-24 truncate pl-1">
                                        {user._id}
                                    </span>
                                </div>
                                <div className="flex flex-row justify-between text-off-white">
                                    <span className="truncate font-bold">
                                        Email:
                                    </span>
                                    <div className="flex flex-row items-center space-x-1">
                                        <FaCopy />
                                        <span className="w-36 truncate">
                                            {user.email}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-between text-off-white">
                                    <span className="font-bold">Is Admin:</span>
                                    <span>
                                        {user.isAdmin ? (
                                            <FaCheck className="mx-auto fill-green-600" />
                                        ) : (
                                            <FaTimes
                                                className="mx-auto"
                                                style={{ color: 'red' }}
                                            />
                                        )}
                                    </span>
                                </div>
                                <div className="mt-5 flex flex-row justify-between space-x-4">
                                    <button className="flex h-full w-full justify-center rounded-2xl bg-ipa-beige p-3 text-lg font-bold text-newsletter-black">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() =>
                                        openModal((`Warning! This action will completely reset the user's password and prompt them for a new one on next login, leaving their account in a vulnerable state. Use with caution. Continue? `), () => {
                                            resetPasswordHandler(
                                                user
                                            );
                                        })
                                    } className="flex h-full w-full justify-center rounded-2xl bg-ipa-beige p-3 text-lg font-bold text-newsletter-black">
                                        <FaLockOpen />
                                    </button>
                                    <button onClick={() =>
                                        openModal((`This action will deactivate the user's account, effectively archiving it and preventing future logins. Continue?`), (() => { deactivateUserHandler(user) }))
                                    } className="flex h-full w-full justify-center rounded-2xl bg-ipa-beige p-3 text-lg font-bold text-newsletter-black">
                                        <FaArchive />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination
                        pages={data.pages}
                        page={data.page}
                        paginationType="users"
                        isAdmin={true}
                        className={'place-self-center'}
                    />
                </div>
            )}
            {modalConfig.isOpen && (
                <ConfirmationPrompt
                    setVisibility={modalConfig.isOpen}
                    onCancelClick={closeModal}
                    onConfirmClick={() => {
                        modalConfig.onConfirm();
                        closeModal();
                    }}
                    message={modalConfig.message}
                />
            )}
        </>
    );
};

export default UserListPage;
