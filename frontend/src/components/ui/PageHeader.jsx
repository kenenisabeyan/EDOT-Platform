import React from 'react';

const PageHeader = ({ title, subtitle, action }) => {
    return (
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                {subtitle && <p className="text-gray-500 text-lg">{subtitle}</p>}
            </div>
            {action && (
                <div>
                    {action}
                </div>
            )}
        </div>
    );
};

export default PageHeader;
