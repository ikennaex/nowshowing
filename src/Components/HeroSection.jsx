import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards, Autoplay } from 'swiper/modules';
import movies from '../data/movies';

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentMovie = movies[activeIndex];

  return (
<div className="hero-section relative w-full h-[120vh] overflow-hidden mt-0">
  {/* Background Image */}
  <div
    className="hero-bg absolute inset-0 bg-cover bg-center bg-no-repeat brightness-10 z-0"
    style={{ backgroundImage: `url(${currentMovie.image})` }}
  ></div>

  {/* Gradient overlay to fade bottom */}
  <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#0b0b0b] to-transparent z-10 pointer-events-none"></div>

  {/* Content */}
  <div className="relative z-20 flex flex-col md:flex-row items-center justify-center h-full px-6 gap-4 md:gap-6">
    <div className="hero-overlay w-full md:w-1/2 text-white text-center md:text-left min-h-[70vh] md:min-h-full flex flex-col justify-center">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">{currentMovie.title}</h1>
      <p className="text-lg md:text-xl max-w-xl">{currentMovie.body}</p>

      <button className="mt-6 w-28 bg-white text-black font-semibold py-2 rounded-lg border-2 border-white hover:bg-customBlue hover:text-white transition book-now">
        Book Now
      </button>
    </div>

    <div className="w-80 h-50 md:w-80 md:h-50 md:mt-0 mb-12">
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="mySwiper"
      >
        {movies.map((movie, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-[60vh] md:h-[70vh] object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
</div>
  );
};

export default HeroSection;
