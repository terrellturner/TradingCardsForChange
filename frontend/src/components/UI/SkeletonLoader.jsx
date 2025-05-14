import React from 'react';

const SkeletonLoader = ({ classNames, children }, ref) => {
    return <div className={`${classNames} animate-pulse`}>{children}</div>;
};

export default React.forwardRef(SkeletonLoader);
