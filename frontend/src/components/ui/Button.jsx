import React from 'react';

const Button = ({ children, variant = 'primary', className = '', onClick, type = 'button', disabled = false, icon }) => {
    const baseClasses = "flex items-center justify-center gap-2 font-medium rounded-lg px-4 py-2 transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600",
        secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-600",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
    };

    return (
        <button 
            type={type}
            className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <span>{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
