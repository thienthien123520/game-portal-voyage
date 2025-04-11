
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GamePlayer from '@/components/GamePlayer';
import { Star } from 'lucide-react';
import CommentSection from '@/components/CommentSection';

const HomePage = () => {
  // Game state
  const [game, setGame] = useState({
    id: "geometry-dash-wave",
    title: "Geometry Dash Wave",
    description: "Ride the wave and avoid obstacles in this challenging rhythm-based game. Test your reflexes as you navigate through increasingly difficult levels set to energetic music.",
    gameUrl: "https://scratch.mit.edu/projects/105500895/embed",
    category: "Arcade",
    tags: ["Rhythm", "Platformer", "Challenge", "Wave"],
    rating: 4.8,
    plays: 24689,
  });
  
  // Comments state
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set page title for Geometry Dash Wave
    document.title = "Geometry Dash Wave - Play Now | GameVoyage";
    
    // Fetch game data from API
    const fetchGameData = async () => {
      try {
        const response = await fetch('/api/game?id=geometry-dash-wave');
        if (response.ok) {
          const gameData = await response.json();
          setGame(gameData);
        }
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };
    
    // Fetch comments from API
    const fetchComments = async () => {
      try {
        const response = await fetch('/api/comments?gameId=geometry-dash-wave');
        if (response.ok) {
          const commentsData = await response.json();
          setComments(commentsData);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setLoading(false);
      }
    };
    
    fetchGameData();
    fetchComments();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Featured Game - Geometry Dash Wave */}
          <section className="mb-12">
            <h1 className="text-4xl font-bold mb-6 text-gaming-text">{game.title}</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <GamePlayer gameUrl={game.gameUrl} title={game.title} />
              </div>
              
              <div className="bg-gaming-card rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">About the Game</h2>
                <p className="text-gaming-muted mb-6">{game.description}</p>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">How to Play</h3>
                  <p className="text-gaming-muted">Use your mouse or spacebar to navigate the wave through obstacles. Time your jumps perfectly to the rhythm of the music to survive!</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center space-x-1 bg-gaming-card/50 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    <span className="text-sm">{game.rating.toFixed(1)}</span>
                  </div>
                  
                  <div className="game-tag">
                    {game.category}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {game.tags.map(tag => (
                      <span key={tag} className="game-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Comments Section */}
          <CommentSection gameId={game.id} comments={comments} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
