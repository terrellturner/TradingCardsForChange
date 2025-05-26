import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/UI/Loader';
import { toast } from 'react-toastify';
import {
	useGetProductDetailsQuery,
	useUpdateProductMutation,
	useUploadProductImageMutation,
} from '../../slices/productsApiSlice';
import { RRule } from 'rrule';
import { AnimatePresence, motion } from 'motion/react';
import {
	simpleFade,
	fadeCollapse,
	twoColumnTransition,
} from '../../utils/animationVariants';

const ProductDetailPage = () => {
	const { id: productId } = useParams();

	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [cardSet, setCardSet] = useState('');
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState('');

	const [type, setType] = useState('event');
	const [eventLocation, setEventLocation] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [isRecurring, setIsRecurring] = useState(false);
	const [frequency, setFrequency] = useState('');
	const [weekOfMonth, setWeekOfMonth] = useState([]);
	const [calendarDayWeek, setCalendarDayWeek] = useState(0);

	const recurringPatternConfig = ['daily', 'weekly', 'monthly', 'custom'];

	const recurringDayConfig = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	const recurringWeekConfig = ['1st', '2nd', '3rd', '4th', 'Last'];

	const {
		data: product,
		isLoading,
		refetch,
		error,
	} = useGetProductDetailsQuery(productId);

	const [updateProduct, { isLoading: loadingUpdate }] =
		useUpdateProductMutation();

	const [uploadProductImage, { isLoading: loadingUpload }] =
		useUploadProductImageMutation();

	const navigate = useNavigate();

	const submitHandler = async (e) => {
		e.preventDefault();

		let recurringPatternData;
		if (isRecurring) {
			recurringPatternData = {
				recurringInterval: frequency ? frequency.toLowerCase() : 'daily',
				endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
				customOccurrenceConfig: {},
			};

			if (
				frequency?.toLowerCase() === 'custom' &&
				calendarDayWeek !== undefined
			) {
				recurringPatternData.customOccurrenceConfig = {
					dayOfWeek: calendarDayWeek === 0 ? 6 : calendarDayWeek - 1,
					weekOfMonth: weekOfMonth.map((week) => {
						const weekMap = { '1st': 1, '2nd': 2, '3rd': 3, '4th': 4, Last: 5 };
						return weekMap[week];
					}),
				};
			}
		}

		const updatedProduct = {
			productId,
			name,
			price,
			image,
			brand,
			category,
			cardSet,
			// Setting the "count" to the max capacity value. Update to determine if it's an event vs. a product in the future.
			maximumEventCapacity: countInStock,
			description,
			type,
			eventLocation,
			startTime: startTime ? new Date(startTime).toISOString() : undefined,
			endTime: endTime ? new Date(endTime).toISOString() : undefined,
			isRecurring,
			recurringPattern: recurringPatternData,
		};

		if (isRecurring) {
			updatedProduct.recurringPattern = recurringPatternData;
		}

		try {
			await updateProduct(updatedProduct).unwrap();
			toast.success('Product updated!');
			navigate('/admin/products');
		} catch (error) {
			toast.error(error?.data?.message || error.error);
			console.error('Update error:', error);
		}
	};

	const imageUploadHandler = async (e) => {
		const formData = new FormData();
		formData.append('image', e.target.files[0]);
		try {
			const res = await uploadProductImage(formData).unwrap();
			toast.success(res.message);
			setImage(res.image);
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	const handleAddRecurringDate = (
		e,
		recurringValue,
		recurringState,
		setRecurringState
	) => {
		e.preventDefault();
		if (recurringState.includes(recurringValue)) {
			setRecurringState(
				recurringState.filter((otherDate) => otherDate != recurringValue)
			);
		} else {
			setRecurringState([...recurringState, recurringValue]);
		}
	};

	const checkFrequency = (freq) => {
		let newFreq;

		switch (freq) {
			case 0:
				newFreq = 'yearly';
				break;
			case 1:
				newFreq = 'monthly';
				break;
			case 2:
				newFreq = 'weekly';
				break;
			case 3:
				newFreq = 'daily';
				break;
			default:
				newFreq = 'daily';
		}

		return newFreq;
	};

	const calculateEventFrequency = (freq, byNDay) => {
		if (byNDay && byNDay.length > 1) {
			setFrequency('custom');
		} else {
			setFrequency(checkFrequency(freq));
		}
	};

	useEffect(() => {
		if (product) {
			const rule = RRule.fromString(product.rrule);

			setName(product.name ?? '');
			setPrice(product.price ?? 0);
			setImage(product.image ?? '');
			setBrand(product.brand ?? '');
			setCategory(product.category ?? '');
			setCardSet(product.cardSet ?? '');
			setCountInStock(product.maximumEventCapacity ?? 0);
			setDescription(product.description ?? '');
			setType(product.type ?? '');
			setEventLocation(product.eventLocation ?? '');
			setStartTime(product.startTime ? product.startTime.substring(0, 16) : '');
			setEndTime(product.endTime ? product.endTime.substring(0, 16) : '');
			setIsRecurring(product.isRecurring ?? false);
			if (rule.options.bynweekday?.length > 0) {
				setFrequency('custom');
				if (rule.options.bynweekday.length > 0) {
					const calDayWeek = rule.options.bynweekday[0][0];
					setCalendarDayWeek(calDayWeek === 6 ? 0 : calDayWeek + 1);

					const newWeekOfMonth = rule.options.bynweekday
						.map((weekday) => {
							return weekday[1] ? recurringWeekConfig[weekday[1] - 1] : '';
						})
						.filter(Boolean);
					setWeekOfMonth(newWeekOfMonth);
				}
				calculateEventFrequency(rule.options.freq, rule.options.bynweekday);
			} else {
				setFrequency('daily');
				setCalendarDayWeek(0);
				setWeekOfMonth([]);
			}
		}
	}, [product]);

	return (
		<div className="space-y-5 p-10">
			<Link to="/admin/products">
				<button className="rounded-lg border border-creased-khaki bg-emerald-green p-3 text-creased-khaki">
					Go Back
				</button>
			</Link>
			<div className=" flex w-1/2 flex-col space-y-5 place-self-center rounded border border-creased-khaki p-10 text-off-white">
				<div>
					<h1 className="text-3xl">Edit Product</h1>
					{!isLoading && (
						<>
							<h2 className="text-sm">{`Editing ${product._id}`}</h2>
						</>
					)}
				</div>
				{loadingUpdate && <Loader />}
				{isLoading ? (
					<Loader />
				) : (
					<>
						<form
							onSubmit={submitHandler}
							className="grid-col grid w-full grid-cols-2 flex-wrap gap-4"
						>
							{/* Product Type - On hold for MVP. */}
							{/* <fieldset
								id="type"
								className="col-span-2 flex flex-col space-y-1"
							>
								<label className="font-bold">Product Type</label>
								<select
									value={type}
									onChange={(e) => setType(e.target.value)}
									className="p-2 text-black"
								>
									<option value="product">Product</option>
									<option value="event">Event</option>
								</select>
							</fieldset> */}
							{/* Product Title/Name */}
							<fieldset
								id="name"
								className="col-span-2 flex flex-col space-y-1"
							>
								<label className="font-bold">Event Name</label>
								<input
									type="text" // Changed to "text"
									placeholder="Enter name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="p-2 text-black"
								></input>
							</fieldset>
							<fieldset className="flex flex-col">
								<label className="font-bold">Start Time</label>
								<input
									type="datetime-local"
									name="startTime"
									id="startTime"
									className=" p-2"
									value={startTime.substring(0, 16)}
									onChange={(e) => {
										setStartTime(`${e.target.value}:00.000Z`);
									}}
								/>
							</fieldset>
							<fieldset className="flex flex-col">
								<label className="font-bold">End Time</label>
								<input
									type="datetime-local"
									name="endTime"
									id="endTime"
									className=" p-2"
									value={endTime.substring(0, 16)}
									onChange={(e) => {
										setEndTime(`${e.target.value}:00.000Z`);
									}}
								/>
							</fieldset>
							{/* How many seats this event accepts. */}
							<fieldset id="quantity" className="flex flex-col space-y-1">
								<label className="font-bold">Count In Stock</label>
								<input
									type="number"
									placeholder="Enter stock count"
									value={countInStock}
									onChange={(e) => setCountInStock(e.target.value)}
									className="p-2 text-black"
								></input>
							</fieldset>
							{/* Event's price. */}
							<fieldset id="price" className="flex flex-col space-y-1">
								<label className="font-bold">List Price</label>
								<input
									type="number"
									placeholder="Enter price"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
									className="p-2 text-black"
								></input>
							</fieldset>
							{/* The type of event. */}
							<fieldset id="category" className="flex flex-col space-y-1">
								<label className="font-bold">Category</label>
								<input
									type="text"
									placeholder="Enter category"
									value={category}
									onChange={(e) => setCategory(e.target.value)}
									className="p-2 text-black"
								></input>
							</fieldset>
							{/* Card set, edition, or release featured at the event. */}
							<fieldset id="cardSet" className="flex flex-col space-y-1">
								<label className="font-bold">Card Set</label>
								<input
									type="text"
									placeholder="Enter card set"
									value={cardSet}
									onChange={(e) => setCardSet(e.target.value)} // Corrected onChange
									className="p-2 text-black"
								></input>
							</fieldset>
							{/* Location of the event as a string.*/}
							<fieldset id="cardSet" className="flex flex-col space-y-1">
								<label className="font-bold">Event Location</label>
								<input
									type="text"
									placeholder="Enter event location"
									value={eventLocation}
									onChange={(e) => setEventLocation(e.target.value)} // Corrected onChange
									className="p-2 text-black"
								></input>
							</fieldset>
							{/* Recurring event options. */}
							<AnimatePresence>
								{/* Toggle event's recurring functionality */}
								<motion.fieldset
									id="recurringToggle"
									key="recurringToggleKey"
									className={`flex flex-col space-y-1 ${isRecurring ? 'col-span-1' : 'col-span-2'}`}
									layout
								>
									<label className="font-bold">Recurring?</label>
									<div className="flex flex-col place-items-center justify-center space-y-2 text-center">
										<span
											onClick={() => {
												setIsRecurring(true);
											}}
											className={`w-32 cursor-pointer rounded-lg p-2 font-bold 
											
											${isRecurring ? 'bg-creased-khaki text-noir-de-vigne' : 'border border-creased-khaki text-creased-khaki'}`}
										>
											Yes
										</span>
										<span
											onClick={() => {
												setIsRecurring(false);
											}}
											className={`w-32 cursor-pointer  rounded-lg p-2 font-bold
											${isRecurring ? 'border border-creased-khaki text-creased-khaki' : 'bg-creased-khaki text-noir-de-vigne'}`}
										>
											No
										</span>
									</div>
								</motion.fieldset>
								{isRecurring && (
									<>
										{/* Select recurring event pattern */}
										<motion.fieldset
											id="selectEventPattern"
											key="selectEventPatternKey"
											className="flex flex-col place-items-center space-y-1"
											initial="initial"
											animate="animate"
											exit="exit"
										>
											<label className="w-full self-start font-bold">
												Repeat this event...
											</label>
											<div className="grid w-52 grid-cols-2 justify-items-center gap-2 text-center">
												{recurringPatternConfig.map((option, index) => (
													<button
														key={index}
														type="button"
														onClick={() => {
															setFrequency(option.toLowerCase());
														}}
														className={`case w-24 grow cursor-pointer rounded-lg p-2 font-bold capitalize
											
											${frequency === option ? 'bg-creased-khaki text-noir-de-vigne' : 'border border-creased-khaki text-creased-khaki'}`}
													>
														{option}
													</button>
												))}
											</div>
										</motion.fieldset>
										{frequency === 'custom' && (
											<>
												{/*Select the days a custom event pattern will take place on*/}
												<motion.fieldset
													id="selectCustomWeekday"
													key="selectCustomWeekdayKey"
													className="col-span-2 flex flex-col space-y-1"
													initial="initial"
													animate="animate"
													exit="exit"
													variants={fadeCollapse}
												>
													<label className="font-bold">Day of the Week</label>
													<div className="flex flex-row flex-wrap justify-center space-x-2 space-y-2 text-center">
														{recurringDayConfig.map((index, day) => (
															<button
																type="button"
																key={index}
																onClick={(e) => {
																	e.preventDefault();
																	setCalendarDayWeek(day);
																}}
																className={`ml-2 mt-2 cursor-pointer rounded-lg p-3 font-bold 											
											${day === calendarDayWeek ? 'bg-creased-khaki text-noir-de-vigne' : 'border border-creased-khaki text-creased-khaki'}`}
															>
																{index}
															</button>
														))}
													</div>
												</motion.fieldset>
												{/*Select the week this event will take place on.*/}
												<motion.fieldset
													id="selectEventWeek"
													key="selectEventWeekKey"
													className="col-span-2 flex flex-col space-y-1"
													initial="initial"
													animate="animate"
													exit="exit"
													variants={fadeCollapse}
												>
													<label className="font-bold">
														Week(s) of the Month
													</label>
													<div className="flex flex-row flex-wrap justify-center space-x-2 space-y-2 text-center">
														{recurringWeekConfig.map((week, index) => (
															<button
																type="button"
																key={index}
																onClick={(e) => {
																	handleAddRecurringDate(
																		e,
																		week,
																		weekOfMonth,
																		setWeekOfMonth
																	);
																}}
																className={`ml-2 mt-2 cursor-pointer rounded-lg p-3 font-bold 											
											${
												weekOfMonth.includes(week)
													? 'bg-creased-khaki text-noir-de-vigne'
													: 'border border-creased-khaki text-creased-khaki'
											}`}
															>
																{week}
															</button>
														))}
													</div>
												</motion.fieldset>
											</>
										)}
									</>
								)}
							</AnimatePresence>
							<fieldset id="description" className="col-span-2 flex flex-col">
								<label className="font-bold">Description</label>
								<textarea
									type="text"
									placeholder="Enter description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="p-2 text-black"
								></textarea>

								<div className="mt-4">
									<label className="font-bold">Event Image</label>
									<div className="col-span-2 h-full w-full rounded-2xl border border-creased-khaki">
										<div
											className="relative aspect-square h-64 w-full rounded-2xl object-contain p-4"
											style={{
												backgroundImage: `url(${image})`,
												backgroundSize: 'contain',
												backgroundRepeat: 'no-repeat',
												backgroundPosition: 'center',
											}}
										>
											<input
												type="file"
												className="cursor-pointer"
												style={{
													opacity: '0',
													position: 'absolute',
													top: 0,
													left: 0,
													width: '100%',
													height: '100%',
												}}
												onChange={imageUploadHandler}
											/>
										</div>
									</div>
								</div>
							</fieldset>

							<button
								type="submit"
								className="col-span-2 aspect-video h-16 place-self-center rounded-lg bg-creased-khaki p-3 text-xl font-bold text-noir-de-vigne"
							>
								Update
							</button>
						</form>
					</>
				)}
			</div>
		</div>
	);
};

export default ProductDetailPage;
