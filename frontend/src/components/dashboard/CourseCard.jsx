import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, PlayCircle, Settings } from 'lucide-react';
import Card, { CardBody } from '../ui/Card';
import Button from '../ui/Button';

const CourseCard = ({ course, role }) => {
    return (
        <Card className="flex flex-col h-full group hover:shadow-lg transition-all duration-300 hover:border-blue-200">
            <div className="relative h-48 overflow-hidden bg-gray-100">
                <img 
                    src={course.thumbnail || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                {course.category && (
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur shadow-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {course.category}
                    </div>
                )}
            </div>
            
            <CardBody className="flex-grow flex flex-col p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-4 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">{course.title}</h3>
                
                {role === 'student' && course.progress !== undefined && (
                    <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2 font-medium">
                            <span className="text-gray-500">Course Progress</span>
                            <span className="text-blue-700 font-bold">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-4 text-sm mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-gray-600 font-medium whitespace-nowrap">
                        <Clock size={16} /> <span>{course.duration || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-blue-600 font-bold whitespace-nowrap">
                        <Users size={16} /> <span>{course.students || course.enrolled_students || 0}</span>
                    </div>
                </div>

                <div className="mt-5">
                    {role === 'student' ? (
                        <Link to={`/lessons/${course.id}`} className="block">
                            <Button variant="outline" className="w-full" icon={<PlayCircle size={18} />}>
                                Continue
                            </Button>
                        </Link>
                    ) : (
                        <Link to={`/courses/${course.id}`} className="block">
                            <Button variant="secondary" className="w-full" icon={<Settings size={18} />}>
                                Manage Course
                            </Button>
                        </Link>
                    )}
                </div>
            </CardBody>
        </Card>
    );
};

export default CourseCard;
