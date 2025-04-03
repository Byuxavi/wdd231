document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.getElementById("members-container");
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");

    
    fetch("data/members.json")
        .then(response => response.json())
        .then(data => displayMembers(data, "grid")) 
        .catch(error => console.error("Error cargando los miembros:", error));

    
    function displayMembers(members, view) {
        membersContainer.innerHTML = ""; 

        members.forEach(member => {
            const memberCard = document.createElement("div");
            memberCard.classList.add("member-card", view === "list" ? "list-view" : "grid-view");

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

            membersContainer.appendChild(memberCard);
        });

        
        membersContainer.classList.toggle("list-view", view === "list");
        membersContainer.classList.toggle("grid-view", view === "grid");
    }


    gridViewBtn.addEventListener("click", () => fetchDataAndDisplay("grid"));
    listViewBtn.addEventListener("click", () => fetchDataAndDisplay("list"));

    function fetchDataAndDisplay(view) {
        fetch("data/members.json")
            .then(response => response.json())
            .then(data => displayMembers(data, view))
            .catch(error => console.error("Error cambiando vistas:", error));
    }


    document.getElementById("year").textContent = new Date().getFullYear();
    document.querySelector(".last-modify").textContent = document.lastModified;
});