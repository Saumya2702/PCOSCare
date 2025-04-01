import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-100 to-pink-200">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-pink-500" />
              <span className="text-xl font-bold gradient-text">PCOSCare</span>
            </div>
            <p className="text-gray-600">Empowering women through comprehensive PCOS care and support.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-600 hover:text-pink-600">About Us</a></li>
              <li><a href="/yoga-planner" className="text-gray-600 hover:text-pink-600">Yoga Planner</a></li>
              <li><a href="/diet-planner" className="text-gray-600 hover:text-pink-600">Diet Planner</a></li>
              <li><a href="/cycle-tracker" className="text-gray-600 hover:text-pink-600">Cycle Tracker</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-pink-500" />
                <span className="text-gray-600">support@pcoscare.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-pink-500" />
                <span className="text-gray-600">+91 7061345247</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-pink-500" />
                <span className="text-gray-600">Police Line Road, Giridih</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-full border border-pink-200 focus:outline-none focus:border-pink-500"
              />
              <button
                type="submit"
                className="w-full bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-pink-200">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} PCOSCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;