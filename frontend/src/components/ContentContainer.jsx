import React from 'react';
import PropTypes from 'prop-types';

const ContentContainer = (props) => {
	return (
		<div
			onClick={props.handleClick}
			className={`rounded-lg border border-creased-khaki p-5 text-off-white ${props.className}`}
		>
			{props.children}
		</div>
	);
};

export default ContentContainer;

ContentContainer.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	handleClick: PropTypes.any,
};
