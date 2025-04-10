
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface Game {
  id: string;
  title: string;
  description: string;
  banner: string;
  category: string;
}

const featuredGames: Game[] = [
  {
    id: 'racing-thunder',
    title: 'Racing Thunder',
    description: 'Experience high-speed racing with stunning graphics and challenging tracks.',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
    category: 'Racing'
  },
  {
    id: 'castle-defense',
    title: 'Castle Defense',
    description: 'Build your fortress, train your army, and defend against waves of enemies.',
    banner: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    category: 'Strategy'
  },
  {
    id: 'puzzle-quest',
    title: 'Puzzle Quest',
    description: 'Solve increasingly challenging puzzles in this mind-bending adventure.',
    banner: 'https://images.unsplash.com/photo-1614680376739-414d95ff43df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    category: 'Puzzle'
  }
];

const FeaturedGames = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredGames.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredGames.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden neon-border">
      {featuredGames.map((game, index) => (
        <div
          key={game.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${game.banner})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gaming-bg via-gaming-bg/80 to-transparent" />
          </div>
          
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-lg">
                <span className="game-tag mb-3 inline-block">{game.category}</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white">{game.title}</h2>
                <p className="text-gaming-muted mb-6">{game.description}</p>
                <div className="flex space-x-4">
                  <Button 
                    className="bg-gaming-primary hover:bg-gaming-secondary text-white"
                    asChild
                  >
                    <Link to={`/game/${game.id}`}>Play Now</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-gaming-primary/50 text-gaming-primary hover:bg-gaming-primary/10"
                    asChild
                  >
                    <Link to={`/game/${game.id}`}>Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gaming-bg/50 backdrop-blur-sm p-2 rounded-full text-white hover:bg-gaming-primary transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gaming-bg/50 backdrop-blur-sm p-2 rounded-full text-white hover:bg-gaming-primary transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {featuredGames.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-gaming-primary w-6'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedGames;
