
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

/**
 * The DEBUG flag will do two things:
 * 1. we will skip caching on the edge, which makes it easier to debug
 * 2. we will return an error message on exception in your Response rather than the default 500
 */
const DEBUG = false;

/**
 * Handle incoming requests to serve static assets or API endpoints
 */
addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      );
    }
    event.respondWith(new Response('Internal Error', { status: 500 }));
  }
});

/**
 * Handle requests by serving static assets or processing API calls
 */
async function handleEvent(event) {
  const url = new URL(event.request.url);
  
  // API endpoint handling
  if (url.pathname.startsWith('/api/')) {
    return handleApiRequest(event.request, url);
  }

  // Serve static assets
  try {
    let options = {};
    return await getAssetFromKV(event, options);
  } catch (e) {
    // Fall back to the index page for client-side routing
    try {
      let notFoundResponse = await getAssetFromKV(event, {
        mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req),
      });

      return new Response(notFoundResponse.body, {
        ...notFoundResponse,
        status: 200,
      });
    } catch (e) {
      return new Response('Not Found', { status: 404 });
    }
  }
}

/**
 * Handle API requests with a headless API
 */
async function handleApiRequest(request, url) {
  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle OPTIONS requests (CORS preflight)
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  // Handle API endpoints
  const endpoint = url.pathname.replace('/api/', '');

  switch (endpoint) {
    case 'games': 
      return handleGamesEndpoint(request, corsHeaders);
    case 'game':
      return handleGameEndpoint(request, corsHeaders, url.searchParams);
    case 'comments':
      return handleCommentsEndpoint(request, corsHeaders, url.searchParams);
    default:
      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
  }
}

/**
 * Handle the games endpoint to get all games
 */
async function handleGamesEndpoint(request, corsHeaders) {
  // Mock data from gameService
  const games = [
    {
      id: 'geometry-dash-wave',
      title: 'Geometry Dash Wave',
      description: 'Ride the wave and avoid obstacles in this challenging rhythm-based game. Test your reflexes as you navigate through increasingly difficult levels set to energetic music.',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
      banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
      category: 'Arcade',
      tags: ['Rhythm', 'Platformer', 'Challenge', 'Wave'],
      rating: 4.8,
      plays: 24689,
      gameUrl: 'https://scratch.mit.edu/projects/105500895/embed',
      featured: true,
      releaseDate: '2023-04-15'
    }
  ];

  return new Response(JSON.stringify(games), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

/**
 * Handle the game endpoint to get a single game by ID
 */
async function handleGameEndpoint(request, corsHeaders, params) {
  const gameId = params.get('id');
  
  if (!gameId) {
    return new Response(JSON.stringify({ error: 'Game ID is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }

  // Mock data for Geometry Dash Wave
  if (gameId === 'geometry-dash-wave') {
    const game = {
      id: 'geometry-dash-wave',
      title: 'Geometry Dash Wave',
      description: 'Ride the wave and avoid obstacles in this challenging rhythm-based game. Test your reflexes as you navigate through increasingly difficult levels set to energetic music.',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
      banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
      category: 'Arcade',
      tags: ['Rhythm', 'Platformer', 'Challenge', 'Wave'],
      rating: 4.8,
      plays: 24689,
      gameUrl: 'https://scratch.mit.edu/projects/105500895/embed',
      featured: true,
      releaseDate: '2023-04-15'
    };

    return new Response(JSON.stringify(game), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }

  return new Response(JSON.stringify({ error: 'Game not found' }), {
    status: 404,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

/**
 * Handle the comments endpoint to get comments for a game
 */
async function handleCommentsEndpoint(request, corsHeaders, params) {
  const gameId = params.get('gameId');
  
  if (!gameId) {
    return new Response(JSON.stringify({ error: 'Game ID is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }

  // Mock comments data for Geometry Dash Wave
  if (gameId === 'geometry-dash-wave') {
    const comments = [
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

    return new Response(JSON.stringify(comments), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }

  return new Response(JSON.stringify([]), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}
