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


// WALIDACJA + WYSYŁANIE FORMULARZA
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

    // ===== SEND TO BACKEND (NODE.JS) =====
    fetch("/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            surname: surname,
            email: email,
            message: message
        })
    });

    // success message
    error.style.color = "green";
    error.textContent = "Formularz wysłany poprawnie!";

    // reset form
    document.getElementById("contactForm").reset();
});


// FETCH JSON (skills + projects)
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



// LOCAL STORAGE
function displayNotes() {
    let list = document.getElementById("notesList");
    list.innerHTML = "";

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach((note, index) => {
        let li = document.createElement("li");
        li.textContent = note;

        let btn = document.createElement("button");
        btn.textContent = "Usuń";
        btn.style.marginLeft = "10px";

        btn.onclick = () => deleteNote(index);

        li.appendChild(btn);
        list.appendChild(li);
    });
}

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

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

window.addEventListener("load", displayNotes);
