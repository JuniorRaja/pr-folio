import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface Track {
  title: string;
  artist: string;
  duration: string;
  src: string;
}

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Free background music from Free Music Archive
  const track: Track = {
    title: "Happy Boy End Theme",
    artist: "Simon Panrucker",
    duration: "0:30",
    src: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Simon_Panrucker/Happy_Boy_End_Theme/Simon_Panrucker_-_01_-_Happy_Boy_End_Theme.mp3"
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    
    const handleCanPlay = () => {
      // Try to autoplay when audio can play
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Autoplay prevented:", error);
          // Autoplay was prevented, user will need to click play
        });
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', () => setIsPlaying(false));

    // Set volume to a comfortable level
    audio.volume = 0.3;

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <audio
        ref={audioRef}
        src="https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Simon_Panrucker/Happy_Boy_End_Theme/Simon_Panrucker_-_01_-_Happy_Boy_End_Theme.mp3"
        loop
        preload="auto"
        crossOrigin="anonymous"
      />
      
      <div 
        className="fixed bottom-6 left-6 z-50"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <Card 
          className={`glass-card border-primary/20 transition-all duration-300 ease-out overflow-hidden ${
            isExpanded 
              ? 'w-80 h-auto shadow-2xl' 
              : 'w-16 h-16 shadow-lg'
          }`}
        >
          {/* Compact View */}
          <div className={`flex items-center justify-center p-2 ${isExpanded ? 'hidden' : 'block'}`}>
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="w-12 h-12 hover:bg-primary/20 hover:text-primary"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>
          </div>

          {/* Expanded View */}
          <div className={`p-4 space-y-4 ${isExpanded ? 'block animate-fade-in' : 'hidden'}`}>
            {/* Track Info */}
            <div className="space-y-1">
              <h3 className="font-semibold text-sm truncate">{track.title}</h3>
              <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{track.duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlay}
                  className="w-8 h-8 hover:bg-primary/20 hover:text-primary"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4 ml-0.5" />
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="w-8 h-8 hover:bg-primary/20 hover:text-primary"
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Music Visualization */}
              <div className="flex items-center space-x-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 bg-primary rounded-full transition-all duration-300 ${
                      isPlaying 
                        ? 'animate-pulse h-4' 
                        : 'h-2'
                    }`}
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: `${0.5 + i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Now Playing Indicator */}
            <div className="flex items-center space-x-2 pt-2 border-t border-border/20">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs text-primary font-medium">
                {isPlaying ? 'Now Playing' : 'Paused'}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default MusicPlayer;