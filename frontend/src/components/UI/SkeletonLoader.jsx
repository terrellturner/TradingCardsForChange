import React from 'react';

const SkeletonLoader = ({ classNames, children }, ref) => {
	return <div className={`${classNames}`}>{children}</div>;
};

export default React.forwardRef(SkeletonLoader);
