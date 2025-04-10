
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Eye } from 'lucide-react';

interface GameCardProps {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  rating: number;
  plays: number;
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  thumbnail,
  category,
  rating,
  plays
}) => {
  return (
    <Link to={`/game/${id}`} className="game-card block group">
      <div className="relative overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          <span className="game-tag">{category}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="game-title truncate mb-2 group-hover:text-gaming-primary transition-colors">
          {title}
        </h3>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
            <span className="text-sm text-gaming-muted">{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center space-x-1 text-gaming-muted">
            <Eye className="w-4 h-4" />
            <span className="text-sm">{plays >= 1000 ? `${(plays / 1000).toFixed(1)}k` : plays}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
