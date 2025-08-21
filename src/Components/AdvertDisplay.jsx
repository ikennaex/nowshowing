import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../baseUrl";
import { useRef } from "react";

const AdvertDisplay = () => {
  const [ads, setAds] = useState([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${baseUrl}advert`);
        setAds(response.data);
      } catch (err) {
        console.error("Failed to fetch ads:", err);
      }
    };

    fetchAds();
  }, []);
  // Update the ad every 6 seconds 

  // only display active ads
  const activeAds = ads.filter((ad) => ad.active === true);
  // Get the current ad based on the index
  const currentAd = activeAds[currentAdIndex];

  useEffect(() => {
    if (!currentAd) return;

    let interval;

    if (currentAd.media.includes("/image/")) {
      interval = setInterval(() => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % activeAds.length);
      }, 6000);
    }

    if (currentAd.media.includes("/video/")) {
      const handleEnded = () => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % activeAds.length);
      };

      const videoElement = document.getElementById("ad-video");
      videoElement?.addEventListener("ended", handleEnded);

      return () => {
        videoElement?.removeEventListener("ended", handleEnded);
        if (interval) clearInterval(interval);
      };
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentAd, activeAds.length]);

  return currentAd && activeAds.length > 0 ? (
    <div className="overflow-x-auto pt-10">
      <p className="italic text-gray-600">ad</p>
      <div className="flex justify-center ">
        <a
          target="_blank"
          href={currentAd?.link}
          key={currentAd?.id}
          className="flex-shrink-0" // adjust width per item
        >
          <div className="bg-gray-700 w-80 rounded-lg overflow-hidden">
            {currentAd.media.includes("/video/") ? (
              <video
                id="ad-video"
                src={currentAd?.media}
                alt={currentAd?.title}
                className="w-full h-40 object-cover"
                controls
                autoPlay
                muted
                playsInline
              />
            ) : (
              <img
                src={currentAd?.media}
                alt={currentAd?.title}
                className="w-full h-40 object-cover"
              />
            )}
          </div>
        </a>
      </div>
    </div>
  ) : (
    ""
  );
};

export default AdvertDisplay;
