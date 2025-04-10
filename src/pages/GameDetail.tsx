
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GamePlayer from '@/components/GamePlayer';
import CommentSection from '@/components/CommentSection';
import RelatedGames from '@/components/RelatedGames';
import { getGameById, getGameComments, getRelatedGames, getAllGames, Game, Comment } from '@/services/gameService';
import { Star, Eye, Calendar, Tag, Share2, Heart, Bookmark, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [relatedGames, setRelatedGames] = useState<Game[]>([]);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const [gameData, commentsData, allGamesData] = await Promise.all([
          getGameById(id),
          getGameComments(id),
          getAllGames()
        ]);
        
        if (gameData) {
          setGame(gameData);
          document.title = `${gameData.title} - GameVoyage`;
          
          // Meta tags for SEO
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', gameData.description);
          }
          
          const relatedGamesData = await getRelatedGames(id, gameData.category);
          setRelatedGames(relatedGamesData);
        }
        
        setComments(commentsData);
        setAllGames(allGamesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching game data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Scroll to top when navigating to a new game
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = () => {
    if (navigator.share && game) {
      navigator.share({
        title: game.title,
        text: game.description,
        url: window.location.href
      })
      .catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Game link copied to clipboard",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-96 bg-gaming-card rounded-lg"></div>
            <div className="h-8 bg-gaming-card w-1/2 rounded"></div>
            <div className="h-4 bg-gaming-card w-full rounded"></div>
            <div className="h-4 bg-gaming-card w-full rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gaming-text mb-4">Game Not Found</h2>
            <p className="text-gaming-muted mb-6">The game you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <a href="/">Return to Homepage</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Game Player */}
          <section className="mb-8">
            <GamePlayer gameUrl={game.gameUrl} title={game.title} />
          </section>
          
          {/* Game Info */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Game details */}
              <div className="flex-grow">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gaming-text">{game.title}</h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center space-x-1 bg-gaming-card px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    <span className="text-sm">{game.rating.toFixed(1)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 bg-gaming-card px-3 py-1 rounded-full">
                    <Eye className="w-4 h-4 text-gaming-muted" />
                    <span className="text-sm">{game.plays.toLocaleString()} plays</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 bg-gaming-card px-3 py-1 rounded-full">
                    <Calendar className="w-4 h-4 text-gaming-muted" />
                    <span className="text-sm">{new Date(game.releaseDate).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="game-tag">
                    {game.category}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">Description</h3>
                  <p className="text-gaming-muted">{game.description}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {game.tags.map(tag => (
                      <span key={tag} className="game-tag flex items-center">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Actions sidebar */}
              <div className="md:w-64 space-y-4">
                <div className="bg-gaming-card rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-4 text-center">Actions</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="flex flex-col items-center justify-center h-16 border-gaming-primary/50 hover:bg-gaming-primary/10"
                    >
                      <Heart className="h-5 w-5 mb-1" />
                      <span className="text-xs">Favorite</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="flex flex-col items-center justify-center h-16 border-gaming-primary/50 hover:bg-gaming-primary/10"
                    >
                      <Bookmark className="h-5 w-5 mb-1" />
                      <span className="text-xs">Save</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="flex flex-col items-center justify-center h-16 border-gaming-primary/50 hover:bg-gaming-primary/10"
                      onClick={handleShare}
                    >
                      <Share className="h-5 w-5 mb-1" />
                      <span className="text-xs">Share</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="flex flex-col items-center justify-center h-16 border-gaming-primary/50 hover:bg-gaming-primary/10"
                    >
                      <Star className="h-5 w-5 mb-1" />
                      <span className="text-xs">Rate</span>
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gaming-card rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">How to Play</h3>
                  <p className="text-sm text-gaming-muted">Use your mouse and keyboard to control the game. Click the fullscreen button for the best experience.</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Comments */}
          <section className="mb-12">
            <CommentSection gameId={id || ''} comments={comments} />
          </section>
          
          {/* Related Games */}
          <section>
            <RelatedGames 
              currentGameId={id || ''}
              category={game.category}
              games={allGames}
            />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GameDetail;
