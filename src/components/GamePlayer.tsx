
import React, { useState } from 'react';
import { Fullscreen, Minimize, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GamePlayerProps {
  gameUrl: string;
  title: string;
}

const GamePlayer: React.FC<GamePlayerProps> = ({ gameUrl, title }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative overflow-hidden neon-border rounded-lg ${
      isFullscreen ? 'fixed inset-0 z-50 bg-gaming-bg' : ''
    }`}>
      {/* Game controls */}
      <div className="flex justify-between items-center p-3 bg-gaming-card border-b border-gaming-primary/20">
        <h3 className="font-medium text-gaming-text">{title}</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFullscreen}
          className="text-gaming-muted hover:text-gaming-primary"
        >
          {isFullscreen ? <Minimize size={18} /> : <Fullscreen size={18} />}
        </Button>
      </div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gaming-bg z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-gaming-primary/30 border-t-gaming-primary rounded-full animate-spin mb-4"></div>
            <p className="text-gaming-muted">Loading game...</p>
          </div>
        </div>
      )}
      
      {/* Game iframe */}
      <div className={`w-full ${isFullscreen ? 'h-[calc(100%-48px)]' : 'aspect-video'}`}>
        <iframe
          src={gameUrl}
          title={title}
          className="w-full h-full border-0"
          allowFullScreen
          onLoad={handleIframeLoad}
        ></iframe>
      </div>
      
      {/* Maximize button for mobile */}
      {!isFullscreen && (
        <button 
          className="absolute bottom-4 right-4 md:hidden bg-gaming-primary/80 backdrop-blur-sm p-2 rounded-full text-white hover:bg-gaming-primary transition-colors"
          onClick={toggleFullscreen}
        >
          <Maximize2 size={20} />
        </button>
      )}
    </div>
  );
};

export default GamePlayer;
