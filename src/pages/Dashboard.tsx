
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
  const [selectedGenre, setSelectedGenre] = useState('');
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
      thumbnail: "https://img.youtube.com/vi/fJ9rUzIMcZQ/maxresdefault.jpg",
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
      thumbnail: "https://img.youtube.com/vi/YkgkThdzX-8/maxresdefault.jpg",
      videoId: "YkgkThdzX-8",
      lyrics: "Imagine there's no heaven, it's easy if you try. No hell below us, above us only sky. Imagine all the people living for today."
    },
    {
      id: 3,
      title: "Hotel California",
      artist: "Eagles",
      genre: "Rock",
      difficulty: "Medium",
      duration: "6:30",
      thumbnail: "https://img.youtube.com/vi/BciS5krYL80/maxresdefault.jpg",
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
      thumbnail: "https://img.youtube.com/vi/Zi_XLOBDo_Y/maxresdefault.jpg",
      videoId: "Zi_XLOBDo_Y",
      lyrics: "She was more like a beauty queen from a movie scene. I said don't mind, but what do you mean, I am the one. Who will dance on the floor in the round. She said I am the one, who will dance on the floor in the round."
    }
  ];

  const topSongsByGenre = {
    'Pop': [
      {
        id: 'pop-1',
        title: "Shape of You",
        artist: "Ed Sheeran",
        genre: "Pop",
        difficulty: "Easy",
        duration: "3:53",
        thumbnail: "https://img.youtube.com/vi/JGwWNGJdvx8/maxresdefault.jpg",
        videoId: "JGwWNGJdvx8",
        lyrics: "I'm in love with the shape of you. We push and pull like a magnet do. Although my heart is falling too. I'm in love with your body."
      },
      {
        id: 'pop-2',
        title: "Blinding Lights",
        artist: "The Weeknd",
        genre: "Pop",
        difficulty: "Medium",
        duration: "3:20",
        thumbnail: "https://img.youtube.com/vi/4NRXx6U8ABQ/maxresdefault.jpg",
        videoId: "4NRXx6U8ABQ",
        lyrics: "I've been tryna call, I've been on my own for long enough. Maybe you can show me how to love, maybe. I feel like I'm just missing something when you're gone."
      },
      {
        id: 'pop-3',
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        genre: "Pop",
        difficulty: "Easy",
        duration: "2:54",
        thumbnail: "https://img.youtube.com/vi/E07s5ZYygMg/maxresdefault.jpg",
        videoId: "E07s5ZYygMg",
        lyrics: "Tastes like strawberries on a summer evenin'. And it sounds just like a song. I want more berries and that summer feelin'. It's so wonderful and warm."
      }
    ],
    'Rock': [
      {
        id: 'rock-1',
        title: "Sweet Child O' Mine",
        artist: "Guns N' Roses",
        genre: "Rock",
        difficulty: "Hard",
        duration: "5:03",
        thumbnail: "https://img.youtube.com/vi/1w7OgIMMRc4/maxresdefault.jpg",
        videoId: "1w7OgIMMRc4",
        lyrics: "She's got a smile that it seems to me reminds me of childhood memories. Where everything was as fresh as the bright blue sky."
      },
      {
        id: 'rock-2',
        title: "Don't Stop Believin'",
        artist: "Journey",
        genre: "Rock",
        difficulty: "Medium",
        duration: "4:09",
        thumbnail: "https://img.youtube.com/vi/1k8craCGpgs/maxresdefault.jpg",
        videoId: "1k8craCGpgs",
        lyrics: "Just a small town girl, livin' in a lonely world. She took the midnight train goin' anywhere. Just a city boy, born and raised in South Detroit."
      }
    ],
    'Hip Hop': [
      {
        id: 'hiphop-1',
        title: "God's Plan",
        artist: "Drake",
        genre: "Hip Hop",
        difficulty: "Medium",
        duration: "3:19",
        thumbnail: "https://img.youtube.com/vi/xpVfcZ0ZcFM/maxresdefault.jpg",
        videoId: "xpVfcZ0ZcFM",
        lyrics: "And they wishin' and wishin' and wishin' and wishin'. They wishin' on me, yeah. I been movin' calm, don't start no trouble with me."
      },
      {
        id: 'hiphop-2',
        title: "HUMBLE.",
        artist: "Kendrick Lamar",
        genre: "Hip Hop",
        difficulty: "Hard",
        duration: "2:57",
        thumbnail: "https://img.youtube.com/vi/tvTRZJ-4EyI/maxresdefault.jpg",
        videoId: "tvTRZJ-4EyI",
        lyrics: "Nobody pray for me, it's been that day for me. Way, yeah, way, yeah, way, yeah. I remember syrup sandwiches and crime allowances."
      }
    ],
    'Classical': [
      {
        id: 'classical-1',
        title: "Canon in D",
        artist: "Pachelbel",
        genre: "Classical",
        difficulty: "Medium",
        duration: "4:24",
        thumbnail: "https://img.youtube.com/vi/NlprozGcs80/maxresdefault.jpg",
        videoId: "NlprozGcs80",
        lyrics: "Instrumental piece - focus on the melodic patterns and harmonies."
      }
    ],
    'Jazz': [
      {
        id: 'jazz-1',
        title: "Take Five",
        artist: "Dave Brubeck",
        genre: "Jazz",
        difficulty: "Hard",
        duration: "5:24",
        thumbnail: "https://img.youtube.com/vi/vmDDOFXSgAs/maxresdefault.jpg",
        videoId: "vmDDOFXSgAs",
        lyrics: "Instrumental jazz piece in 5/4 time signature."
      }
    ],
    'Electronic': [
      {
        id: 'electronic-1',
        title: "Levels",
        artist: "Avicii",
        genre: "Electronic",
        difficulty: "Medium",
        duration: "3:18",
        thumbnail: "https://img.youtube.com/vi/_ovdm2yX4MA/maxresdefault.jpg",
        videoId: "_ovdm2yX4MA",
        lyrics: "Sometimes I get a good feeling, Yeah. I get a feeling that I never never never never had before, no no."
      }
    ]
  };

  const topSongs = [
    {
      id: 'top-1',
      title: "As It Was",
      artist: "Harry Styles",
      genre: "Pop",
      difficulty: "Easy",
      duration: "2:47",
      thumbnail: "https://img.youtube.com/vi/H5v3kku4y6Q/maxresdefault.jpg",
      videoId: "H5v3kku4y6Q",
      lyrics: "Holdin' me back, gravity's holdin' me back. I want you to hold out the palm of your hand. Why don't we leave it at that? Nothin' to say when everything gets in the way."
    },
    {
      id: 'top-2',
      title: "Anti-Hero",
      artist: "Taylor Swift",
      genre: "Pop",
      difficulty: "Medium",
      duration: "3:20",
      thumbnail: "https://img.youtube.com/vi/b1kbLWvqugk/maxresdefault.jpg",
      videoId: "b1kbLWvqugk",
      lyrics: "I have this thing where I get older but just never wiser. Midnights become my afternoons. When my depression works the graveyard shift, all of the people I've ghosted stand there in the room."
    },
    {
      id: 'top-3',
      title: "Bad Habit",
      artist: "Steve Lacy",
      genre: "Pop",
      difficulty: "Easy",
      duration: "3:51",
      thumbnail: "https://img.youtube.com/vi/VF-r5TtlT9w/maxresdefault.jpg",
      videoId: "VF-r5TtlT9w",
      lyrics: "I wish I knew you wanted me. I wish I knew, I wish I knew you wanted me. I wish I knew, I wish I knew you wanted me."
    },
    {
      id: 'top-4',
      title: "Heat Wave",
      artist: "Glass Animals",
      genre: "Electronic",
      difficulty: "Medium",
      duration: "3:58",
      thumbnail: "https://img.youtube.com/vi/mRD0-GxqHVo/maxresdefault.jpg",
      videoId: "mRD0-GxqHVo",
      lyrics: "Sometimes all I think about is you. Late nights in the middle of June. Heat waves been fakin' me out, can't make you happier now."
    }
  ];

  const allSongs = [
    ...featuredSongs,
    ...Object.values(topSongsByGenre).flat(),
    ...topSongs,
    // Add the Zayn song that should appear for "entertainer" search
    {
      id: 'zayn-entertainer',
      title: "Entertainer",
      artist: "Zayn",
      genre: "Pop",
      difficulty: "Medium",
      duration: "3:23",
      thumbnail: "https://img.youtube.com/vi/qaCkufLHHgk/maxresdefault.jpg",
      videoId: "qaCkufLHHgk",
      lyrics: "You got, you got the cinema. I could watch you forever. Action, thriller, I could watch you forever."
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with improved search logic
    setTimeout(() => {
      const query = searchQuery.toLowerCase().trim();
      
      // Remove duplicates by creating a Map with song id as key
      const uniqueSongs = new Map();
      allSongs.forEach(song => {
        if (!uniqueSongs.has(song.id)) {
          uniqueSongs.set(song.id, song);
        }
      });
      
      const songsArray = Array.from(uniqueSongs.values());
      
      // Search and prioritize results - only search in title, artist, and genre
      const results = songsArray
        .map(song => {
          let score = 0;
          const titleLower = song.title.toLowerCase();
          const artistLower = song.artist.toLowerCase();
          const genreLower = song.genre.toLowerCase();
          
          // Exact title match gets highest priority
          if (titleLower === query) {
            score += 1000;
          }
          // Title starts with query gets high priority
          else if (titleLower.startsWith(query)) {
            score += 500;
          }
          // Title contains query gets medium priority
          else if (titleLower.includes(query)) {
            score += 200;
          }
          
          // Exact artist match
          if (artistLower === query) {
            score += 100;
          }
          // Artist starts with query
          else if (artistLower.startsWith(query)) {
            score += 80;
          }
          // Artist contains query
          else if (artistLower.includes(query)) {
            score += 50;
          }
          
          // Genre matches
          if (genreLower === query) {
            score += 30;
          }
          else if (genreLower.includes(query)) {
            score += 15;
          }
          
          return { song, score };
        })
        .filter(item => item.score > 0)  // Only include matches
        .sort((a, b) => b.score - a.score)  // Sort by score descending
        .slice(0, 12)  // Limit results
        .map(item => item.song);
      
      setSearchResults(results);
      setSelectedGenre('');
      setIsLoading(false);
    }, 1000);
  };

  const handleGenreClick = (genreName: string) => {
    setSelectedGenre(genreName);
    setSearchResults([]);
    setSearchQuery('');
  };

  const handleSongSelect = (song: any) => {
    navigate(`/typing/${song.id}`, { state: { song } });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDisplaySongs = () => {
    if (searchResults.length > 0) return searchResults;
    if (selectedGenre && topSongsByGenre[selectedGenre]) return topSongsByGenre[selectedGenre];
    return featuredSongs;
  };

  const getSectionTitle = () => {
    if (searchResults.length > 0) return 'Top Songs';
    if (selectedGenre) return `Top ${selectedGenre} Songs`;
    return 'Featured Songs';
  };

  const displaySongs = getDisplaySongs();

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
              <Card 
                key={genre.name} 
                className={`bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer backdrop-blur-sm hover:scale-105 ${
                  selectedGenre === genre.name ? 'ring-2 ring-purple-400 bg-white/20' : ''
                }`}
                onClick={() => handleGenreClick(genre.name)}
              >
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
            {getSectionTitle()}
          </h3>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
              <span className="ml-2 text-white">Loading...</span>
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
