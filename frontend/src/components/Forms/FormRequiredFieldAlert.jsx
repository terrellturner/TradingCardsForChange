import React from 'react';
import { FaCircleExclamation } from 'react-icons/fa6';

const FormRequiredFieldAlert = () => {
	return (
		<div className="flex flex-row place-items-center">
			<FaCircleExclamation className="inline fill-creased-khaki" />
			<span className="ml-1">Required</span>
		</div>
	);
};

export default FormRequiredFieldAlert;
