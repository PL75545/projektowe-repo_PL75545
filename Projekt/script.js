// Zmiana motywu
function changeTheme() {
    let theme = document.getElementById("theme");

    if (theme.getAttribute("href") === "red.css") {
        theme.setAttribute("href", "green.css");
    } else {
        theme.setAttribute("href", "red.css");
    }
}

// Ukrywanie / pokazywanie sekcji Projekty
function toggleProjekty() {
    let section = document.getElementById("projekty");

    if (section.style.display === "none") {
        section.style.display = "block";
    } else {
        section.style.display = "none";
    }
}


//  WALIDACJA FORMULARZA 
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let surname = document.getElementById("surname").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let error = document.getElementById("error");

    error.style.color = "red";
    error.textContent = "";

    // puste pola
    if (!name || !surname || !email || !message) {
        error.textContent = "Wszystkie pola są wymagane!";
        return;
    }

    // cyfry w imieniu/nazwisku
    if (/\d/.test(name) || /\d/.test(surname)) {
        error.textContent = "Imię i nazwisko nie mogą zawierać cyfr!";
        return;
    }

    // email
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        error.textContent = "Niepoprawny email!";
        return;
    }

    error.style.color = "green";
    error.textContent = "Formularz wysłany poprawnie!";
});

// FETCH JSON (NOWE ZADANIE)
document.addEventListener("DOMContentLoaded", function () {

    fetch('data.json')
        .then(response => response.json())
        .then(data => {

            let skillsList = document.getElementById("skills");
            let projectsList = document.getElementById("projects");

            data.skills.forEach(skill => {
                let li = document.createElement("li");
                li.textContent = skill;
                skillsList.appendChild(li);
            });

            data.projects.forEach(project => {
                let li = document.createElement("li");
                li.textContent = project;
                projectsList.appendChild(li);
            });

        })
        .catch(error => console.log("Błąd JSON:", error));

});
