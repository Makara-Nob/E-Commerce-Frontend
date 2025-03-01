import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImg  from "../assets/TrendProduct.jpg"
const HeroSection = () => {
  return (
    <div className="relative w-full h-[80vh] -z-10 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage:  `url(${heroImg})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Hero Content */}
      <motion.div 
        className="text-center text-white z-10"
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold">
          Shop the Latest Trends
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Find the best deals on fashion, electronics, and more!
        </p>

        <Link to="/product/1">
          <motion.button 
            className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            Start Shopping
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default HeroSection;
