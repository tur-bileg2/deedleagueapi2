'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, Users, BarChart2, Award, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const a=0;
  // Animate elements when they come into view
  useEffect(() => {
    setIsVisible(true);
    
    // Initialize intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.scroll-animation').forEach(element => {
      observer.observe(element);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Updated to match About page style */}
      <div className="relative bg-white border-b border-gray-200">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-center max-w-3xl text-black">
            Deed League API
          </h1>
          <p className="mt-6 text-lg max-w-3xl text-center text-gray-700">
            Access comprehensive data and statistics for Mongolian basketball players.
            Find detailed game logs, player profiles, and advanced analytics all in one place.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/players" className="px-8 py-3 border border-transparent text-base font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              Browse Players
            </Link>
            <a href="#features" className="px-8 py-3 border border-gray-300 text-base font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center">
              Learn More
              <ChevronDown className="ml-2 w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Features Section - Updated to match About page style */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 bg-white">
        <h2 className="text-3xl font-bold text-black text-center mb-12">Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col items-center text-center scroll-animation hover:shadow-xl transition-shadow">
            <div className="bg-gray-100 p-4 rounded-full mb-5 transform transition-transform hover:scale-110">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">Player Profiles</h3>
            <p className="text-gray-700">Comprehensive player profiles with personal details, career history, and current stats.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col items-center text-center scroll-animation hover:shadow-xl transition-shadow">
            <div className="bg-gray-100 p-4 rounded-full mb-5 transform transition-transform hover:scale-110">
              <BarChart2 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">Detailed Statistics</h3>
            <p className="text-gray-700">Game logs, season averages, and summary statistics for in-depth analysis.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col items-center text-center scroll-animation hover:shadow-xl transition-shadow">
            <div className="bg-gray-100 p-4 rounded-full mb-5 transform transition-transform hover:scale-110">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">Advanced Analytics</h3>
            <p className="text-gray-700">Team contribution percentages and advanced performance metrics.</p>
          </div>
        </div>
      </section>
      
      {/* Stats Preview Section - Updated to match About page style */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-black text-center mb-12">Real-time Basketball Data</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: '100+', text: 'Players Tracked' },
              { number: '15+', text: 'Teams Covered' },
              { number: '1000+', text: 'Game Logs' },
              { number: '20+', text: 'Statistical Categories' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white p-6 rounded-lg border border-gray-200"
              >
                <p className="text-3xl font-bold text-blue-600">{stat.number}</p>
                <p className="text-gray-700 mt-2">{stat.text}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/players" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              Explore All Players
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* API Section - Updated to match About page style */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-black mb-6">Access Our Data API</h2>
            <p className="text-lg text-gray-700 mb-6">
              Get programmatic access to our comprehensive basketball data. Ideal for researchers, analysts, and developers building basketball applications.
            </p>
            <div className="bg-gray-100 border border-gray-200 p-4 rounded-md font-mono text-sm mb-6 text-gray-800">
              <code>GET /api/players</code>
              <br />
              <code>GET /api/player-details/:id</code>
            </div>
            <Link href="/api-docs" className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
              API Documentation
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <pre className="bg-gray-100 text-gray-800 p-4 rounded-md overflow-x-auto text-sm border border-gray-200">
              {JSON.stringify({
                "id": "757769",
                "name": "A. Batkhuyag",
                "team": "Darkhan-Uul",
                "league": "Mongolia - National Team",
                "nationality": "Mongolia",
                "position": "SG",
                "age": "24",
                "height": "183",
                "stats": {
                  "ppg": "16.2",
                  "rpg": "4.5",
                  "apg": "3.1"
                }
              }, null, 2)}
            </pre>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Updated to match About page style */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-black">Ready to explore Mongolian basketball data?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-700">
            Get access to comprehensive statistics and player information for the Mongolian Deed League basketball.
          </p>
          <Link href="/players" className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Browse All Players
          </Link>
        </div>
      </section>
      
      {/* Footer - Updated to match About page style */}
      <footer className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-black">Deed League API</h3>
            <p className="text-gray-700">
              Providing comprehensive basketball statistics and player information for the Deed Division of Mongolian basketball.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-black">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-700 hover:text-black">Home</Link></li>
              <li><Link href="/players" className="text-gray-700 hover:text-black">Players</Link></li>
              <li><Link href="/api-docs" className="text-gray-700 hover:text-black">API Documentation</Link></li>
              <li><Link href="/about" className="text-gray-700 hover:text-black">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-black">Contact</h3>
            <p className="text-gray-700">
              For inquiries, please contact:<br />
              <a href="mailto:turbileg@student.ubc.ca" className="text-blue-600 hover:text-blue-800">turbileg@student.ubc.ca</a>
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Deed League API. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
