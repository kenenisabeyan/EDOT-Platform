import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BookOpen, Users, Globe, Award } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow">
        {/* Header content */}
        <section className="bg-secondary text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6 text-white">Who We Are</h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    EDOT Platform is a digital education system designed to help students learn anytime, anywhere using modern technology and quality content.
                </p>
            </div>
        </section>

        {/* Feature grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-8 text-center group">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Award className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Learning</h3>
              <p className="text-gray-500">Structured lessons prepared by skilled instructors.</p>
            </div>

            <div className="card p-8 text-center group">
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="text-accent" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accessible Anywhere</h3>
              <p className="text-gray-500">Learn online or offline using mobile or desktop devices.</p>
            </div>

            <div className="card p-8 text-center group">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern Skills</h3>
              <p className="text-gray-500">Technology-based education for future readiness.</p>
            </div>

            <div className="card p-8 text-center group">
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Users className="text-accent" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Student Support</h3>
              <p className="text-gray-500">Guidance, tutoring, and continuous academic support.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
