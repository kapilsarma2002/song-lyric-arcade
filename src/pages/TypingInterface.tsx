
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const TypingInterface = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { song } = location.state || {};
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number>();

  // Sample lyrics (in a real app, this would come from an API)
  const sampleLyrics = "Is this the real life? Is this just fantasy? Caught in a landslide, no escape from reality. Open your eyes, look up to the skies and see. I'm just a poor boy, I need no sympathy. Because I'm easy come, easy go, little high, little low. Any way the wind blows doesn't really matter to me, to me.";
  
  const words = sampleLyrics.split(' ');
  const currentWord = words[currentWordIndex] || '';

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
    setTypedText(value);

    if (value.endsWith(' ') && value.trim() === currentWord) {
      // Correct word typed
      setCurrentWordIndex(prev => prev + 1);
      setTypedText('');
      setProgress((currentWordIndex + 1) / words.length * 100);
      
      // Calculate WPM
      const wordsTyped = currentWordIndex + 1;
      const minutes = timeElapsed / 60;
      setWpm(minutes > 0 ? Math.round(wordsTyped / minutes) : 0);
    }

    // Calculate accuracy
    const correctChars = value.split('').filter((char, index) => 
      char === currentWord[index]
    ).length;
    setAccuracy(value.length > 0 ? Math.round((correctChars / value.length) * 100) : 100);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTyping = () => {
    setCurrentWordIndex(0);
    setTypedText('');
    setWpm(0);
    setAccuracy(100);
    setProgress(0);
    setTimeElapsed(0);
    setIsPlaying(false);
  };

  const getWordClassName = (index: number) => {
    if (index < currentWordIndex) return 'text-green-400';
    if (index === currentWordIndex) return 'text-yellow-400 bg-yellow-400/20 px-1 rounded';
    return 'text-white/40';
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">{song.title}</h1>
                <p className="text-white/70">{song.artist}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Volume2 className="w-5 h-5 text-white/70" />
              <span className="text-white/70">{formatTime(timeElapsed)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white/70">WPM</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{wpm}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white/70">Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{accuracy}%</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white/70">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{Math.round(progress)}%</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-white/70">Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatTime(timeElapsed)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 bg-white/20" />
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            onClick={togglePlayPause}
            className="bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          
          <Button
            onClick={resetTyping}
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>

        {/* Lyrics Display */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="text-white">Lyrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg leading-relaxed mb-6">
              {words.map((word, index) => (
                <span key={index} className={`${getWordClassName(index)} transition-colors duration-200 mr-2`}>
                  {word}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Typing Input */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Type Here</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-lg text-white/70">
                Current word: <span className="text-yellow-400 font-bold">{currentWord}</span>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={typedText}
                onChange={handleInputChange}
                className="w-full p-4 text-lg bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Start typing the lyrics..."
                disabled={!isPlaying}
              />
              <p className="text-sm text-white/60">
                Press spacebar after each word. {isPlaying ? 'Keep typing!' : 'Press Play to start.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TypingInterface;
