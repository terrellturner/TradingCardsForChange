import React from 'react';
import { FaCoffee } from 'react-icons/fa';
import { TbCards } from 'react-icons/tb';
import CafeLogo from '/images/logo/logo.svg?&react';

const Logo = ({ classNames }) => {
	return (
		<div className={`relative hidden w-1/6 justify-center ${classNames}`}>
			<img src={CafeLogo} className="w-96" alt="" />
		</div>
	);
};

export default Logo;
