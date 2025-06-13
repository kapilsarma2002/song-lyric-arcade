
import React, { useState } from 'react';
import { Search, Music, Headphones, Play, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const genres = [
    { name: 'Pop', icon: '🎵', color: 'bg-pink-500' },
    { name: 'Rock', icon: '🎸', color: 'bg-red-500' },
    { name: 'Hip Hop', icon: '🎤', color: 'bg-yellow-500' },
    { name: 'Classical', icon: '🎼', color: 'bg-blue-500' },
    { name: 'Jazz', icon: '🎺', color: 'bg-purple-500' },
    { name: 'Electronic', icon: '🎛️', color: 'bg-green-500' },
  ];

  const featuredSongs = [
    {
      id: 1,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      genre: "Rock",
      difficulty: "Hard",
      duration: "5:55",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      videoId: "fJ9rUzIMcZQ",
      lyrics: "Is this the real life? Is this just fantasy? Caught in a landslide, no escape from reality. Open your eyes, look up to the skies and see. I'm just a poor boy, I need no sympathy. Because I'm easy come, easy go, little high, little low. Any way the wind blows doesn't really matter to me, to me."
    },
    {
      id: 2,
      title: "Imagine",
      artist: "John Lennon",
      genre: "Pop",
      difficulty: "Easy",
      duration: "3:03",
      thumbnail: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=400&h=300&fit=crop",
      videoId: "YkgkThdzX-8",
      lyrics: "Imagine there's no heaven, it's easy if you try. No hell below us, above us only sky.Imagine all the people living for today."
    },
    {
      id: 3,
      title: "Hotel California",
      artist: "Eagles",
      genre: "Rock",
      difficulty: "Medium",
      duration: "6:30",
      thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop",
      videoId: "BciS5krYL80",
      lyrics: "On a dark desert highway, cool wind in my hair. Warm smell of colitas, rising up through the air. Up ahead in the distance, I saw a shimmering light. My head grew heavy and my sight grew dim, I had to stop for the night."
    },
    {
      id: 4,
      title: "Billie Jean",
      artist: "Michael Jackson",
      genre: "Pop",
      difficulty: "Medium",
      duration: "4:54",
      thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
      videoId: "Zi_XLOBDo_Y",
      lyrics: "She was more like a beauty queen from a movie scene. I said don't mind, but what do you mean, I am the one. Who will dance on the floor in the round. She said I am the one, who will dance on the floor in the round."
    }
  ];

  const searchYouTube = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, you would make an API call to YouTube Data API v3
      // For now, using an expanded mock response with more videos
      const mockResults = [
        {
          id: `search-${Date.now()}-1`,
          title: `${query} - Official Music Video`,
          artist: "Various Artists",
          genre: "Pop",
          difficulty: "Medium",
          duration: "3:45",
          thumbnail: `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&q=80`,
          videoId: "dQw4w9WgXcQ",
          lyrics: "Never gonna give you up, never gonna let you down. Never gonna run around and desert you. Never gonna make you cry, never gonna say goodbye. Never gonna tell a lie and hurt you."
        },
        {
          id: `search-${Date.now()}-2`,
          title: `${query} (Lyrics)`,
          artist: "Lyric Channel",
          genre: "Pop",
          difficulty: "Easy",
          duration: "4:12",
          thumbnail: `https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=400&h=300&fit=crop&q=80`,
          videoId: "L_jWHffIx5E",
          lyrics: "Somebody once told me the world is gonna roll me. I ain't the sharpest tool in the shed. She was looking kind of dumb with her finger and her thumb in the shape of an 'L' on her forehead."
        },
        {
          id: `search-${Date.now()}-3`,
          title: `${query} - Live Performance`,
          artist: "Live Music",
          genre: "Rock",
          difficulty: "Medium",
          duration: "5:20",
          thumbnail: `https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop&q=80`,
          videoId: "kJQP7kiw5Fk",
          lyrics: "Despacito, Quiero respirar tu cuello despacito. Deja que te diga cosas al oído. Para que te acuerdes si no estás conmigo."
        },
        {
          id: `search-${Date.now()}-4`,
          title: `${query} - Cover Version`,
          artist: "Cover Artist",
          genre: "Pop",
          difficulty: "Hard",
          duration: "3:30",
          thumbnail: `https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop&q=80`,
          videoId: "9bZkp7q19f0",
          lyrics: "Oppa Gangnam Style, Gangnam Style. Najeneun danshin naja ittaegeuriya. Keopi sikgido jeone one-shot deo hage. Yeoreum boda deo deoun one-shot."
        },
        {
          id: `search-${Date.now()}-5`,
          title: `${query} - Acoustic Version`,
          artist: "Acoustic Channel",
          genre: "Folk",
          difficulty: "Easy",
          duration: "4:05",
          thumbnail: `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&q=80`,
          videoId: "JGwWNGJdvx8",
          lyrics: "I'm in love with the shape of you. We push and pull like a magnet do. Although my heart is falling too. I'm in love with your body."
        },
        {
          id: `search-${Date.now()}-6`,
          title: `${query} - Remix`,
          artist: "DJ Remix",
          genre: "Electronic",
          difficulty: "Medium",
          duration: "6:15",
          thumbnail: `https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=400&h=300&fit=crop&q=80`,
          videoId: "y6120QOlsfU",
          lyrics: "Darude - Sandstorm instrumental"
        }
      ];

      // Simulate API call delay
      setTimeout(() => {
        setSearchResults(mockResults);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching YouTube data:", error);
      setIsLoading(false);
    }
  };

  const displaySongs = searchResults.length > 0 ? searchResults : featuredSongs;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">LyricType</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Headphones className="w-6 h-6 text-white/70" />
              <span className="text-white/70">Ready to type</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Search Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            Type to the Beat
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Improve your typing skills while enjoying your favorite songs
          </p>
          
          <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for songs, artists, or genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm"
            />
            {isLoading && (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 animate-spin" />
            )}
          </form>
        </div>

        {/* Genre Selection */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Choose Your Genre</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {genres.map((genre) => (
              <Card key={genre.name} className="bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer backdrop-blur-sm hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 ${genre.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <span className="text-2xl">{genre.icon}</span>
                  </div>
                  <h4 className="font-semibold text-white">{genre.name}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Songs Section */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">
            {searchResults.length > 0 ? 'Search Results' : 'Featured Songs'}
          </h3>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
              <span className="ml-2 text-white">Searching...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displaySongs.map((song) => (
                <Card key={song.id} className="bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer backdrop-blur-sm group hover:scale-105">
                  <CardHeader className="pb-3">
                    <div className="relative mb-4 overflow-hidden rounded-lg">
                      <img 
                        src={song.thumbnail} 
                        alt={song.title}
                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          onClick={() => handleSongSelect(song)}
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20"
                        >
                          <Play className="w-5 h-5 mr-2" />
                          Start Typing
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-white text-lg line-clamp-1">{song.title}</CardTitle>
                    <CardDescription className="text-white/70">{song.artist}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {song.genre}
                        </Badge>
                        <Badge variant="secondary" className={getDifficultyColor(song.difficulty)}>
                          {song.difficulty}
                        </Badge>
                      </div>
                      <span className="text-white/60 text-sm">{song.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
