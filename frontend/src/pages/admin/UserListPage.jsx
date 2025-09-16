import React, { useState, useEffect } from 'react';
import {
	useGetUsersQuery,
	useResetPasswordMutation,
	useUpdateUserMutation,
} from '../../slices/usersApiSlice';
import {
	FaEdit,
	FaCheck,
	FaTimes,
	FaSortUp,
	FaSortDown,
	FaLockOpen,
	FaCopy,
	FaArchive,
} from 'react-icons/fa';
import Loader from '../../components/UI/Loader';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Pagination from '../../components/UI/Pagination';
import SortDropdown from '../../components/SortDropdown';
import ConfirmationPrompt from '../../components/UI/ConfirmationPrompt';
import { AnimatePresence, motion } from 'motion/react';

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

	const [resetPassword, { isLoading: loadingPasswordReset }] =
		useResetPasswordMutation();

	const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

	const sortBy = (key) => {
		const newSort = key === sortField && sortOrder === 'asc' ? 'desc' : 'asc';

		setSearchParams({ sortField: key, sortOrder: newSort });
	};

	const getSortingIcon = (colKey) => {
		if (sortField !== colKey) {
			return null;
		}

		return sortOrder === 'asc' ? <FaSortUp className="mt-2" /> : <FaSortDown />;
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
		try {
			await resetPassword(user._id);
		} catch (error) {
			console.error(error);
			toast.error(error?.data?.message || error.error);
		}
	};

	const userActivationHandler = async (isDeactivated, user) => {
		try {
			await updateUser({
				userId: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				isAdmin: user.isAdmin,
				email: user.email,
				isDeactivated,
			});
			console.warn(
				`User ${user._id} ${isDeactivated ? 'deactivated' : 'activated'}.`
			);
		} catch (error) {
			console.error(error);
			toast.error(error?.data?.message || error.error);
		}
	};

	useEffect(() => {
		if (data?.users) {
			setUserData(data?.users);
		}
	}, [data?.users]);

	if (isLoading || loadingPasswordReset || loadingUpdate) {
		return <Loader />;
	} else if (error) {
		toast.error(error?.data?.message || error.error);
		return;
	}

	return (
		<AnimatePresence>
			<motion.div className="hidden flex-col md:flex" key={'userListDesktop'}>
				<h1 className="p-12 pb-0 text-5xl font-bold text-off-white">Users</h1>
				<div className="hidden w-5/6 flex-row self-center p-20 text-creased-khaki md:flex">
					<table className="w-full table-fixed border-separate border-spacing-0 overflow-hidden rounded-2xl border border-creased-khaki bg-emerald-green">
						<thead className="h-10">
							<tr className="select-none">
								{tableHeaders.map((header, index) => (
									<th
										key={index}
										className="cursor-pointer p-3"
										onClick={() => sortBy(header.queryName)}
									>
										<div className="flex flex-row justify-items-center justify-self-center">
											{header.displayName} {getSortingIcon(header.queryName)}
										</div>
									</th>
								))}
								<th className="p-3"></th>
							</tr>
						</thead>
						<tbody className="">
							{userData?.map((user, index) => (
								<tr
									className="text-center text-off-white odd:bg-noir-de-vigne"
									key={index}
								>
									<td className="truncate p-3">{user._id}</td>
									<td className="truncate p-3">{user.firstName}</td>
									<td className="truncate p-3">{user.lastName}</td>
									<td className="truncate p-3">
										<a href={`mailto:${user.email}`}>{user.email}</a>
									</td>
									<td className="truncate p-3">
										{user.isAdmin ? (
											<FaCheck className="mx-auto fill-green-600" />
										) : (
											<FaTimes className="mx-auto" style={{ color: 'red' }} />
										)}
									</td>
									<td className="space-x-4 p-3 text-creased-khaki">
										<Link to={`/admin/user/${user._id}/edit`}>
											<button className="btn-sm">
												<FaEdit />
											</button>
										</Link>
										<button
											className="btn-sm"
											onClick={() =>
												openModal(
													`Warning! This action will completely reset the user's password and prompt them for a new one on next login, leaving their account in a vulnerable state. Use with caution. Continue? `,
													() => {
														resetPasswordHandler(user);
													}
												)
											}
										>
											<FaLockOpen />
										</button>
										<button
											className={`btn-sm ${user.isDeactivated ? 'text-egyptian-earth' : 'text-creased-khaki'}`}
											onClick={() => {
												if (user.isDeactivated) {
													openModal(
														`This user is currently deactivated. Reactivating their account will allow them to login. Proceed?`,
														() => {
															userActivationHandler(false, user);
														}
													);
													return;
												}
												openModal(
													`This action will deactivate the user's account, effectively archiving it and preventing future logins. Continue?`,
													() => {
														userActivationHandler(true, user);
													}
												);
											}}
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
			</motion.div>
			<motion.div
				className="my-auto flex flex-col space-y-10 px-12 py-6 md:hidden"
				key={'userListMobile'}
			>
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
							className=" flex w-full flex-col rounded-2xl border-2 border-creased-khaki bg-emerald-green p-6"
						>
							<div className="truncate text-3xl font-bold text-off-white">
								{user.firstName} {user.lastName}
							</div>
							<div className="mb-3 flex flex-row items-center py-1 text-sm text-off-white">
								<FaCopy />
								<span className="w-24 truncate pl-1">{user._id}</span>
							</div>
							<div className="flex flex-row justify-between text-off-white">
								<span className="truncate font-bold">Email:</span>
								<div className="flex flex-row items-center space-x-1">
									<FaCopy />
									<span className="w-36 truncate">{user.email}</span>
								</div>
							</div>
							<div className="flex flex-row items-center justify-between text-off-white">
								<span className="font-bold">Is Admin:</span>
								<span>
									{user.isAdmin ? (
										<FaCheck className="mx-auto fill-green-600" />
									) : (
										<FaTimes className="mx-auto" style={{ color: 'red' }} />
									)}
								</span>
							</div>
							<div className="mt-5 flex flex-row justify-between space-x-4">
								<button className="flex h-full w-full justify-center rounded-2xl bg-creased-khaki p-3 text-lg font-bold text-noir-de-vigne">
									<FaEdit />
								</button>
								<button
									onClick={() =>
										openModal(
											`Warning! This action will completely reset the user's password and prompt them for a new one on next login, leaving their account in a vulnerable state. Use with caution. Continue? `,
											() => {
												resetPasswordHandler(user);
											}
										)
									}
									className="flex h-full w-full justify-center rounded-2xl bg-creased-khaki p-3 text-lg font-bold text-noir-de-vigne"
								>
									<FaLockOpen />
								</button>
								<button
									onClick={() =>
										openModal(
											`This action will deactivate the user's account, effectively archiving it and preventing future logins. Continue?`,
											() => {
												userActivationHandler(false, user);
											}
										)
									}
									className="flex h-full w-full justify-center rounded-2xl bg-creased-khaki p-3 text-lg font-bold text-noir-de-vigne"
								>
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
			</motion.div>
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
		</AnimatePresence>
	);
};

export default UserListPage;
