document.addEventListener("DOMContentLoaded", async function () {
  const gallery = document.getElementById("image-gallery"); // Reference to the gallery container

  // Function to load images dynamically
  async function loadImages() {
    try {
      const response = await fetch("/api/images"); // API endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const images = await response.json(); // Parse the response JSON
      gallery.innerHTML = ""; // Clear any existing content

      // Determine the correct base URL for your images (depending on environment)
      const baseUrl = window.location.origin; // This will return either 'http://localhost:3000' or your production URL

      // Iterate over the list of images and add them to the gallery
      images.forEach((imageFile) => {
        // Construct the full URL for the image
        const imageUrl = `${baseUrl}/uploads/${imageFile}`; // Correct image path based on environment

        // Create a grid item for the gallery
        const imageElement = document.createElement("div");
        imageElement.classList.add("grid-item"); // Add grid-item class for styling

        // Inner HTML structure for the grid item
        imageElement.innerHTML = `
          <div class="image-container">
            <img src="${imageUrl}" alt="Gallery Image" class="gallery-image">
          </div>
          <a href="${imageUrl}" download class="download-btn">
            <img src="dw.png" alt="Download" class="download-icon">
          </a>
        `;

        gallery.appendChild(imageElement); // Append to the gallery
      });
    } catch (error) {
      console.error("Error loading images:", error);
      gallery.innerHTML = `<p class="error-message">Failed to load images. Please try again later.</p>`;
    }
  }

  // Call the function to load images when DOM is ready
  loadImages();
});
