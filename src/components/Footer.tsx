
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gaming-card border-t border-gaming-primary/20 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gaming-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">GV</span>
              </div>
              <span className="text-gaming-text font-bold text-xl">GameVoyage</span>
            </Link>
            <p className="text-gaming-muted text-sm mb-4">
              Discover and play the best online games instantly. No downloads required.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gaming-muted hover:text-gaming-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gaming-muted hover:text-gaming-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gaming-muted hover:text-gaming-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gaming-muted hover:text-gaming-primary">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              {["Action", "Adventure", "Arcade", "Puzzle", "Racing", "RPG", "Sports", "Strategy"].map((category) => (
                <li key={category}>
                  <Link 
                    to={`/category/${category.toLowerCase()}`}
                    className="text-gaming-muted hover:text-gaming-primary transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gaming-muted hover:text-gaming-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gaming-muted hover:text-gaming-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gaming-muted hover:text-gaming-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gaming-muted hover:text-gaming-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gaming-muted hover:text-gaming-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gaming-muted text-sm mb-4">
              Subscribe to our newsletter for updates on new games and features.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gaming-bg border border-gaming-primary/30 rounded-l-md px-4 py-2 w-full text-sm focus:outline-none focus:border-gaming-primary"
              />
              <button className="bg-gaming-primary hover:bg-gaming-secondary text-white px-4 rounded-r-md transition-colors">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gaming-primary/10 mt-8 pt-8 text-center text-gaming-muted text-sm">
          <p>© {new Date().getFullYear()} GameVoyage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
