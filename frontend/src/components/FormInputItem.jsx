import React from 'react';
import PropTypes from 'prop-types';

const FormInputItem = ({
    type,
    id,
    name,
    placeholder,
    labelFor,
    labelText,
    className,
    setValue,
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
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            ></input>
        </div>
    );
};

export default FormInputItem;

FormInputItem.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    labelFor: PropTypes.string,
    labelText: PropTypes.string,
    className: PropTypes.string,
    setValue: PropTypes.string,
};
