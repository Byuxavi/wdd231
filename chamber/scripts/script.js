document.addEventListener("DOMContentLoaded", function () {
    // Automatically set the timestamp when the form is submitted
    const form = document.getElementById("membershipForm");
    if (form) {
        form.addEventListener("submit", function () {
            document.getElementById("timestamp").value = new Date().toISOString();
        });
    }

    // Toggle membership benefits
    function toggleBenefits(level) {
        const benefitsBox = document.getElementById(`${level}-box`);
        if (benefitsBox) {
            if (benefitsBox.innerHTML.trim() === "") {
                benefitsBox.innerHTML = getBenefits(level);
                benefitsBox.style.display = "block";
            } else {
                benefitsBox.innerHTML = "";
                benefitsBox.style.display = "none";
            }
        }
    }

    // Function to return membership benefits
    function getBenefits(level) {
        const benefits = {
            np: ["Networking opportunities", "Access to newsletters"],
            bronze: ["All NP benefits", "Discounts on events", "Marketing opportunities"],
            silver: ["All Bronze benefits", "Priority event invitations", "Business listing"],
            gold: ["All Silver benefits", "Exclusive VIP events", "Personalized business support"]
        };
        return `<ul class='benefits-list'>${benefits[level].map(item => `<li>${item}</li>`).join('')}</ul>`;
    }

    // Attach event listeners to buttons
    document.querySelectorAll(".view-benefits-btn").forEach(button => {
        button.addEventListener("click", function () {
            const level = this.parentElement.getAttribute("data-level");
            toggleBenefits(level);
        });
    });
});