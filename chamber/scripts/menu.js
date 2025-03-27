document.addEventListener("DOMContentLoaded", () => {
    const businessList = document.getElementById("business-list");

    if (!businessList) {
        console.error("El contenedor de miembros destacados no existe.");
        return;
    }

    // Cargar los miembros desde el JSON
    fetch("data/members.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar el JSON");
            }
            return response.json();
        })
        .then(data => {
            console.log("Miembros cargados:", data);
            displayFeaturedMembers(data);
        })
        .catch(error => console.error("Error cargando los miembros:", error));

    function displayFeaturedMembers(members) {
        businessList.innerHTML = ""; 

        // Filtrar miembros con membresía Gold o Silver
        const filteredMembers = members.filter(member => 
            member.membership === "Gold" || member.membership === "Silver"
        );

        if (filteredMembers.length === 0) {
            businessList.innerHTML = "<p>No hay miembros destacados disponibles.</p>";
            return;
        }

        // Seleccionar aleatoriamente 2 o 3 miembros
        const selectedMembers = filteredMembers
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        selectedMembers.forEach(member => {
            const memberCard = document.createElement("div");
            memberCard.classList.add("member-card");

            memberCard.innerHTML = `
                <img src="${member.image}" alt="${member.name}" class="member-image">
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p>📍 ${member.address}</p>
                    <p>📞 ${member.phone}</p>
                    <p>🏅 Membresía: <strong>${member.membership}</strong></p>
                    <a href="${member.website}" target="_blank" class="visit-link">Visitar Sitio Web</a>
                </div>
            `;

            businessList.appendChild(memberCard);
        });
    }
});
