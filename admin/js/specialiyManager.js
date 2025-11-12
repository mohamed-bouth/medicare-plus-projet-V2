// ---------------- PROFILE DROPDOWN ----------------

let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

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
let specialityStorage = localStorage.getItem("speciality");
if (specialityStorage) {
    speciality = JSON.parse(specialityStorage);
}

// ---------------- HELPER FUNCTION ----------------

// تتحقق واش specialty مستعملة عند أي doctor
function canDeleteOrEditSpeciality(name) {
    return !doctors.some(doctor => doctor.specialty === name);
}

// ---------------- ADD SPECIALITY ----------------

specialityForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const specialityNom = document.getElementById('specialityNom').value.trim();
    const description = document.getElementById('description').value.trim();

    if (!specialityNom) return alert("Veuillez entrer le nom de la spécialité.");

    const newSpeciality = { name: specialityNom, description: description };

    speciality.push(newSpeciality);
    localStorage.setItem("speciality", JSON.stringify(speciality));

    addSpecialityToTable(newSpeciality);
    closeModal();
});

// ---------------- DISPLAY DATA ----------------

function loadData() {
    specialityTableBody.innerHTML = "";
    speciality.forEach(sp => addSpecialityToTable(sp));
}

function addSpecialityToTable(sp) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${sp.name}</td>
        <td>${sp.description}</td>
        <td class="d-flex flex-row justify-content-center gap-2">
            <button class="btn btn-sm deleteBtn">
                <img src="/admin/images/delete-icon.png" style="width:20px;" alt="Supprimer">
            </button>
            <button class="btn btn-sm editBtn">
                <img src="/admin/images/pencil-icon.png" style="width:20px;" alt="Modifier">
            </button>
        </td>
    `;

    // ---------------- DELETE BUTTON ----------------
    newRow.querySelector('.deleteBtn').addEventListener('click', () => {
        if (!canDeleteOrEditSpeciality(sp.name)) {
            alert("⚠️ Cette spécialité est utilisée par un médecin, suppression impossible !");
            return;
        }

        newRow.remove();
        speciality = speciality.filter(item => item.name !== sp.name);
        localStorage.setItem("speciality", JSON.stringify(speciality));
    });

    // ---------------- EDIT BUTTON ----------------
    newRow.querySelector('.editBtn').addEventListener('click', () => {
        if (!canDeleteOrEditSpeciality(sp.name)) {
            alert("⚠️ Cette spécialité est utilisée par un médecin, modification impossible !");
            return;
        }

        openModal();
        document.getElementById('specialityNom').value = sp.name;
        document.getElementById('description').value = sp.description;

        addBtn.textContent = "Modifier";
        addBtn.onclick = (event) => {
            event.preventDefault();
            sp.name = document.getElementById('specialityNom').value.trim();
            sp.description = document.getElementById('description').value.trim();
            localStorage.setItem("speciality", JSON.stringify(speciality));
            loadData();
            addBtn.textContent = "Ajouter";
            addBtn.onclick = null;
            closeModal();
        };
    });

    specialityTableBody.appendChild(newRow);
}

// ---------------- INITIAL LOAD ----------------
loadData();
