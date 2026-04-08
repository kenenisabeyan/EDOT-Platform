import React from 'react';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-border py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-primary text-white p-2 rounded-lg">
                                <BookOpen size={24} />
                            </div>
                            <span className="font-poppins font-bold text-2xl text-secondary">EDOT</span>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Mindful learning for the modern world. Quality education for every student, everywhere.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-secondary mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link to="/courses" className="hover:text-primary transition-colors">Courses</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-secondary mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-secondary mb-4">Connect</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Facebook</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">© 2026 EDOT Platform. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
