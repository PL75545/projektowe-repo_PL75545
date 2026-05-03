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
fetch('data.json')
    .then(response => response.json())
    .then(data => {

        // Skills
        let skillsList = document.getElementById("skills");
        data.skills.forEach(skill => {
            let li = document.createElement("li");
            li.textContent = skill;
            skillsList.appendChild(li);
        });

        // Projects
        let projectsList = document.getElementById("projects");
        data.projects.forEach(project => {
            let li = document.createElement("li");
            li.textContent = project;
            projectsList.appendChild(li);
        });

    })
    .catch(error => console.log("Błąd JSON:", error));

    // ===== LOCAL STORAGE - DODATKOWE UMIEJĘTNOŚCI =====

// Funkcja wyświetlająca zapisane dane z localStorage
function displayNotes() {
    let list = document.getElementById("notesList");
    list.innerHTML = "";

    // Pobieramy dane z localStorage (jeśli brak → pusta tablica)
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    // Tworzymy elementy listy
    notes.forEach((note, index) => {
        let li = document.createElement("li");
        li.textContent = note;

        // Przycisk usuwania
        let btn = document.createElement("button");
        btn.textContent = "Usuń";
        btn.style.marginLeft = "10px";

        btn.onclick = () => deleteNote(index);

        li.appendChild(btn);
        list.appendChild(li);
    });
}

// Funkcja dodawania nowego elementu
function addNote() {
    let input = document.getElementById("noteInput");
    let value = input.value.trim();

   if (value === "") return;

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.push(value);

    localStorage.setItem("notes", JSON.stringify(notes));

    
    input.value = "";
    displayNotes();
}

// Funkcja usuwania elementu
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes();
}

// Po załadowaniu strony wyświetlamy dane
window.addEventListener("load", displayNotes);
