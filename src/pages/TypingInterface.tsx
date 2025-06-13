
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, Award, Clock, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const TypingInterface = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { song } = location.state || {};
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number>();

  // Sample lyrics (in a real app, this would come from an API)
  const sampleLyrics = "Is this the real life? Is this just fantasy? Caught in a landslide, no escape from reality. Open your eyes, look up to the skies and see. I'm just a poor boy, I need no sympathy. Because I'm easy come, easy go, little high, little low. Any way the wind blows doesn't really matter to me, to me.";
  
  // Use the video ID from the song data, fallback to Bohemian Rhapsody
  const youtubeVideoId = song?.videoId || "fJ9rUzIMcZQ";

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const currentChar = sampleLyrics[currentCharIndex];
    const typedChar = value[value.length - 1];

    if (value.length > typedText.length) {
      // User typed a new character
      if (typedChar === currentChar) {
        // Correct character
        setCurrentCharIndex(prev => prev + 1);
        setTypedText(value);
        
        // Check if completed
        if (currentCharIndex + 1 >= sampleLyrics.length) {
          setIsCompleted(true);
          setIsPlaying(false);
        }
      } else {
        // Incorrect character
        setErrors(prev => prev + 1);
        // Don't update typedText or currentCharIndex for wrong characters
        return;
      }
    } else {
      // User deleted a character
      setCurrentCharIndex(Math.max(0, currentCharIndex - 1));
      setTypedText(value);
    }

    // Calculate progress
    const newProgress = ((currentCharIndex + 1) / sampleLyrics.length) * 100;
    setProgress(newProgress);
    
    // Calculate WPM (assuming average word length of 5 characters)
    const wordsTyped = (currentCharIndex + 1) / 5;
    const minutes = timeElapsed / 60;
    setWpm(minutes > 0 ? Math.round(wordsTyped / minutes) : 0);

    // Calculate accuracy
    const totalAttempts = currentCharIndex + 1 + errors;
    setAccuracy(totalAttempts > 0 ? Math.round(((currentCharIndex + 1) / totalAttempts) * 100) : 100);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTyping = () => {
    setCurrentCharIndex(0);
    setTypedText('');
    setWpm(0);
    setAccuracy(100);
    setProgress(0);
    setTimeElapsed(0);
    setIsPlaying(false);
    setIsCompleted(false);
    setErrors(0);
  };

  const getCharClassName = (index: number) => {
    if (index < currentCharIndex) return 'text-green-400 bg-green-400/20 shadow-sm';
    if (index === currentCharIndex) return 'text-yellow-400 bg-yellow-400/30 animate-pulse shadow-lg';
    return 'text-white/50';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!song) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">No song selected</p>
          <Button onClick={() => navigate('/')} className="bg-purple-600 hover:bg-purple-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/30 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <h1 className="text-xl font-bold text-white">{song.title}</h1>
                <p className="text-white/70">{song.artist}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <Volume2 className="w-5 h-5 text-white/70" />
              <span className="text-white font-mono">{formatTime(timeElapsed)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <Progress value={progress} className="h-3 bg-white/20 mb-4" />
            <div className="flex justify-between text-sm text-white/80">
              <span className="font-semibold">{Math.round(progress)}% Complete</span>
              <span className="font-mono">{currentCharIndex} / {sampleLyrics.length} characters</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            onClick={togglePlayPause}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          
          <Button
            onClick={resetTyping}
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* YouTube Video */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-md shadow-2xl hover:shadow-3xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Now Playing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=${isPlaying ? 1 : 0}&mute=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </CardContent>
          </Card>

          {/* Analytics - Only show when completed */}
          {isCompleted ? (
            <Card className="bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-400/30 backdrop-blur-md shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="w-6 h-6 mr-2 text-yellow-400" />
                  Congratulations! 🎉
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center bg-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold text-green-400 flex items-center justify-center">
                      <Zap className="w-8 h-8 mr-2" />
                      {wpm}
                    </div>
                    <div className="text-white/70">WPM</div>
                  </div>
                  <div className="text-center bg-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold text-blue-400 flex items-center justify-center">
                      <Target className="w-8 h-8 mr-2" />
                      {accuracy}%
                    </div>
                    <div className="text-white/70">Accuracy</div>
                  </div>
                  <div className="text-center bg-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold text-purple-400 flex items-center justify-center">
                      <Clock className="w-8 h-8 mr-2" />
                      {formatTime(timeElapsed)}
                    </div>
                    <div className="text-white/70">Time</div>
                  </div>
                  <div className="text-center bg-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold text-red-400">{errors}</div>
                    <div className="text-white/70">Errors</div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Button
                    onClick={resetTyping}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/10 border-white/20 backdrop-blur-md shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Live Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-2xl font-bold text-white">{wpm}</div>
                    <div className="text-white/70">WPM</div>
                  </div>
                  <div className="text-center bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-2xl font-bold text-white">{accuracy}%</div>
                    <div className="text-white/70">Accuracy</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Lyrics Display */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-md mt-8 mb-6 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">Lyrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg leading-relaxed mb-6 font-mono bg-black/20 rounded-xl p-6 border border-white/10">
              {sampleLyrics.split('').map((char, index) => (
                <span key={index} className={`${getCharClassName(index)} transition-all duration-200 px-0.5 py-0.5 rounded`}>
                  {char}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Typing Input */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-md shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">Type Here</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <input
                ref={inputRef}
                type="text"
                value={typedText}
                onChange={handleInputChange}
                className="w-full p-6 text-lg bg-black/20 border border-white/30 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono backdrop-blur-sm shadow-inner transition-all duration-300"
                placeholder="Start typing the lyrics..."
                disabled={!isPlaying || isCompleted}
              />
              <p className="text-sm text-white/60 bg-white/5 rounded-lg p-3 border border-white/10">
                {isCompleted 
                  ? '🎉 Congratulations! You completed the song!' 
                  : isPlaying 
                    ? '⚡ Type character by character. Keep going!' 
                    : '▶️ Press Play to start.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TypingInterface;
