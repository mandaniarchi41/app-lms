import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.jpg';

const Footer = () => {
  return (
    <footer className="bg-primary-background border-t border-border-light font-['Montserrat'] text-primary-text">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <img
                className="h-10 w-auto"
                src={logo}
                alt="The Catalystz"
              />
              {/* <span className="ml-3 text-primary-text text-lg font-['Playfair_Display']">The Catalystz</span> */}
            </div>
            <p className="text-primary-text/80 font-['Open_Sans'] text-sm leading-relaxed">
              Empowering minds through innovative education and transformative learning experiences.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-secondary-text tracking-wider uppercase font-['Montserrat']">About</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-base text-primary-text hover:text-[#5C6BC0] transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-primary-text hover:text-[#5C6BC0] transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-secondary-text tracking-wider uppercase font-['Montserrat']">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/blog" className="text-base text-primary-text hover:text-[#5C6BC0] transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-base text-primary-text hover:text-[#5C6BC0] transition-colors duration-200">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-secondary-text tracking-wider uppercase font-['Montserrat']">Connect</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-primary-text hover:text-[#5C6BC0] transition-colors duration-200">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-primary-text hover:text-[#5C6BC0] transition-colors duration-200">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border-light pt-8">
          <p className="text-base text-primary-text/80 text-center font-['Open_Sans']">
            &copy; {new Date().getFullYear()} The Catalystz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 