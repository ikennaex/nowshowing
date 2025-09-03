import React, { useEffect, useState } from "react";
import { baseUrl } from "../../baseUrl";
import axios from "axios";

const ViewRunningAds = () => {
  const [runningAds, setRunningAds] = useState([]);

  useEffect(() => {
    // Fetch running ads from the server
    const fetchRunningAds = async () => {
      try {
        const response = await axios.get(`${baseUrl}advert`);
        // Add "active" property to each ad (default: true)
        setRunningAds(response.data);
      } catch (error) {
        console.error("Error fetching running ads:", error);
      }
    };

    fetchRunningAds();
  }, []);

  const toggleActive = async (id) => {
    try {
      // find the current ad
      const currentAd = runningAds.find((ad) => ad._id === id);

      // send PUT request with the opposite of its current active state
      const response = await axios.put(`${baseUrl}advert/${id}`, {
        active: !currentAd.active,
      });

      // use backend response to update fronten state
      setRunningAds((prevAds) =>
        prevAds.map((ad) =>
          ad._id === id ? { ...ad, active: response.data.active } : ad
        )
      );
    } catch (error) {
      console.error("Error toggling advert:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-white">View Running Ads</h1>

      <div>
        {runningAds.length > 0 ? (
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {runningAds
              .slice()
              .reverse()
              .map((ad) => (
                <li
                  key={ad._id}
                  className={`p-4 rounded-lg ${
                    ad.active ? "bg-gray-800" : "bg-gray-500 opacity-70"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="lg:text-lg text-sm font-semibold">
                      {ad.title}
                    </h2>
                    <button
                      onClick={() => toggleActive(ad._id)}
                      className={`px-2 py-1 rounded text-xs ${
                        ad.active ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {ad.active ? "Active" : "Inactive"}
                    </button>
                  </div>

                  <p className="text-gray-400 text-sm">
                    Link:{" "}
                    <a
                      href={ad.link}
                      className="text-blue-400 hover:underline break-words"
                    >
                      {ad.link}
                    </a>
                  </p>

                  {ad.media &&
                    (ad.media.includes("/video/") ? (
                      <video
                        src={ad.media}
                        controls
                        className="mt-2 w-full h-40 rounded-md object-cover"
                      />
                    ) : (
                      <img
                        src={ad.media}
                        alt={ad.title}
                        className="mt-2 w-full h-72 rounded-md object-contain"
                      />
                    ))}
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-gray-400">No running ads found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewRunningAds;
