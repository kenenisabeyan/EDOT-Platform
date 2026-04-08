import React from 'react';

const Card = ({ children, className = '', hover = true, onClick }) => {
    const defaultClasses = "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden";
    const hoverClasses = hover ? "transition-shadow duration-300 hover:shadow-md cursor-pointer" : "";
    
    return (
        <div 
            className={`${defaultClasses} ${hoverClasses} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = '' }) => (
    <div className={`p-6 border-b border-gray-100 ${className}`}>{children}</div>
);

export const CardBody = ({ children, className = '' }) => (
    <div className={`p-6 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
    <div className={`p-6 border-t border-gray-100 bg-gray-50 ${className}`}>{children}</div>
);

export default Card;
