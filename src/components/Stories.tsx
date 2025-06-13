import { useEffect, useState, useCallback } from 'react';

const Stories = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [progress, setProgress] = useState([0, 0]);
  const stories = [
    { color: 'bg-violet-600' },
    { color: 'bg-red-600' }
  ];

  const handleClose = useCallback(() => {
    window.Telegram.WebApp.close();
  }, []);

  const handleStoryComplete = useCallback((storyIndex: number) => {
    if (storyIndex === stories.length - 1) {
      handleClose();
    } else {
      setCurrentStory(prev => prev + 1);
    }
  }, [handleClose]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = [...prev];
        if (newProgress[currentStory] < 100) {
          newProgress[currentStory] += 1;
          return newProgress;
        }
        clearInterval(interval);
        handleStoryComplete(currentStory);
        return prev;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [currentStory, handleStoryComplete]);

  return (
    <div className={`min-h-screen ${stories[currentStory].color} relative`}>
      {/* Кнопка закрытия */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white p-2"
        aria-label="Закрыть"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Индикаторы прогресса */}
      <div className="absolute top-2 left-2 right-2 flex gap-2">
        {stories.map((_, index) => (
          <div
            key={index}
            className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width: `${progress[index]}%`
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories; 