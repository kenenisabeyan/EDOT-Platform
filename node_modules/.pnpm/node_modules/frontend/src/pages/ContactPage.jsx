import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Mail, Phone, Send } from 'lucide-react';

const ContactPage = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending message...');
    setTimeout(() => {
      setStatus('Message sent successfully!');
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-secondary text-4xl font-bold mb-4">Contact EDOT</h1>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">Have any questions or ideas? The EDOT team is ready to support your learning journey.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              
              {/* Contact Information */}
              <div className="bg-white p-8 rounded-[12px] border border-border shadow-sm flex flex-col justify-center">
                <h2 className="text-2xl font-semibold text-secondary mb-8">Get in Touch</h2>
                
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-50 p-3 rounded-full text-primary">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h4 className="font-medium text-secondary text-lg">Location</h4>
                            <p className="text-gray-600">Addis Ababa, Ethiopia</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-50 p-3 rounded-full text-primary">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h4 className="font-medium text-secondary text-lg">Email</h4>
                            <p className="text-gray-600">edotplatform@gmail.com</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-50 p-3 rounded-full text-primary">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h4 className="font-medium text-secondary text-lg">Phone</h4>
                            <p className="text-gray-600">+251 911 234 567</p>
                        </div>
                    </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 rounded-[12px] border border-border shadow-md">
                <h3 className="text-2xl font-semibold text-secondary mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <input type="text" placeholder="John Doe" required className="w-full border border-border rounded-[8px] py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                      <input type="email" placeholder="john@example.com" required className="w-full border border-border rounded-[8px] py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                      <textarea placeholder="How can we help?" rows="5" required className="w-full border border-border rounded-[8px] py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"></textarea>
                  </div>
                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                      <Send size={18} /> Send Message
                  </button>
                  {status && <p className={`text-center font-medium mt-4 ${status.includes('success') ? 'text-green-600' : 'text-blue-600'}`}>{status}</p>}
                </form>
              </div>

            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
