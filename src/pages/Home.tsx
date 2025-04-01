import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Calendar, Utensils, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-16 fade-in">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-5xl font-bold gradient-text delius-font">
          Take Control of Your PCOS Journey
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your comprehensive platform for managing PCOS with personalized yoga routines,
          diet plans, and expert guidance.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/signup"
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="bg-white text-pink-500 px-8 py-3 rounded-full border border-pink-500 hover:bg-pink-50 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-xl card-shadow hover-scale">
          <Activity className="h-12 w-12 text-pink-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Yoga Planner</h3>
          <p className="text-gray-600">Customized yoga routines designed specifically for PCOS management.</p>
        </div>
        <div className="bg-white p-6 rounded-xl card-shadow hover-scale">
          <Utensils className="h-12 w-12 text-pink-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Diet Planner</h3>
          <p className="text-gray-600">Personalized nutrition plans to help balance hormones and manage symptoms.</p>
        </div>
        <div className="bg-white p-6 rounded-xl card-shadow hover-scale">
          <Calendar className="h-12 w-12 text-pink-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Cycle Tracker</h3>
          <p className="text-gray-600">Monitor your menstrual cycle and symptoms with our easy-to-use tracker.</p>
        </div>
        <div className="bg-white p-6 rounded-xl card-shadow hover-scale">
          <Users className="h-12 w-12 text-pink-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
          <p className="text-gray-600">Connect with healthcare professionals specialized in PCOS care.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-pink-100 to-purple-100 p-12 rounded-2xl text-center">
        <h2 className="text-3xl font-bold mb-4 gradient-text">Ready to Start Your Journey?</h2>
        <p className="text-lg text-gray-600 mb-8">
          Join thousands of women who have taken control of their PCOS with our comprehensive platform.
        </p>
        <Link
          to="/signup"
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity inline-block"
        >
          Join Now
        </Link>
      </section>
    </div>
  );
};

export default Home;