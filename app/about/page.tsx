import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Github, Globe, Mail, Database, Code, Linkedin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <Link 
              href="/" 
              className="text-blue-100 hover:text-white flex items-center transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-4">About Deed League API </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Transforming basketball data access for Mongolia's growing basketball community 
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ 
          background: "linear-gradient(to bottom right, transparent 49%, #f9fafb 50%)" 
        }}></div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left sidebar with navigation */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h3>
              <nav className="flex flex-col space-y-2 mb-8">
                <a href="#mission" className="text-blue-600 hover:text-blue-800 py-1">Our Mission</a>
                <a href="#creator" className="text-blue-600 hover:text-blue-800 py-1">Creator</a>
                <a href="#data" className="text-blue-600 hover:text-blue-800 py-1">Data Collection</a>
                <a href="#tech" className="text-blue-600 hover:text-blue-800 py-1">Technology</a>
                <a href="#contact" className="text-blue-600 hover:text-blue-800 py-1">Contact Us</a>
              </nav>
              
              <div className="flex space-x-4 mt-6">
                <a href="https://github.com/turbiskio" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                  <Github className="h-6 w-6" />
                </a>
                <a href="mailto:turbileg@example.com" className="text-gray-600 hover:text-gray-900">
                  <Mail className="h-6 w-6" />
                </a>
                <a href="https://linkedin.com/in/turbileg-uurtsaikh" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="md:col-span-2 space-y-12">
            <section id="mission">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                Deed League API was created to solve a critical gap in the basketball analytics landscape in Mongolia. As the sport continues to grow in popularity, we recognized the need for comprehensive, accessible data on players, teams, and games.
              </p>
              <p className="text-gray-600 mb-4">
                Our mission is to democratize access to basketball statistics for Mongolian players and teams, providing insights that were previously unavailable to coaches, players, fans, and analysts.
              </p>
              <p className="text-gray-600">
                By making this data openly available through both our web interface and API, we aim to foster a data-driven basketball culture that can elevate the sport to new heights in Mongolia.
              </p>
            </section>
            
            {/* Creator Section with your information */}
            <section id="creator" className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-1/3">
                  <Image
                    src="/turbileg.jpg" 
                    alt="Turbileg Uurtsaikh"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover md:object-center"
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">Creator</div>
                  <h2 className="text-2xl font-bold text-gray-900 mt-1">Turbileg Uurtsaikh</h2>
                  <p className="text-gray-600 font-medium mt-1">Computer Science Student at UBC</p>
                  <p className="mt-4 text-gray-600">
                    Aspiring AI developer passionate about creating intelligent systems that understand and serve communities. 
                    Focused on transforming raw data into meaningful insights through machine learning.
                  </p>
                  <div className="mt-6 flex space-x-4">
                    <a href="https://github.com/turbo-leg" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 flex items-center">
                      <Github className="h-5 w-5 mr-2" />
                      GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/turbileg-uurtsaikh-42ab97237/?originalSubdomain=mn" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 flex items-center">
                      <Linkedin className="h-5 w-5 mr-2" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </section>
            
            <section id="data">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Collection</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-800">
                  <Database className="h-5 w-5 mr-2 text-blue-600" />
                  Our Data Sources
                </h3>
                <p className="text-gray-600 mb-4">
                  We collect data from multiple official sources including:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Official league websites and scoresheets</li>
                  <li>Team statistics portals</li>
                  <li>Official tournament records</li>
                  <li>Public basketball databases with Mongolia coverage</li>
                </ul>
              </div>
              <p className="text-gray-600 mb-4">
                Our data collection process is designed to be respectful of source websites while ensuring the most up-to-date information. We employ both automated and manual verification processes to maintain high data quality.
              </p>
              <p className="text-gray-600">
                Data is refreshed regularly, with player listings updated daily and individual statistics updated after games are played.
              </p>
            </section>
            
            <section id="tech">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Technology</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-800">
                  <Code className="h-5 w-5 mr-2 text-blue-600" />
                  Our Tech Stack
                </h3>
                <p className="text-gray-600 mb-4">
                 Deed League API is built with modern technologies:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-gray-50 p-3 rounded">
                    <span className="font-medium text-gray-700">Next.js</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <span className="font-medium text-gray-700">React</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <span className="font-medium text-gray-700">TypeScript</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <span className="font-medium text-gray-700">Tailwind CSS</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <span className="font-medium text-gray-700">Puppeteer</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <span className="font-medium text-gray-700">Supabase</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                This application is fully open-source, and contributions from the community are welcome. Check out the GitHub repository to learn more about how you can help improve the platform.
              </p>
            </section>
            
            <section id="contact">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-6">
                Have questions, suggestions, or want to contribute to the project? We'd love to hear from you!
              </p>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:turbileg@student.ubc.ca" className="text-blue-600 hover:underline">turbileg@example.com</a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Github className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium">GitHub</p>
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">github.com/turbiskio/mongolia-basketball</a>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Link 
                    href="/protected" 
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors"
                  >
                    Access API Documentation
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
