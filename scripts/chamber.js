// Actualizar la fecha de última modificación del documento
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("last-modified").textContent = document.lastModified;
});

// Cambio de tema manual
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Verificar y aplicar el tema guardado
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
}

// Evento para alternar el tema
themeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

// 🕒 Cambio de tema en tiempo real según la ubicación
function setThemeBasedOnLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position;
            fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`)
                .then(response => response.json())
                .then(data => {
                    const now = new Date();
                    const sunrise = new Date(data.results.sunrise);
                    const sunset = new Date(data.results.sunset);

                    // Si es de noche, aplicar el tema oscuro
                    if (now >= sunset || now <= sunrise) {
                        body.classList.add("dark-mode");
                        localStorage.setItem("theme", "dark");
                    } else {
                        body.classList.remove("dark-mode");
                        localStorage.setItem("theme", "light");
                    }
                })
                .catch(error => console.error("Error al obtener datos de ubicación:", error));
        });
    }
}

// Aplicar tema basado en la ubicación
setThemeBasedOnLocation();


document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.getElementById("members-container");
    const toggleViewBtn = document.getElementById("toggle-view");

    let isGridView = true;

    // Función para obtener datos del JSON
    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error("Error al cargar los miembros:", error);
        }
    }

    // Función para mostrar miembros en la página
    function displayMembers(members) {
        membersContainer.innerHTML = ""; // Limpiar contenedor
        members.forEach(member => {
            const memberElement = document.createElement("div");
            memberElement.classList.add("member-card", isGridView ? "grid" : "list");

            memberElement.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visitar Sitio</a>
                <span class="membership-level level-${member.membership}">Nivel ${member.membership}</span>
            `;
            membersContainer.appendChild(memberElement);
        });
    }

    // Alternar entre vista de lista y cuadrícula
    toggleViewBtn.addEventListener("click", () => {
        isGridView = !isGridView;
        membersContainer.classList.toggle("list-view");
        fetchMembers();
    });

    // Cargar miembros al inicio
    fetchMembers();
});
