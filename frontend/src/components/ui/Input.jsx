import React from 'react';

const Input = ({ label, id, type = 'text', placeholder, value, onChange, icon, required = false, className = '' }) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        {icon}
                    </div>
                )}
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`block w-full border border-gray-300 rounded-lg py-2.5 px-4 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow ${icon ? 'pl-10' : ''}`}
                />
            </div>
        </div>
    );
};

export default Input;
