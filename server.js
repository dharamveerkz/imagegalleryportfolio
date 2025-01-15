const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // Optional for CORS

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve static files from the root directory (where index.html is located)
app.use(express.static(path.join(__dirname)));

// Endpoint to get the list of images
app.get("/api/images", (req, res) => {
  const imageDir = path.join(__dirname, "uploads");
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to scan directory" });
    }
    // Filter only image files
    const images = files.filter((file) => /\.(jpg|jpeg|png|gif)$/.test(file));
    res.json(images);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
