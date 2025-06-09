import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Autoplay } from "swiper/modules";
import { baseUrl } from "../baseUrl";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// Animation variant
const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const HeroSection = () => {
  const [fetchedCinemaMovies, setFetchedCinemaMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchCinemaMovies = async () => {
      try {
        const response = await axios.get(`${baseUrl}cinema`);
        setFetchedCinemaMovies(response.data);
        setActiveIndex(0);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCinemaMovies();
  }, []);

  if (loading || !fetchedCinemaMovies.length) {
    return <div className="text-white text-center">Loading...</div>;
  }

  const currentMovie = fetchedCinemaMovies[activeIndex];

  return (
    <div className="hero-section relative w-full h-[120vh] overflow-hidden mt-0">
      {/* Background Image */}
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center bg-no-repeat brightness-10 z-0"
        style={{ backgroundImage: `url(${currentMovie.posterUrl})` }}
      ></div>

      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#0b0b0b] to-transparent z-10 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center h-full px-6 gap-4 md:gap-6">
  
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMovie._id} // makes it reanimate 
            className="hero-overlay w-full md:w-1/2 text-white text-center md:text-left min-h-[70vh] flex flex-col justify-center faded-edges"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeUpVariants}
          >
            {/* framer motion for h1  */}
            <motion.h1
              variants={fadeUpVariants}
              custom={0}
              className="text-6xl md:text-7xl font-bold mb-4"
            >
              {currentMovie.title}
            </motion.h1>

            {/* framer motion for p tag */}
            <motion.p
              variants={fadeUpVariants}
              custom={1}
              className="text-lg md:text-xl max-w-xl"
            >
              {currentMovie.synopsis}
            </motion.p>

            <motion.button
              variants={fadeUpVariants}
              custom={2}
              className="mt-6 w-fit bg-white text-black font-semibold py-2 px-6 mx-auto lg:mx-0 rounded-xl hover:bg-black hover:text-white transition"
            >
              Movie details
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Swiper */}
        <div className="w-80 h-50 md:w-80 md:h-50 md:mt-0 mb-12">
          <Swiper
            effect="coverflow"
            grabCursor={false}
            modules={[EffectCards, Autoplay]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            initialSlide={0}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="mySwiper"
          >
            {fetchedCinemaMovies.map((movie, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={movie.posterUrl}
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
