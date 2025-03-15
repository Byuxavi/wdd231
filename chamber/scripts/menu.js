document.addEventListener("DOMContentLoaded", function () {
    // Lista de negocios directamente en JavaScript
    const businesses = [
        {
            name: "Tech Solutions",
            tagline: "Innovating the Future",
            email: "contact@techsolutions.com",
            phone: "800-555-5678",
            website: "https://techsolutions.com"
        },
        {
            name: "Green Energy Inc.",
            tagline: "Powering a Sustainable World",
            email: "info@greenenergy.com",
            phone: "800-555-7890",
            website: "https://greenenergy.com"
        },
        {
            name: "Fresh Bites Catering",
            tagline: "Delicious Food, Delivered",
            email: "orders@freshbites.com",
            phone: "800-555-2345",
            website: "https://freshbitescatering.com"
        }
    ];

    // Seleccionar el contenedor de la lista de negocios
    const businessList = document.querySelector(".business-list");

    // Agregar cada negocio al HTML
    businesses.forEach(business => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h2>${business.name}</h2>
            <p>${business.tagline}</p>
            <p><strong>Email:</strong> <a href="mailto:${business.email}">${business.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${business.phone}">${business.phone}</a></p>
            <p><strong>Website:</strong> <a href="${business.website}" target="_blank">${business.website}</a></p>
        `;

        businessList.appendChild(card);
    });
});
