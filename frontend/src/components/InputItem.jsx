import React from 'react';
import PropTypes from 'prop-types';

const InputItem = ({
    type,
    id,
    name,
    placeholder,
    labelFor,
    labelText,
    className,
}) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <label className="font-bold text-off-white" htmlFor={labelFor}>
                {labelText}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                className="rounded-md border-2 border-ipa-beige bg-newsletter-black p-2"
            ></input>
        </div>
    );
};

export default InputItem;

InputItem.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    labelFor: PropTypes.string,
    labelText: PropTypes.string,
    className: PropTypes.string,
};
