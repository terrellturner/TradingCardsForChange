import React from 'react';
import { FaCircleExclamation } from 'react-icons/fa6';

const RequiredFieldAlert = () => {
    return (
        <div className="flex flex-row place-items-center">
            <FaCircleExclamation className="inline fill-ipa-beige" />
            <span className="ml-1">Required</span>
        </div>
    );
};

export default RequiredFieldAlert;
