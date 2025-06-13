
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Keyboard, Target, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Music className="w-8 h-8" />,
      title: "Real Music",
      description: "Type along to your favorite songs from YouTube with synchronized lyrics"
    },
    {
      icon: <Keyboard className="w-8 h-8" />,
      title: "Improve Typing",
      description: "Practice typing while enjoying music - making learning fun and engaging"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Track Progress",
      description: "Monitor your WPM, accuracy, and improvement over time"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Challenge Yourself",
      description: "Choose from different genres and difficulty levels to match your skill"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mb-6">
                <Music className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-6xl font-bold text-white mb-6">
                LyricType
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Master typing while jamming to your favorite songs. Practice with real lyrics, 
                improve your speed, and have fun doing it!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/dashboard')}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3"
              >
                Start Typing
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-3"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl"></div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose LyricType?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Combine your love for music with skill development. Our platform makes typing practice 
            enjoyable and effective.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Type to the Beat?
            </h3>
            <p className="text-lg text-white/70 mb-8">
              Join thousands of users improving their typing skills through music
            </p>
            <Button 
              onClick={() => navigate('/dashboard')}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
