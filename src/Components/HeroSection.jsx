import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Autoplay } from "swiper/modules";
import { baseUrl } from "../baseUrl";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import "../Styles/HeroSection.css";
import { Link } from "react-router-dom";

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

// Shuffle function
const shuffleArray = (array) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const HeroSection = () => {
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const [cinemaRes, streamingRes, youtubeRes, blogRes] = await Promise.all([
          axios.get(`${baseUrl}cinema`),
          axios.get(`${baseUrl}streaming`),
          axios.get(`${baseUrl}youtube`),
          axios.get(`${baseUrl}blog`),
        ]);

        const combined = shuffleArray([
          ...cinemaRes.data.map((movie) => ({ ...movie, type: "cinema" })),
          ...streamingRes.data.map((movie) => ({ ...movie, type: "streaming" })),
          ...youtubeRes.data.map((movie) => ({ ...movie, type: "youtube" })),
          ...blogRes.data.map((blog) => ({ ...blog, type: "blog" })),
        ]);

        setFetchedMovies(combined);
        setActiveIndex(0);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  if (loading || !fetchedMovies.length) {
    return <div className="text-white text-center">Loading...</div>;
  }

  const currentMovie = fetchedMovies[activeIndex];

  return (
    <div className="hero-section relative w-full h-[120vh] overflow-hidden mt-0">
      {/* Background Image */}
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center shadow-bg bg-no-repeat brightness-10 z-0"
        style={{ backgroundImage: `url(${currentMovie.type === "blog" ? currentMovie.img : currentMovie.posterUrl})` }}
      ></div>

      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#0b0b0b] to-transparent z-10 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-20 mt-28 lg:mt-4 flex flex-col md:flex-row items-center justify-center h-full px-6 gap-4 md:gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMovie._id}
            className="hero-overlay w-full md:w-1/2 text-white text-center md:text-left min-h-[70vh] flex flex-col justify-center faded-edges"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeUpVariants}
          >
            {/* Movie type badge */}
            <span className="inline-block text-xs uppercase bg-white text-black px-2 py-1 rounded-full font-semibold mb-2 w-fit mx-auto md:mx-0">
              {currentMovie.type} {currentMovie.type === "blog" ? "post" : "movie"}
              {console.log(currentMovie)}
            </span>

            {/* Movie title */}
            <motion.h1
              variants={fadeUpVariants}
              custom={0}
              className="text-4xl hyphens-auto lg:overflow-hidden overflow-auto md:text-7xl font-bold mb-4"
            >
              {currentMovie.title}
            </motion.h1>

            {/* Movie synopsis */}
            <motion.p
              variants={fadeUpVariants}
              custom={1}
              className="text-lg md:text-xl max-w-xl"
            >
              {currentMovie.synopsis}
            </motion.p>

            {/* Movie details button */}
            <Link to={`/${currentMovie.type === "blog" ? "blog" : "movie"}/${currentMovie._id}`}>
              <motion.button
                variants={fadeUpVariants}
                custom={2}
                className="mt-6 w-fit bg-white text-black font-semibold py-2 px-6 mx-auto lg:mx-0 rounded-xl hover:bg-black hover:text-white transition"
              >
                {currentMovie.type === "blog" ? "Read Post" : "Movie Details"}
              </motion.button>
            </Link>
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
            {fetchedMovies.map((movie, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={movie.type === "blog" ? movie.img : movie.posterUrl}
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
