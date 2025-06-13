
import React, { useState } from 'react';
import { Search, Music, Headphones, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
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
      thumbnail: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Imagine",
      artist: "John Lennon",
      genre: "Pop",
      difficulty: "Easy",
      duration: "3:03",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Hotel California",
      artist: "Eagles",
      genre: "Rock",
      difficulty: "Medium",
      duration: "6:30",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Billie Jean",
      artist: "Michael Jackson",
      genre: "Pop",
      difficulty: "Medium",
      duration: "4:54",
      thumbnail: "/placeholder.svg"
    }
  ];

  const handleSongSelect = (song: any) => {
    navigate(`/typing/${song.id}`, { state: { song } });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for songs, artists, or genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Genre Selection */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Choose Your Genre</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {genres.map((genre) => (
              <Card key={genre.name} className="bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer backdrop-blur-sm">
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

        {/* Featured Songs */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">Featured Songs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSongs.map((song) => (
              <Card key={song.id} className="bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer backdrop-blur-sm group">
                <CardHeader className="pb-3">
                  <div className="relative mb-4">
                    <img 
                      src={song.thumbnail} 
                      alt={song.title}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        onClick={() => handleSongSelect(song)}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Start Typing
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-white text-lg">{song.title}</CardTitle>
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
