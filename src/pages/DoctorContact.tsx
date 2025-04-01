import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

type Doctor = {
  id: number;
  lat: number;
  lon: number;
  tags?: {
    name?: string;
    addr_full?: string;
  };
};

const DoctorContact = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);

  const fetchUserLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        setLoading(false);
        alert("Location access denied. Please enter manually.");
      }
    );
  };

  useEffect(() => {
    if (location) {
      setLoading(true);
      const overpassQuery = `
        [out:json];
        (
          node["amenity"="hospital"](around:5000, ${location.lat}, ${location.lon});
          node["amenity"="clinic"](around:5000, ${location.lat}, ${location.lon});
        );
        out;
      `;
      const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;

      axios
        .get(overpassUrl)
        .then((response) => {
          console.log("API Response:", response.data);
          setDoctors(response.data.elements || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching doctors:", error);
          setLoading(false);
        });
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-400 to-purple-300 p-5">
      <motion.h2 
        className="text-white text-3xl font-bold mb-4"
        style={{ fontFamily: "'DynaPuff', cursive" }} 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Find Nearby Doctors 💖
      </motion.h2>

      {/* Buttons for Location */}
      <motion.button
        onClick={fetchUserLocation}
        className="bg-white text-pink-500 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-pink-100 transition-all mb-4"
        whileHover={{ scale: 1.1 }}
      >
        Use My Location 📍
      </motion.button>

      {/* Display Location */}
      <motion.div 
        className="bg-white p-4 rounded-lg shadow-lg text-pink-600 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {loading ? (
          <p className="animate-spin text-lg">🔄 Fetching location...</p>
        ) : location ? (
          <p>📍 Lat: {location.lat}, Lon: {location.lon}</p>
        ) : (
          <p>No location selected.</p>
        )}
      </motion.div>

      {/* Doctor List */}
      <h2 className="text-white text-2xl font-semibold mt-6">Nearby Hospitals & Clinics 🏥</h2>
      <motion.div 
        className="mt-4 w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <motion.div 
              key={doctor.id} 
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
            >
              <strong className="text-pink-600 text-lg">
                {doctor.tags?.name || "Unknown Name"}
              </strong>
              <p className="text-gray-600">
                {doctor.tags?.addr_full || `📍 Lat: ${doctor.lat}, Lon: ${doctor.lon}`}
              </p>
            </motion.div>
          ))
        ) : (
          <p className="text-white text-lg">No hospitals or clinics found nearby.</p>
        )}
      </motion.div>
    </div>
  );
};

export default DoctorContact;
