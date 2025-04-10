
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GamePlayer from '@/components/GamePlayer';
import GameCard from '@/components/GameCard';
import { Button } from '@/components/ui/button';
import { getAllGames, getPopularGames, Game } from '@/services/gameService';
import { Flame, Trophy, Star, Sparkles } from 'lucide-react';

const HomePage = () => {
  const [popularGames, setPopularGames] = useState<Game[]>([]);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Featured Geometry Dash Wave game
  const featuredGame = {
    id: "geometry-dash-wave",
    title: "Geometry Dash Wave",
    description: "Ride the wave and avoid obstacles in this challenging rhythm-based game. Test your reflexes as you navigate through increasingly difficult levels set to energetic music.",
    gameUrl: "https://scratch.mit.edu/projects/105500895/embed",
    category: "Arcade",
    tags: ["Rhythm", "Platformer", "Challenge", "Wave"],
    thumbnail: "/game-thumbnails/geometry-dash.jpg",
    rating: 4.8,
    plays: 24689,
    releaseDate: "2023-09-15",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allGamesData, popularGamesData] = await Promise.all([
          getAllGames(),
          getPopularGames()
        ]);
        
        setAllGames(allGamesData);
        setPopularGames(popularGamesData);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(allGamesData.map(game => game.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Set page title for Geometry Dash Wave
    document.title = "Geometry Dash Wave - Play Now | GameVoyage";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Featured Game - Geometry Dash Wave */}
          <section className="mb-12">
            <h1 className="text-4xl font-bold mb-6 text-gaming-text">Geometry Dash Wave</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <GamePlayer gameUrl={featuredGame.gameUrl} title={featuredGame.title} />
              </div>
              
              <div className="bg-gaming-card rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">About the Game</h2>
                <p className="text-gaming-muted mb-6">{featuredGame.description}</p>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">How to Play</h3>
                  <p className="text-gaming-muted">Use your mouse or spacebar to navigate the wave through obstacles. Time your jumps perfectly to the rhythm of the music to survive!</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center space-x-1 bg-gaming-card/50 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    <span className="text-sm">{featuredGame.rating.toFixed(1)}</span>
                  </div>
                  
                  <div className="game-tag">
                    {featuredGame.category}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {featuredGame.tags.map(tag => (
                      <span key={tag} className="game-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Popular Games */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title flex items-center">
                <Flame className="text-gaming-primary mr-2" size={24} />
                Popular Games
              </h2>
              <Link to="/games/popular" className="text-gaming-primary hover:text-gaming-secondary">
                View All
              </Link>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="game-card animate-pulse">
                    <div className="bg-gaming-card/50 h-48 rounded-t-lg"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gaming-card/50 rounded mb-2"></div>
                      <div className="h-4 bg-gaming-card/50 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {popularGames.slice(0, 4).map(game => (
                  <GameCard key={game.id} {...game} />
                ))}
              </div>
            )}
          </section>
          
          {/* Categories */}
          <section className="mb-12">
            <h2 className="section-title flex items-center">
              <Trophy className="text-gaming-primary mr-2" size={24} />
              Game Categories
            </h2>
            
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-gaming-card/50 h-24 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map(category => (
                  <Link
                    key={category}
                    to={`/category/${category.toLowerCase()}`}
                    className="bg-gaming-card rounded-lg p-4 transition-all hover:bg-gaming-primary/10 hover:border-gaming-primary border border-transparent"
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <h3 className="font-semibold text-lg text-gaming-text">{category}</h3>
                      <span className="text-sm text-gaming-muted mt-1">
                        {allGames.filter(game => game.category === category).length} Games
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
          
          {/* New Releases */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title flex items-center">
                <Sparkles className="text-gaming-primary mr-2" size={24} />
                New Releases
              </h2>
              <Link to="/games/new" className="text-gaming-primary hover:text-gaming-secondary">
                View All
              </Link>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="game-card animate-pulse">
                    <div className="bg-gaming-card/50 h-48 rounded-t-lg"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gaming-card/50 rounded mb-2"></div>
                      <div className="h-4 bg-gaming-card/50 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allGames
                  .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
                  .slice(0, 4)
                  .map(game => (
                    <GameCard key={game.id} {...game} />
                  ))
                }
              </div>
            )}
          </section>
          
          {/* Top Rated */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title flex items-center">
                <Star className="text-gaming-primary mr-2" size={24} fill="currentColor" />
                Top Rated
              </h2>
              <Link to="/games/top-rated" className="text-gaming-primary hover:text-gaming-secondary">
                View All
              </Link>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="game-card animate-pulse">
                    <div className="bg-gaming-card/50 h-48 rounded-t-lg"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gaming-card/50 rounded mb-2"></div>
                      <div className="h-4 bg-gaming-card/50 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allGames
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 4)
                  .map(game => (
                    <GameCard key={game.id} {...game} />
                  ))
                }
              </div>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
