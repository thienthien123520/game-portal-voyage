
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';
import { getGamesByCategory, Game } from '@/services/gameService';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      if (!category) return;
      
      setLoading(true);
      try {
        const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
        const gamesData = await getGamesByCategory(formattedCategory);
        setGames(gamesData);
        document.title = `${formattedCategory} Games - GameVoyage`;
        setLoading(false);
      } catch (error) {
        console.error('Error fetching games by category:', error);
        setLoading(false);
      }
    };
    
    fetchGames();
  }, [category]);

  const categoryTitle = category 
    ? category.charAt(0).toUpperCase() + category.slice(1) 
    : 'Category';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Hero section */}
          <div className="bg-gaming-card rounded-lg p-6 mb-8 relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gaming-text">{categoryTitle} Games</h1>
              <p className="text-gaming-muted max-w-2xl">
                Explore our collection of {games.length} exciting {categoryTitle.toLowerCase()} games. 
                Find your next favorite game and start playing instantly with no downloads required.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gaming-primary/10 to-transparent opacity-50"></div>
          </div>

          {/* Games grid */}
          <section>
            <h2 className="section-title mb-8">All {categoryTitle} Games</h2>
            
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="game-card animate-pulse">
                    <div className="bg-gaming-card/50 h-48 rounded-t-lg"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gaming-card/50 rounded mb-2"></div>
                      <div className="h-4 bg-gaming-card/50 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : games.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {games.map(game => (
                  <GameCard key={game.id} {...game} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold text-gaming-text mb-2">No Games Found</h3>
                <p className="text-gaming-muted">
                  We couldn't find any games in the {categoryTitle.toLowerCase()} category.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
