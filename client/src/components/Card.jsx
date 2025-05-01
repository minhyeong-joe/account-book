import React from 'react';
import '../styles/Card.css';

const Card = ({ className, children, ...props }) => {
    return <div className={className? `card ${className}`: 'card'} {...props}>{children}</div>;
};

export default Card;