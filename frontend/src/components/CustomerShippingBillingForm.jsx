import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import ContentContainer from './ContentContainer';
import InputItem from './InputItem';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../slices/cartSlice';

const CustomerShippingBillingForm = (props) => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const dis = useDispatch();

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
        dis(
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
        <div className="max-w-2/3 z-50 mx-auto">
            <ContentContainer className="sticky flex -translate-y-full flex-col bg-newsletter-black p-12">
                <form
                    onSubmit={submitInfoHandler}
                    className="grid w-full grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-2"
                >
                    <InputItem
                        type="text"
                        id="fName"
                        name="fName"
                        placeholder=""
                        labelFor="fName"
                        labelText="First name"
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

                    <button type="submit">Submit</button>
                </form>
            </ContentContainer>
        </div>,
        main
    );
};

export default CustomerShippingBillingForm;
