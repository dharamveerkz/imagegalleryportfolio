document.addEventListener("DOMContentLoaded", async function () {
  const gallery = document.getElementById("image-gallery");

  async function loadImages() {
    try {
      const response = await fetch("http://localhost:3000/api/images"); // Replace with your actual API endpoint
      const images = await response.json();

      gallery.innerHTML = ""; // Clear any existing images

      images.forEach((imageFile) => {
        const imageUrl = `http://localhost:3000/uploads/${imageFile}`; // Dynamic URL for images in the 'uploads' folder

        // Create a grid item element for the image
        const imageElement = document.createElement("div");
        imageElement.classList.add("grid-item");

        // Add the image and download button to the grid item
        imageElement.innerHTML = `
          <div class="image-container">
            <img src="${imageUrl}" alt="Gallery Image" class="gallery-image">
            <a href="${imageUrl}" download class="download-btn">
              <img src="dw.png" alt="Download" class="download-icon">
            </a>
          </div>
        `;

        // Append the grid item to the gallery
        gallery.appendChild(imageElement);
      });
    } catch (error) {
      console.error("Error loading images:", error);
    }
  }

  // Load images when the page is fully loaded
  loadImages();
});
