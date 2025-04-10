
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GamePlayer from '@/components/GamePlayer';
import { Star } from 'lucide-react';
import CommentSection from '@/components/CommentSection';

const HomePage = () => {
  // Featured Geometry Dash Wave game
  const featuredGame = {
    id: "geometry-dash-wave",
    title: "Geometry Dash Wave",
    description: "Ride the wave and avoid obstacles in this challenging rhythm-based game. Test your reflexes as you navigate through increasingly difficult levels set to energetic music.",
    gameUrl: "https://scratch.mit.edu/projects/105500895/embed",
    category: "Arcade",
    tags: ["Rhythm", "Platformer", "Challenge", "Wave"],
    rating: 4.8,
    plays: 24689,
  };
  
  // Initial comments for the game
  const initialComments = [
    {
      id: "1",
      userName: "WaveMaster",
      userAvatar: "/avatars/user1.jpg",
      content: "This is my favorite version of Geometry Dash! The wave mechanic is so satisfying when you get it right.",
      date: "2025-03-15",
      likes: 42,
      dislikes: 3,
    },
    {
      id: "2",
      userName: "DashPro",
      content: "I got to level 5 so far. The difficulty curve is perfect - challenging but not impossible.",
      date: "2025-03-20",
      likes: 28,
      dislikes: 1,
    }
  ];

  useEffect(() => {
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
          
          {/* Comments Section */}
          <CommentSection gameId={featuredGame.id} comments={initialComments} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
