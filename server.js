const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration to allow all domains
const corsOptions = {
  origin: "*", // Allows requests from any domain
  methods: "GET,POST,OPTIONS", // Allowed HTTP methods
  allowedHeaders: "Content-Type, Authorization", // Allowed headers
};

// Enable CORS with the defined options
app.use(cors(corsOptions));

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve static files from the root directory (where index.html is located)
app.use(express.static(path.join(__dirname)));

// Endpoint to get the list of images
app.get("/api/images", (req, res) => {
  const imageDir = path.join(__dirname, "uploads");
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return res.status(500).json({ error: "Unable to scan directory" });
    }
    // Filter only image files (you can add more types as needed)
    const images = files.filter((file) =>
      /\.(jpg|jpeg|png|gif|webp|svg)$/.test(file)
    );
    res.json(images);
  });
});

// Fallback route for handling 404 errors gracefully
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
