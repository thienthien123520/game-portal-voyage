
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const categories = [
    "Action", "Adventure", "Arcade", "Puzzle", "Racing", "RPG", "Sports", "Strategy"
  ];

  return (
    <header className="bg-gaming-card sticky top-0 z-50 border-b border-gaming-primary/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gaming-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">GV</span>
            </div>
            <span className="text-gaming-text font-bold text-xl hidden md:block">GameVoyage</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {categories.slice(0, 5).map((category) => (
              <Link 
                key={category} 
                to={`/category/${category.toLowerCase()}`}
                className="text-gaming-text/80 hover:text-gaming-primary transition-colors"
              >
                {category}
              </Link>
            ))}
            <div className="relative">
              <Button variant="ghost">
                More
              </Button>
            </div>
          </nav>

          {/* Search and Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search games..."
                className="bg-gaming-bg border border-gaming-primary/30 rounded-full px-4 py-2 w-64 text-sm focus:outline-none focus:border-gaming-primary"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gaming-muted" />
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gaming-text" />
              ) : (
                <Menu className="h-6 w-6 text-gaming-text" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search games..."
                className="bg-gaming-bg border border-gaming-primary/30 rounded-full px-4 py-2 w-full text-sm focus:outline-none focus:border-gaming-primary"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gaming-muted" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link 
                  key={category} 
                  to={`/category/${category.toLowerCase()}`}
                  className="text-gaming-text/80 hover:text-gaming-primary py-2 px-3 rounded-md transition-colors hover:bg-gaming-card"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
