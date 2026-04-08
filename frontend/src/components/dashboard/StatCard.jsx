import React from 'react';
import Card, { CardBody } from '../ui/Card';

const StatCard = ({ title, value, icon: Icon, colorClass, bgColorClass }) => {
    return (
        <Card hover={true} className="transform transition-transform hover:-translate-y-1 duration-300">
            <CardBody className="flex items-center gap-5 p-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${bgColorClass}`}>
                    <Icon size={26} className={colorClass} />
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{value}</h3>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-1">{title}</p>
                </div>
            </CardBody>
        </Card>
    );
};

export default StatCard;
