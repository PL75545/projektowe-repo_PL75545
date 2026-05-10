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

    section.style.display = (section.style.display === "none") ? "block" : "none";
}


// FORMULARZ + WALIDACJA + SEND TO BACKEND
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let surname = document.getElementById("surname").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let error = document.getElementById("error");

    error.textContent = "";
    error.style.color = "red";

    // validation
    if (!name || !surname || !email || !message) {
        error.textContent = "Wszystkie pola są wymagane!";
        return;
    }

    if (/\d/.test(name) || /\d/.test(surname)) {
        error.textContent = "Imię i nazwisko nie mogą zawierać cyfr!";
        return;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        error.textContent = "Niepoprawny email!";
        return;
    }

    // SEND TO SERVER (backend)
    fetch("/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: document.getElementById("name").value.trim(),
            surname: document.getElementById("surname").value.trim(),
            email: document.getElementById("email").value.trim(),
            message: document.getElementById("message").value.trim()
        })
    });

    error.style.color = "green";
    error.textContent = "Formularz wysłany poprawnie!";

    document.getElementById("contactForm").reset();
});


// FETCH JSON (skills + projects)
fetch("data.json")
    .then(res => res.json())
    .then(data => {

        let skillsList = document.getElementById("skills");
        data.skills.forEach(skill => {
            let li = document.createElement("li");
            li.textContent = skill;
            skillsList.appendChild(li);
        });

        let projectsList = document.getElementById("projects");
        data.projects.forEach(project => {
            let li = document.createElement("li");
            li.textContent = project;
            projectsList.appendChild(li);
        });

    })
    .catch(err => console.log("JSON error:", err));


// LOCAL STORAGE NOTES
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

    if (!value) return;

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
