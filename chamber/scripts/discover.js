document.addEventListener("DOMContentLoaded", async () => {
    const discoverContainer = document.getElementById("discover-cards");

    // Menú Toggle
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

    
    const lastUpdated = document.getElementById("last-modified");
    if (lastUpdated) lastUpdated.textContent = document.lastModified;

    
    const lastVisit = localStorage.getItem("lastVisit");
    const message = document.getElementById("visit-message");

    if (lastVisit) {
        const lastVisitDate = new Date(lastVisit);
        const now = new Date();
        const daysDiff = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24));

        message.textContent = daysDiff === 0 
            ? "¡Welcome to our site! Explore and enjoy." 
            : `Your last visit was ${daysDiff} ago.`;
    } else {
        message.textContent = "¡Welcome to our site! Explore and enjoy.";
    }

    // Actualizar la fecha de última visita
    localStorage.setItem("lastVisit", new Date().toISOString());

    // Cargar datos desde el JSON
    try {
        const response = await fetch("data/discover.json");
        if (!response.ok) throw new Error("Error al cargar el JSON.");

        const data = await response.json();
        if (!data.destinations || data.destinations.length === 0) {
            throw new Error("El archivo JSON está vacío o mal estructurado.");
        }

        displayDiscoverItems(data.destinations);
    } catch (error) {
        console.error("Error cargando los puntos de interés:", error);
        discoverContainer.innerHTML = `<p class="error-message">No se pudieron cargar los destinos. Intenta más tarde.</p>`;
    }

    // Función para mostrar las tarjetas
    function displayDiscoverItems(destinations) {
        discoverContainer.innerHTML = ""; // Limpiar contenido previo

        destinations.forEach(poi => {
            const card = document.createElement("div");
            card.classList.add("discover-card");

            // Verificar si hay imagen, si no usar una por defecto
            const imageUrl = poi.photoUrl ? poi.photoUrl : "images/default-placeholder.jpg";

            // Crear la tarjeta con Lazy Loading
            card.innerHTML = `
                <img src="${imageUrl}" alt="${poi.name || "Sin nombre"}" class="discover-image" loading="lazy">
                <div class="discover-info">
                    <h3>${poi.name || "Nombre desconocido"}</h3>
                    <p>📍 ${poi.location || "Ubicación desconocida"} - ${poi.address || "Dirección no disponible"}</p>
                    <p>${poi.description || "Sin descripción disponible."}</p>
                    <p class="cost-info">
                        ${poi.cost?.amount ?? "Desconocido"} ${poi.cost?.currency ?? ""} - ${poi.cost?.notes ?? ""}
                    </p>
                    <a href="more-info.html?id=${poi.id}" class="learn-more">Learn More</a>
                </div>
            `;

            discoverContainer.appendChild(card);
        });
    }

    // Añadir Lazy Loading en los íconos de redes sociales
    document.querySelectorAll('.footer-social img').forEach(icon => {
        icon.setAttribute('loading', 'lazy');
    });
});
