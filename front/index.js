
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    message.style.color = "black";
    message.textContent = "Connexion en cours...";

    // Détermine l'URL de l'API (s'adapte à Express port 4001 ou Live Server)
    const API_BASE = window.location.origin.includes(":4001") ? "" : "http://localhost:4001";

    try {
        const response = await fetch(`${API_BASE}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erreur de connexion");
        }

        message.style.color = "green";
        message.textContent = data.message;

        console.log("Utilisateur connecté :", data.user);

    } catch (error) {
        message.style.color = "red";
        message.textContent = "Erreur : " + error.message;

        console.error("Erreur de connexion :", error);
    }
});
