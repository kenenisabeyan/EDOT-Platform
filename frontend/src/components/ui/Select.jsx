import React from 'react';

const Select = ({ label, id, value, onChange, options = [], icon, required = false, className = '', disabled=false }) => {
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
                <select
                    id={id}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    className={`block w-full border border-gray-300 rounded-lg py-2.5 px-4 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow appearance-none disabled:opacity-60 disabled:bg-gray-100 ${icon ? 'pl-10' : ''}`}
                >
                    {options.map((opt, i) => (
                        <option key={i} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Select;
