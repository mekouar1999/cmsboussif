const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Email :", email);
    console.log("Mot de passe saisi", password);

    message.textContent = "Formulaire envoyé avec succès !";
    message.style.color = "green";
});