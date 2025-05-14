import React from 'react';
import PropTypes from 'prop-types';
import CafeLogo from '/images/logo/logo.svg?&react';

const Loader = () => {
	return (
		<div className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full  items-center bg-noir-de-vigne bg-opacity-80">
			<img
				src={CafeLogo}
				className="mt-72 aspect-square h-4/5 grow animate-bounce"
				alt=""
			/>
		</div>
	);
};

export default Loader;
