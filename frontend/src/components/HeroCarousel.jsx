import React, { useState, useEffect, useRef } from "react";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRefs = useRef([]);

  const videos = [
    "/assets/vid-1.mp4",
    "/assets/vid-2.mp4",
    "/assets/vid-3.mp4",
    "/assets/vid-4.mp4",
    "/assets/vid-5.mp4",
  ];

  // Go to next or previous video
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % videos.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + videos.length) % videos.length);

  // Play only the current video
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === currentSlide) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentSlide]);

  // Auto-play timer - change slide every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % videos.length);
    }, 10000); // 10 seconds

    return () => clearInterval(timer);
  }, [videos.length]);

  return (
    <div className="relative w-full h-[95vh] overflow-hidden bg-black">
      {/* Videos */}
      {videos.map((src, index) => (
        <video
          key={index}
          ref={(el) => (videoRefs.current[index] = el)}
          src={src}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          muted
          loop
          playsInline
        ></video>
      ))}

      {/* Overlay text */}
      <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold uppercase">
          Adventure is Worthwhile
        </h1>
        <p className="text-lg md:text-2xl mt-3 font-light">
          Discover New Places With Us — Adventure Awaits
        </p>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-orange-500 scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
