import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TbCalendarRepeat } from 'react-icons/tb';
import { FaTimes } from 'react-icons/fa';
import { useGetBookingsPerEventQuery } from '../slices/bookingApiSlice';
import { FaUser, FaClock, FaArchive } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Loader from './UI/Loader';

const ProductCard = React.forwardRef(
	(
		{
			product,
			cardClasses,
			handleCloseModal,
			mobileLayout,
			onArchiveProduct,
			onSnoozeEvent,
		},
		ref
	) => {
		const startTime = new Date(product.startTime);

		const { userInfo } = useSelector((state) => state.auth);

		const { data: bookingInfo, isLoading: bookingIsLoading } =
			useGetBookingsPerEventQuery({
				productId: product._id,
				eventStartTime: new Date(product.startTime).toISOString(),
			});

		if (bookingIsLoading) {
			return <Loader />;
		}
		return (
			<div
				ref={ref}
				className={`relative flex flex-col justify-around space-y-3 rounded-lg border border-gray-700 bg-off-white p-5 shadow ${cardClasses}`}
			>
				<div className="absolute left-0 top-0 m-2 h-20 w-20 rounded-lg bg-emerald-green p-3 text-center text-creased-khaki shadow-lg">
					<span className="block text-sm font-bold">
						{startTime.toLocaleString('default', {
							month: 'short',
						})}
					</span>
					<span className="text-3xl font-black">{`${startTime.getDate()}`}</span>
				</div>
				{!mobileLayout && (
					<button
						onClick={handleCloseModal}
						className="absolute -right-8 -top-10 rounded-full bg-creased-khaki p-3 text-emerald-green transition-all hover:bg-creased-khaki hover:text-wasabi" // Use theme background on hover
						aria-label="Close calendar event modal"
					>
						<FaTimes className="text-4xl" />
					</button>
				)}
				<Link
					to={`/product/${product._id}?rsvpDate=${new Date(product.startTime).toISOString()}`}
				>
					<img
						src={product.image}
						alt={`${product.name} - ${product.description}`}
						className="mx-auto h-52 w-full rounded-lg object-cover object-center md:h-72"
					/>
				</Link>
				<Link
					to={`/product/${product._id}?rsvpDate=${new Date(product.startTime).toISOString()}`}
					className="flex flex-row place-items-center"
				>
					<h3
						className={`max-w-[90%] truncate text-xl font-bold md:text-2xl ${product.inStock === 0 ? 'line-through' : ''}`}
					>
						{product.name}
					</h3>
					{product.isRecurring && (
						<div className="ml-2 mt-0.5 flex items-center text-2xl font-normal ">
							<TbCalendarRepeat title="This event is recurring." />
						</div>
					)}
				</Link>
				<div className="line-clamp-3">{product.description}</div>
				<div className="flex w-full justify-between">
					<div className="mt-auto flex h-12 items-center justify-center rounded-full p-1 text-center font-bold text-emerald-green">
						<FaUser className="m-0.5 my-auto" />
						<span className="">
							{!bookingIsLoading && bookingInfo && (
								<>
									<span>
										{bookingInfo.totalReservations}/
										{product.maximumEventCapacity ?? 0}
									</span>
								</>
							)}
						</span>
						{userInfo && userInfo.isAdmin && (
							<>
								<button
									onClick={() =>
										onArchiveProduct && onArchiveProduct(product._id)
									}
									className="align-center ml-2 flex h-full w-8 items-center justify-center rounded-lg text-center text-lg text-red-800"
								>
									<FaArchive />
								</button>
								<button
									onClick={() => onSnoozeEvent && onSnoozeEvent(product._id)}
									className="align-center ml-1 flex h-full w-8 items-center justify-center rounded-lg text-center text-lg text-red-800"
								>
									<FaClock />
								</button>
							</>
						)}
					</div>
					<div className=" flex flex-row place-items-end space-x-1">
						{new Date(product.startTime) > new Date() &&
						bookingInfo.totalReservations < product.maximumEventCapacity ? (
							<Link
								to={`/product/${product._id}?rsvpDate=${new Date(product.startTime).toISOString()}`}
							>
								<button className=" flex basis-full rounded-lg bg-emerald-green p-2 text-center font-bold text-creased-khaki">
									<div className="p-1 text-xl">RSVP</div>
								</button>
							</Link>
						) : (
							<button className="flex basis-full cursor-default rounded-lg bg-zinc-600 p-2 text-center font-bold text-zinc-400">
								<div className="p-1 text-xl">Sold Out!</div>
							</button>
						)}
					</div>
				</div>
			</div>
		);
	}
);

ProductCard.displayName = 'productCard';

export default ProductCard;

ProductCard.propTypes = {
	product: PropTypes.object,
	cardClasses: PropTypes.string,
	handleCloseModal: PropTypes.func,
	mobileLayout: PropTypes.bool,
	onArchiveProduct: PropTypes.func,
	onSnoozeEvent: PropTypes.func,
};
