import React, { useEffect, useRef, useState } from 'react';

const AutoPlayAudio = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('mousemove', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
          })
          .catch(error => console.error('Ses çalma hatası:', error));
      }
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('mousemove', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('mousemove', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [isPlaying])
  return (
    <div className="fixed bottom-4 right-4">
      <audio
        ref={audioRef}
        src="/ses.mp3"  
      />
    </div>
  );
};

export default AutoPlayAudio;