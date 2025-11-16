// ---------------- PROFILE DROPDOWN ----------------

const profileToggle = document.getElementById("profileToggle");
const dropdownMenu = document.getElementById("dropdownMenu");

function toggleMenu() {
    dropdownMenu.classList.toggle('show');
}

profileToggle.addEventListener('click', (event) => {
    event.preventDefault();
    toggleMenu();
});

// ---------------- MODAL MANAGEMENT ----------------

const openModalBtn = document.getElementById('openModalBtn');
const addSpecialityModal = document.getElementById('addSpecialityModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelBtn = document.getElementById('cancelBtn');
const addBtn = document.getElementById('ajoute');

function openModal() {
    addSpecialityModal.style.display = 'flex';
}

function closeModal() {
    addSpecialityModal.style.display = 'none';
    specialityForm.reset();
}

openModalBtn.addEventListener('click', () => openModal());
closeModalBtn.addEventListener('click', () => closeModal());
cancelBtn.addEventListener('click', () => closeModal());

// ---------------- LOCAL STORAGE & VARIABLES ----------------

const specialityForm = document.getElementById('specialityForm');
const specialityTableBody = document.getElementById('specialityTableBody');

let speciality = [];
let specialityStorage = [];

specialityStorage = localStorage.getItem("speciality");
if (specialityStorage) {
    speciality = JSON.parse(specialityStorage);
}

function isSpecialityPage() {
    return window.location.pathname.includes("specialite.html");
}

// ---------------- ADD SPECIALITY ----------------

specialityForm.addEventListener('submit', (e) => {
    e.preventDefault();


    const specialityNom = document.getElementById('specialityNom').value.trim();
    const description = document.getElementById('description').value.trim();

    if (!specialityNom) return alert("Veuillez entrer le nom de la spécialité.");

    const newSpeciality = {
        name: specialityNom,
        description: description
    };

    speciality.push(newSpeciality);
    localStorage.setItem("speciality", JSON.stringify(speciality));

    addSpecialityToTable(newSpeciality);
    closeModal();
});

// ---------------- DISPLAY DATA ----------------

function loadData() {
    specialityTableBody.innerHTML = "";
    speciality.forEach(sp => {
        addSpecialityToTable(sp);
    });
}
loadData();

function addSpecialityToTable(sp) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${sp.name}</td>
        <td>${sp.description}</td>
        <td class="d-flex flex-row justify-content-center gap-2">
            <button class="btn btn-sm deleteBtn">
                <img src="../images/delete-icon.png" style="width:20px;" alt="Supprimer">
            </button>
            <button class="btn btn-sm editBtn">
                <img src="../images/pencil-icon.png" style="width:20px;" alt="Modifier">
            </button>
        </td>
    `;

    // DELETE BUTTON
    newRow.querySelector('.deleteBtn').addEventListener('click', () => {

        const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
        const isUsed = doctors.some(doc => doc.specialty === sp.name);

        if (isUsed) {
            alert(`Impossible de supprimer la spécialité "${sp.name}" car elle est déjà attribuée à un médecin.`);
            return;
        }

        newRow.remove();
        speciality = speciality.filter(item => item.name !== sp.name);
        localStorage.setItem("speciality", JSON.stringify(speciality));
        alert(`✅ La spécialité "${sp.name}" a été supprimée avec succès.`);
    });

    // EDIT BUTTON
    newRow.querySelector('.editBtn').addEventListener('click', () => {

        const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
        const isUsed = doctors.some(doc => doc.specialty === sp.name);

        if (isUsed) {
            alert(`Impossible de modifier la spécialité "${sp.name}" car elle est déjà attribuée à un médecin.`);
            return; // stop editing
        }

        openModal();
        document.getElementById('specialityNom').value = sp.name;
        document.getElementById('description').value = sp.description;



        // Temporarily change the Add button to "Modifier"
        addBtn.textContent = "Modifier";
        addBtn.onclick = (event) => {
            event.preventDefault();
            sp.name = document.getElementById('specialityNom').value.trim();
            sp.description = document.getElementById('description').value.trim();
            localStorage.setItem("speciality", JSON.stringify(speciality));
            loadData();

            alert(` La spécialité "${sp.name}" a été modifiée avec succès.`);
            addBtn.textContent = "Ajouter";
            addBtn.onclick = null;
            closeModal();
        };

    });

    specialityTableBody.appendChild(newRow);
}
// ===========================================

const totalS = JSON.parse(localStorage.getItem("speciality")) || 0 ;
const totalSpeaciality = totalS.length;
console.log(totalSpeaciality)

document.getElementById("totalS").textContent = totalSpeaciality;

const totalD = JSON.parse(localStorage.getItem("doctors")) || 0;
const totalDoctor = totalD.length;
document.getElementById("totalD").textContent = totalDoctor;



loadData();