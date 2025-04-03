document.addEventListener("DOMContentLoaded", async () => { 
    const discoverContainer = document.getElementById("discover-cards");

    // Menu Toggle
    const menuButton = document.querySelector(".hamburger-menu");
    const navMenu = document.querySelector("#main-nav");

    if (menuButton && navMenu) {
        menuButton.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });
    }

    document.querySelectorAll('#main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('#main-nav').classList.remove('show');
        });
    });

    // Footer: Last updated date
    const lastUpdated = document.getElementById("last-modified");
    if (lastUpdated) lastUpdated.textContent = document.lastModified;

    // Handling last visit message
    const lastVisit = localStorage.getItem("lastVisit");
    const message = document.getElementById("visit-message");

    if (lastVisit) {
        const lastVisitDate = new Date(lastVisit);
        const now = new Date();
        const daysDiff = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24));

        // Display message based on the time difference between visits
        if (daysDiff === 0) {
            message.textContent = "Back so soon! Awesome!";
        } else if (daysDiff === 1) {
            message.textContent = `You last visited ${daysDiff} day ago.`;
        } else {
            message.textContent = `You last visited ${daysDiff} days ago.`;
        }
    } else {
        message.textContent = "Welcome! Let us know if you have any questions.";
    }

    // Update the last visit date in localStorage
    localStorage.setItem("lastVisit", new Date().toISOString());

    // Fetch data from the JSON file
    try {
        const response = await fetch("data/discover.json");
        if (!response.ok) throw new Error("Error loading the JSON file.");

        const data = await response.json();
        if (!data.destinations || data.destinations.length === 0) {
            throw new Error("The JSON file is empty or malformed.");
        }

        displayDiscoverItems(data.destinations);
    } catch (error) {
        console.error("Error loading the destinations:", error);
        discoverContainer.innerHTML = `<p class="error-message">Failed to load the destinations. Please try again later.</p>`;
    }

    // Function to display the destination cards
    function displayDiscoverItems(destinations) {
        discoverContainer.innerHTML = ""; // Clear previous content

        destinations.forEach(poi => {
            const card = document.createElement("div");
            card.classList.add("discover-card");

            // Check if there's an image, if not use a default one
            const imageUrl = poi.photoUrl ? poi.photoUrl : "images/default-placeholder.jpg";

            // Create the card with Lazy Loading
            card.innerHTML = `
                <img src="${imageUrl}" alt="${poi.name || "Unnamed"}" class="discover-image" loading="lazy">
                <div class="discover-info">
                    <h3>${poi.name || "Unknown Name"}</h3>
                    <p>📍 ${poi.location || "Unknown Location"} - ${poi.address || "Address unavailable"}</p>
                    <p>${poi.description || "No description available."}</p>
                    <p class="cost-info">
                        ${poi.cost?.amount ?? "Unknown"} ${poi.cost?.currency ?? ""} - ${poi.cost?.notes ?? ""}
                    </p>
                    <a href="more-info.html?id=${poi.id}" class="learn-more">Learn More</a>
                </div>
            `;

            discoverContainer.appendChild(card);
        });
    }

    // Add Lazy Loading to social media icons
    document.querySelectorAll('.footer-social img').forEach(icon => {
        icon.setAttribute('loading', 'lazy');
    });
});
