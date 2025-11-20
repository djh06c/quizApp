const apiBase = "/api/deltagere";
const quizApi = "/api/quiz/date";

const nameInput = document.getElementById("nameInput");
const signupBtn = document.getElementById("signupBtn");
const deltagerListe = document.getElementById("deltagerListe");
const quizDateLabel = document.getElementById("quizDateLabel");

document.addEventListener("DOMContentLoaded", () => {
    loadQuizDate();
    loadDeltagere();
});

function loadQuizDate(){
    fetch(quizApi)
        .then(res => res.json())
        .then(data => {
            const d = new Date(data.quizDate);
            quizDateLabel.textContent = d.toLocaleDateString("da-DK", {
                weekday: "long",
                day: "numeric",
                month: "long"
            });
        })
        .catch(err => console.error("Fejl i quizdato:", err));
}

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
            loadDeltagere();
        })
        .catch(err => console.error(err));
});

function loadDeltagere() {
    fetch(apiBase)
        .then(res => res.json())
        .then(data => {
            console.log("Deltagere fra backend:", data);

            document.getElementById("deltagerCount").textContent = data.length;
            deltagerListe.innerHTML = "";
            data.forEach(p => {
                const li = document.createElement("li");
                li.textContent = p.name;

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Slet";
                deleteBtn.addEventListener("click", () => deleteDeltager(p.id));

                li.appendChild(deleteBtn);
                deltagerListe.appendChild(li);
            });
        })
        .catch(err => console.error(err));
}

function deleteDeltager(id) {
    fetch(`${apiBase}/${id}`, { method: "DELETE" })
        .then(res => {
            if (!res.ok) {
                throw new Error("Kunne ikke slette deltager");
            }
            loadDeltagere();
        })
        .catch(err => console.error(err));
}
