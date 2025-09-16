import { useState, useCallback } from 'react';

const Stories = () => {
  const [progress, setProgress] = useState(0); // Теперь прогресс - это просто число
  const story = {
    type: 'video',
    src: '/source_videos/1.mp4', // Путь к вашему видео
    duration: 206 // 3 минуты 26 секунд = 206 секунд
  };

  const handleClose = useCallback(() => {
    window.Telegram.WebApp.close();
  }, []);

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center">
      <video
        src={story.src}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
        onTimeUpdate={(e) => {
          const { currentTime, duration } = e.currentTarget;
          setProgress((currentTime / duration) * 100);
        }}
        onEnded={handleClose} // Закрываем приложение по окончанию видео
      />

      {/* Кнопка закрытия */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white p-2 z-10"
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

      {/* Индикатор прогресса */}
      <div className="absolute top-2 left-2 right-2 flex gap-2 z-10">
        <div className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Stories; 