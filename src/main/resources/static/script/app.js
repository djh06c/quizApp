// ---- Konstanter / DOM-elementer ----

const apiBase = "/api/deltagere";
const quizApi = "/api/quiz/date";

const nameInput = document.getElementById("nameInput");
const signupBtn = document.getElementById("signupBtn");
const deltagerListe = document.getElementById("deltagerListe");
const quizDateLabel = document.getElementById("quizDateLabel");
const deltagerCount = document.getElementById("deltagerCount");

// Når siden er klar
document.addEventListener("DOMContentLoaded", () => {
    loadQuizDate();
    loadDeltagere();
    nameInput.focus();
});

// ---- Quiz-dato ----

function loadQuizDate() {
    fetch(quizApi)
        .then(res => {
            if (!res.ok) {
                throw new Error("Kunne ikke hente quizdato");
            }
            return res.json();
        })
        .then(data => {
            console.log("Quiz-dato fra backend:", data);

            if (!quizDateLabel) return;

            // Vis rå dato (fx 2025-11-26) – nemt og sikkert
            quizDateLabel.textContent = data.quizDate;
        })
        .catch(err => {
            console.error("Fejl i quizdato:", err);
            if (quizDateLabel) {
                quizDateLabel.textContent = "ukendt dato";
            }
        });
}

// ---- Enter = tilmeld ----

nameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        signupBtn.click();
    }
});

// ---- Opret deltager ----

signupBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (!name) return;

    const payload = { name: name };

    fetch(apiBase, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Kunne ikke oprette deltager");
            }
            return res.json();
        })
        .then(() => {
            nameInput.value = "";
            nameInput.focus();
            loadDeltagere();
        })
        .catch(err => console.error("Fejl i POST:", err));
});

// ---- Hent + vis deltagere ----

function loadDeltagere() {
    fetch(apiBase)
        .then(res => {
            if (!res.ok) {
                throw new Error("Kunne ikke hente deltagere");
            }
            return res.json();
        })
        .then(data => {
            console.log("Deltagere fra backend:", data);

            // Opdater tæller
            if (deltagerCount) {
                deltagerCount.textContent = data.length;
            }

            // Ryd liste
            deltagerListe.innerHTML = "";

            // Byg liste
            data.forEach(p => {
                const li = document.createElement("li");

                const nameSpan = document.createElement("span");
                nameSpan.classList.add("participant-name");
                nameSpan.textContent = p.name;

                const deleteBtn = document.createElement("button");
                deleteBtn.type = "button";
                deleteBtn.textContent = "Slet";
                deleteBtn.classList.add("delete-btn");
                deleteBtn.addEventListener("click", () => deleteDeltager(p.id));

                li.appendChild(nameSpan);
                li.appendChild(deleteBtn);
                deltagerListe.appendChild(li);
            });
        })
        .catch(err => console.error("Fejl i GET:", err));
}

// ---- Slet deltager ----

function deleteDeltager(id) {
    fetch(`${apiBase}/${id}`, { method: "DELETE" })
        .then(res => {
            if (!res.ok) {
                throw new Error("Kunne ikke slette deltager");
            }
            loadDeltagere();
        })
        .catch(err => console.error("Fejl i DELETE:", err));
}
