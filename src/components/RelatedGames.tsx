
import React from 'react';
import GameCard from './GameCard';

interface Game {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  rating: number;
  plays: number;
}

interface RelatedGamesProps {
  currentGameId: string;
  category: string;
  games: Game[];
}

const RelatedGames: React.FC<RelatedGamesProps> = ({ currentGameId, category, games }) => {
  // Filter out current game and get games from the same category
  const relatedGames = games
    .filter(game => game.id !== currentGameId && game.category === category)
    .slice(0, 4);

  // If not enough games from the same category, add other popular games
  const otherGames = games
    .filter(game => game.id !== currentGameId && game.category !== category)
    .slice(0, 4 - relatedGames.length);

  const allRelatedGames = [...relatedGames, ...otherGames];

  return (
    <div>
      <h3 className="section-title">Related Games</h3>
      
      {allRelatedGames.length === 0 ? (
        <div className="text-center py-8 text-gaming-muted">
          No related games found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allRelatedGames.map(game => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedGames;
