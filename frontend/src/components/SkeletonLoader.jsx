import React from 'react';

const SkeletonLoader = ({ classNames, children }) => {
    return <div className={`${classNames} animate-pulse`}>{children}</div>;
};

export default SkeletonLoader;
