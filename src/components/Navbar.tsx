import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-gradient-to-r from-pink-100 to-pink-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold gradient-text">PCOSCare</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-pink-600 transition-colors">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-pink-600 transition-colors">About</Link>
            <Link to="/selfdiagnosis" className="text-gray-700 hover:text-pink-600 transition-colors">Self Diagnosis</Link>
            <Link to="/yoga-planner" className="text-gray-700 hover:text-pink-600 transition-colors">Yoga</Link>
            <Link to="/diet-planner" className="text-gray-700 hover:text-pink-600 transition-colors">Diet</Link>
            <Link to="/cycle-tracker" className="text-gray-700 hover:text-pink-600 transition-colors">Cycle</Link>
            <Link to="/doctors" className="text-gray-700 hover:text-pink-600 transition-colors">Doctors</Link>
            <Link to="/login" className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-pink-600 transition-colors">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-pink-600 transition-colors">About</Link>
              <Link to="/selfdiagnosis" className="text-gray-700 hover:text-pink-600 transition-colors">Self Diagnosis</Link>
              <Link to="/yoga-planner" className="text-gray-700 hover:text-pink-600 transition-colors">Yoga</Link>
              <Link to="/diet-planner" className="text-gray-700 hover:text-pink-600 transition-colors">Diet</Link>
              <Link to="/cycle-tracker" className="text-gray-700 hover:text-pink-600 transition-colors">Cycle</Link>
              <Link to="/doctors" className="text-gray-700 hover:text-pink-600 transition-colors">Doctors</Link>
              <Link to="/login" className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors text-center">
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;