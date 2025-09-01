import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-kerala-coconut-white dark:bg-kerala-charcoal border-t border-black dark:border-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-4">
          <section className="flex flex-col items-center space-y-4">
            <Link
              to="/about"
              className="text-kerala-deep-green dark:text-kerala-muted-gold font-medium text-xl"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-kerala-deep-green dark:text-kerala-muted-gold font-medium text-xl"
            >
              Contact
            </Link>
          </section>

          <p className="text-center text-black dark:text-white font-medium text-xl">Copyright &copy; 2025 Kazhichoo</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
