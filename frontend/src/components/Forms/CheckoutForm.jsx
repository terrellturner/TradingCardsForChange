import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import ContentContainer from '../ContentContainer';
import InputItem from './FormInputItem';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../slices/cartSlice';

const CustomerShippingBillingForm = (props) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const dispatch = useDispatch();

	const [fName, setFName] = useState(shippingAddress?.fName || '');
	const [lName, setLName] = useState(shippingAddress?.lName || '');
	const [address, setAddress] = useState(shippingAddress?.address || '');
	const [addressSecondary, setAddressSecondary] = useState(
		shippingAddress?.addressSecondary || ''
	);
	const [postalCode, setPostalCode] = useState(
		shippingAddress?.postalCode || ''
	);
	const [city, setCity] = useState(shippingAddress?.city || '');
	const [state, setState] = useState(shippingAddress?.state || '');
	const [country, setCountry] = useState(shippingAddress?.country || '');

	const main = document.getElementById('main');

	const submitInfoHandler = (e) => {
		e.preventDefault();
		props.handleClick();
		dispatch(
			saveShippingAddress({
				fName,
				lName,
				address,
				addressSecondary,
				postalCode,
				city,
				state,
				country,
			})
		);
	};

	return createPortal(
		<>
			<div
				onClick={props.handleClick}
				className="fixed bottom-0 left-0 right-0 top-0 bg-noir-de-vigne bg-opacity-80"
			></div>
			<ContentContainer className="fixed left-1/2 top-1/2 z-50 flex h-2/3 w-4/5 -translate-x-1/2 -translate-y-1/2 flex-col overflow-scroll border-2 bg-noir-de-vigne md:h-auto md:w-2/5 md:overflow-hidden md:p-12">
				<h3 className="text-2xl font-bold">Contact Information</h3>
				<span>Please enter your contact information below.</span>
				<form
					onSubmit={submitInfoHandler}
					className="grid w-full grid-cols-1 items-center gap-x-10 gap-y-3 space-y-1 pt-8 md:grid-cols-2"
				>
					<InputItem
						type="text"
						id="fName"
						name="fName"
						placeholder=""
						labelFor="fName"
						labelText="First Name"
						className="col-span-2 md:col-auto"
						setValue={setFName}
					/>
					<InputItem
						type="text"
						id="lName"
						name="lName"
						placeholder=""
						labelFor="lName"
						labelText="Last Name"
						className="col-span-2 md:col-auto"
						setValue={setLName}
					/>
					<InputItem
						type="text"
						id="adr1"
						name="adr1"
						placeholder=""
						labelFor="adr1"
						labelText="Address"
						className="col-span-2"
						setValue={setAddress}
					/>
					<InputItem
						type="text"
						id="adr2"
						name="adr2"
						placeholder=""
						labelFor="adr2"
						labelText="Address 2"
						className="col-span-2"
						setValue={setAddressSecondary}
					/>
					<InputItem
						type="text"
						id="city"
						name="city"
						placeholder=""
						labelFor="city"
						labelText="City"
						className="col-span-2"
						setValue={setCity}
					/>
					<InputItem
						type="text"
						id="state"
						name="state"
						placeholder=""
						labelFor="state"
						labelText="State/Province"
						className="col-span-2"
						setValue={setState}
					/>
					<InputItem
						type="text"
						id="postalZip"
						name="postalZip"
						placeholder=""
						labelFor="postalZip"
						labelText="Zip/Postal"
						className="col-span-2"
						setValue={setPostalCode}
					/>
					<InputItem
						type="text"
						id="country"
						name="country"
						placeholder=""
						labelFor="country"
						labelText="Country"
						className="col-span-2"
						setValue={setCountry}
					/>
					<button
						onClick={props.handleClick}
						className="rounded-lg border-2 p-4 text-creased-khaki"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="rounded-lg bg-creased-khaki p-4 text-noir-de-vigne"
					>
						Submit
					</button>
				</form>
			</ContentContainer>
		</>,
		main
	);
};

export default CustomerShippingBillingForm;
