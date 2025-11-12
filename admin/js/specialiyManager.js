const toggle = document.getElementById("profileToggle");
const dropdownMenu = document.getElementById("dropdownMenu");
const openModalBtn = document.getElementById('openModalBtn');
const addSpecialityModal = document.getElementById('addSpecialityModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelBtn = document.getElementById('cancelBtn');
const specialityForm = document.getElementById('specialityForm');
const specialityTableBody = document.getElementById('specialityTableBody');

let speciality = [];

initializePage();

function initializePage() {
    loadSpecialities();
    initializeDropdown();
    
    if (openModalBtn && addSpecialityModal) {
        initializeModal();
    }
    
    if (specialityTableBody) {
        loadData();
    }
}

function initializeDropdown() {
    if (toggle && dropdownMenu) {
        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            dropdownMenu.classList.toggle('show');
        });
    }
}

function loadSpecialities() {
    const specialityStorage = localStorage.getItem("speciality");
    if (specialityStorage) {
        try {
            speciality = JSON.parse(specialityStorage);
        } catch (error) {
            console.error("Erreur lors du chargement des spécialités:", error);
            speciality = [];
        }
    }
}

function initializeModal() {
    if (openModalBtn) {
        openModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            closeModal();
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    }

    if (addSpecialityModal) {
        addSpecialityModal.addEventListener('click', (e) => {
            if (e.target === addSpecialityModal) {
                closeModal();
            }
        });
    }
    if (specialityForm) {
        specialityForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const specialityNomInput = document.getElementById('specialityNom');
    const descriptionInput = document.getElementById('description');

    if (!specialityNomInput || !descriptionInput) return;

    const specialityNom = specialityNomInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!specialityNom) {
        alert("Veuillez entrer un nom de spécialité");
        return;
    }
    const exists = speciality.some(sp => sp.name.toLowerCase() === specialityNom.toLowerCase());
    if (exists) {
        alert("Cette spécialité existe déjà");
        return;
    }

    const newSpeciality = {
        id: Date.now().toString(),
        name: specialityNom,
        description: description || "Aucune description"
    };

    speciality.push(newSpeciality);
    localStorage.setItem("speciality", JSON.stringify(speciality));

    if (specialityTableBody) {
        addSpecialityToTable(newSpeciality);
    }
    
    specialityForm.reset();
    closeModal();
    
    alert("Spécialité ajoutée avec succès !");
}

function openModal() {
    if (addSpecialityModal) {
        addSpecialityModal.style.display = 'flex';
    }
}

function closeModal() {
    if (addSpecialityModal) {
        addSpecialityModal.style.display = 'none';
    }
    if (specialityForm) {
        specialityForm.reset();
    }
}

function addSpecialityToTable(sp) {
    if (!specialityTableBody) return;

    const newRow = document.createElement('tr');
    newRow.setAttribute('data-id', sp.id);
    newRow.innerHTML = ` 
        <td>${sp.name}</td>
        <td>${sp.description}</td>
        <td class="d-flex flex-row justify-content-center gap-2">
            <button class="btn btn-sm btn-danger delete-btn" onclick="deleteSpeciality('${sp.id}')">
                <i class="fas fa-trash"></i>
            </button>
            <button class="btn btn-sm btn-primary edit-btn" onclick="editSpeciality('${sp.id}')">
                <i class="fas fa-edit"></i>
            </button>
        </td>
    `;
    specialityTableBody.appendChild(newRow);
}

function loadData() {
    if (!specialityTableBody) return;

    specialityTableBody.innerHTML = '';

    if (speciality.length === 0) {
        specialityTableBody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-muted">
                    Aucune spécialité enregistrée
                </td>
            </tr>
        `;
        return;
    }

    speciality.forEach((sp) => {
        addSpecialityToTable(sp);
    });
}

function deleteSpeciality(id) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette spécialité ?")) {
        speciality = speciality.filter(sp => sp.id !== id);
        localStorage.setItem("speciality", JSON.stringify(speciality));
        
        const row = document.querySelector(`tr[data-id="${id}"]`);
        if (row) {
            row.remove();
        }

        if (speciality.length === 0 && specialityTableBody) {
            loadData();
        }

        alert("Spécialité supprimée avec succès !");
    }
}

function editSpeciality(id) {
    const sp = speciality.find(s => s.id === id);
    if (!sp) return;

    const newName = prompt("Nouveau nom de la spécialité:", sp.name);
    if (!newName || newName.trim() === "") return;

    const newDescription = prompt("Nouvelle description:", sp.description);

    const index = speciality.findIndex(s => s.id === id);
    if (index !== -1) {
        speciality[index].name = newName.trim();
        speciality[index].description = newDescription ? newDescription.trim() : sp.description;
        
        localStorage.setItem("speciality", JSON.stringify(speciality));
        
        if (specialityTableBody) {
            loadData();
        }
        
        alert("Spécialité modifiée avec succès !");
    }
}