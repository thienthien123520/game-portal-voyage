
// Mock data for the game portal
export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  banner?: string;
  category: string;
  tags: string[];
  rating: number;
  plays: number;
  gameUrl: string;
  featured?: boolean;
  releaseDate: string;
}

export interface Comment {
  id: string;
  userName: string;
  userAvatar?: string;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
  replies?: Comment[];
}

// Mock games data
const games: Game[] = [
  {
    id: 'racing-thunder',
    title: 'Racing Thunder',
    description: 'Experience high-speed racing with stunning graphics and challenging tracks. Compete against AI opponents or challenge your friends in multiplayer mode.',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
    banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
    category: 'Racing',
    tags: ['Racing', '3D', 'Multiplayer', 'Action'],
    rating: 4.7,
    plays: 12500,
    gameUrl: 'https://games.construct.net/649/latest',
    featured: true,
    releaseDate: '2023-04-15'
  },
  {
    id: 'castle-defense',
    title: 'Castle Defense',
    description: 'Build your fortress, train your army, and defend against waves of enemies in this strategic tower defense game.',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    banner: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    category: 'Strategy',
    tags: ['Strategy', 'Tower Defense', 'Medieval', 'War'],
    rating: 4.5,
    plays: 8700,
    gameUrl: 'https://games.construct.net/41/latest',
    featured: true,
    releaseDate: '2023-05-23'
  },
  {
    id: 'puzzle-quest',
    title: 'Puzzle Quest',
    description: 'Solve increasingly challenging puzzles in this mind-bending adventure that tests your logical thinking and problem-solving skills.',
    thumbnail: 'https://images.unsplash.com/photo-1614680376739-414d95ff43df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    banner: 'https://images.unsplash.com/photo-1614680376739-414d95ff43df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    category: 'Puzzle',
    tags: ['Puzzle', 'Logic', 'Adventure', 'Brain Training'],
    rating: 4.3,
    plays: 6300,
    gameUrl: 'https://games.construct.net/43/latest',
    featured: true,
    releaseDate: '2023-03-10'
  },
  {
    id: 'zombie-survival',
    title: 'Zombie Survival',
    description: 'Survive in a post-apocalyptic world overrun by zombies. Scavenge for supplies, build your base, and fight off hordes of the undead.',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1748&q=80',
    category: 'Action',
    tags: ['Action', 'Survival', 'Horror', 'Zombies'],
    rating: 4.6,
    plays: 15000,
    gameUrl: 'https://games.construct.net/1259/latest',
    releaseDate: '2023-01-18'
  },
  {
    id: 'space-adventure',
    title: 'Space Adventure',
    description: 'Explore the vast universe, discover alien planets, and complete exciting missions in this space-themed adventure game.',
    thumbnail: 'https://images.unsplash.com/photo-1581822261290-991df61a7da2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Adventure',
    tags: ['Adventure', 'Space', 'Exploration', 'Sci-Fi'],
    rating: 4.2,
    plays: 7800,
    gameUrl: 'https://games.construct.net/678/latest',
    releaseDate: '2023-02-25'
  },
  {
    id: 'retro-arcade',
    title: 'Retro Arcade',
    description: 'Experience the nostalgia of classic arcade games with modern twists. Perfect for quick gaming sessions.',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
    category: 'Arcade',
    tags: ['Arcade', 'Retro', 'Classic', 'Pixel Art'],
    rating: 4.0,
    plays: 9200,
    gameUrl: 'https://games.construct.net/1334/latest',
    releaseDate: '2022-12-05'
  },
  {
    id: 'soccer-stars',
    title: 'Soccer Stars',
    description: 'Lead your team to victory in this exciting soccer simulation game. Play quick matches or enter tournaments.',
    thumbnail: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
    category: 'Sports',
    tags: ['Sports', 'Soccer', 'Multiplayer', 'Team'],
    rating: 4.4,
    plays: 11000,
    gameUrl: 'https://games.construct.net/276/latest',
    releaseDate: '2023-06-12'
  },
  {
    id: 'word-master',
    title: 'Word Master',
    description: 'Test your vocabulary and word-finding skills in this challenging word puzzle game with multiple game modes.',
    thumbnail: 'https://images.unsplash.com/photo-1595561629460-3f885c675510?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=724&q=80',
    category: 'Puzzle',
    tags: ['Puzzle', 'Word', 'Educational', 'Brain Training'],
    rating: 4.1,
    plays: 6800,
    gameUrl: 'https://games.construct.net/159/latest',
    releaseDate: '2023-04-02'
  }
];

// Mock comments data
const comments: Record<string, Comment[]> = {
  'racing-thunder': [
    {
      id: '1',
      userName: 'SpeedDemon',
      content: 'This game is amazing! The controls are responsive and the graphics are top-notch. I especially love the desert track.',
      date: '2023-08-15',
      likes: 24,
      dislikes: 2,
      replies: [
        {
          id: '1-1',
          userName: 'RacingFan22',
          content: 'Agree! Have you tried the multiplayer mode yet?',
          date: '2023-08-15',
          likes: 5,
          dislikes: 0
        }
      ]
    },
    {
      id: '2',
      userName: 'GameMaster',
      content: 'Great game but I think the difficulty curve is a bit steep. Took me a while to get used to the controls.',
      date: '2023-08-10',
      likes: 13,
      dislikes: 4
    }
  ],
  'castle-defense': [
    {
      id: '1',
      userName: 'StrategyKing',
      content: 'One of the best tower defense games I\'ve played! Love the variety of units and the progression system.',
      date: '2023-08-12',
      likes: 18,
      dislikes: 1
    }
  ]
};

// Game service functions
export const getAllGames = (): Promise<Game[]> => {
  return Promise.resolve(games);
};

export const getFeaturedGames = (): Promise<Game[]> => {
  return Promise.resolve(games.filter(game => game.featured));
};

export const getGamesByCategory = (category: string): Promise<Game[]> => {
  return Promise.resolve(games.filter(game => 
    game.category.toLowerCase() === category.toLowerCase()
  ));
};

export const getGameById = (id: string): Promise<Game | undefined> => {
  return Promise.resolve(games.find(game => game.id === id));
};

export const getRelatedGames = (gameId: string, category: string): Promise<Game[]> => {
  return Promise.resolve(
    games.filter(game => 
      game.id !== gameId && 
      (game.category === category || game.tags.includes(category))
    ).slice(0, 4)
  );
};

export const getPopularGames = (): Promise<Game[]> => {
  return Promise.resolve([...games].sort((a, b) => b.plays - a.plays).slice(0, 8));
};

export const getGameComments = (gameId: string): Promise<Comment[]> => {
  return Promise.resolve(comments[gameId] || []);
};

export const searchGames = (query: string): Promise<Game[]> => {
  const lowerQuery = query.toLowerCase();
  return Promise.resolve(
    games.filter(game => 
      game.title.toLowerCase().includes(lowerQuery) || 
      game.description.toLowerCase().includes(lowerQuery) || 
      game.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  );
};
