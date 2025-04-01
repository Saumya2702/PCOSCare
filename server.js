import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for frontend requests

const GEOAPIFY_API_KEY = process.env.VITE_GEOAPIFY_API_KEY; // Store API key in .env

// API Route to Fetch Doctors
app.get("/api/doctors", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    // Geoapify Places API URL
    const url = `https://api.geoapify.com/v2/places?categories=healthcare.hospital,healthcare.clinic&filter=circle:${lon},${lat},5000&limit=10&apiKey=${GEOAPIFY_API_KEY}`;

    const response = await axios.get(url);
    res.json(response.data); // Send API response to frontend
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
