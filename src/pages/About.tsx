import React from 'react';
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 fade-in">
      <section className="text-center">
        <h1 className="text-4xl font-bold gradient-text mb-4 font-serif">About PCOSCare</h1>
        <p className="text-xl text-pink-600">
          Empowering women through comprehensive PCOS management and support
        </p>
      </section>

      <section className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4  text-pink-600 font-serif">Our Mission</h2>
        <p className="text-pink-500 leading-relaxed">
          At PCOSCare, we understand the challenges that come with managing PCOS. Our mission
          is to provide a comprehensive, user-friendly platform that empowers women to take
          control of their PCOS journey through personalized care plans, expert guidance,
          and community support.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-3 text-pink-600 font-serif">What We Offer</h3>
          <ul className="space-y-3 text-pink-500">
            <li>• Personalized yoga and exercise routines</li>
            <li>• Customized diet and nutrition plans</li>
            <li>• Advanced cycle tracking tools</li>
            <li>• Access to PCOS specialists</li>
            <li>• Educational resources and support</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-3  text-pink-600 font-serif">Why Choose Us</h3>
          <ul className="space-y-3 text-pink-500">
            <li>• Evidence-based approach to PCOS management</li>
            <li>• Holistic treatment plans</li>
            <li>• Expert healthcare professionals</li>
            <li>• Supportive community</li>
            <li>• Continuous innovation and improvement</li>
          </ul>
        </div>
      </section>

      <section className="bg-gradient-to-r from-pink-100 to-purple-100 p-8 rounded-2xl text-center">
        <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
        <p className="text-gray-600 mb-6">
          Be part of a supportive community of women managing PCOS together.
          Share experiences, learn from others, and access expert guidance.
        </p>
        <Link to="/signup">
  <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
    Get Started Today
  </button>
</Link>
      </section>
    </div>
  );
};

export default About;