import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../baseUrl";

const AdvertDisplay = () => {
  const [ads, setAds] = useState([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

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
  console.log(ads);

  // Update the ad every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length); // Cycle through ads
    }, 6000); // 6 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [ads.length]);

  // only display active ads
  const activeAds = ads.filter((ad) => ad.active === true);
  // Get the current ad based on the index
  const currentAd = activeAds[currentAdIndex];

  return currentAd && activeAds.length > 0 ? (
    <div className="overflow-x-auto pt-10">
      <p className="italic text-gray-600">ad</p>
      <div className="flex justify-center ">
        <a
          href={currentAd?.link}
          key={currentAd?.id}
          className="flex-shrink-0" // adjust width per item
        >
          <div className="bg-gray-700 w-80 rounded-lg overflow-hidden">
            <img
              src={currentAd?.media}
              alt={currentAd?.title}
              className="w-full h-40 object-cover"
            />
          </div>
        </a>
      </div>
    </div>
  ) : (
    ""
  );
};

export default AdvertDisplay;
