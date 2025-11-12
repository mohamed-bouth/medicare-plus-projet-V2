const btn = document.querySelector(".btn");
const successMsg = document.getElementById("successMsg");
const selectMedcin = document.getElementById("selectMedcin");
const checkboxes = document.querySelectorAll("input[type='checkbox']");

let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
let selectedDoctorId = null;

initializePage();

function initializePage() {
    loadDoctorsToSelect();
    initializeEventListeners();
}

function loadDoctorsToSelect() {
    while (selectMedcin.options.length > 1) {
        selectMedcin.remove(1);
    }

    doctors.forEach(doctor => {
        const option = document.createElement("option");
        option.value = doctor.id;
        option.textContent = doctor.name;
        selectMedcin.appendChild(option);
    });
}

function initializeEventListeners() {
    selectMedcin.addEventListener("change", () => {
        selectedDoctorId = selectMedcin.value;
        if (selectedDoctorId) {
            loadDoctorAvailability(selectedDoctorId);
        } else {
            resetCheckboxes();
        }
    });
    btn.addEventListener("click", saveDoctorAvailability);
}

function loadDoctorAvailability(doctorId) {
    const doctor = doctors.find(d => d.id === doctorId);
    
    if (!doctor) return;
    resetCheckboxes();
    if (doctor.days) {
        checkboxes.forEach((checkbox, index) => {
            const dayNames = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
            const dayName = dayNames[index];
            checkbox.checked = doctor.days[dayName] || false;
        });
    }
}

function resetCheckboxes() {
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

function saveDoctorAvailability() {
    if (!selectedDoctorId) {
        showMessage("Veuillez choisir un médecin !", "warning");
        return;
    }

    const hasCheckedDay = Array.from(checkboxes).some(checkbox => checkbox.checked);
    
    if (!hasCheckedDay) {
        showMessage("Veuillez sélectionner au moins un jour !", "warning");
        return;
    }
    const doctorIndex = doctors.findIndex(d => d.id === selectedDoctorId);
    
    if (doctorIndex === -1) {
        showMessage("Médecin introuvable !", "danger");
        return;
    }
    if (!doctors[doctorIndex].days) {
        doctors[doctorIndex].days = {
            Lundi: false,
            Mardi: false,
            Mercredi: false,
            Jeudi: false,
            Vendredi: false,
            Samedi: false,
            Dimanche: false
        };
    }
    const dayNames = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    checkboxes.forEach((checkbox, index) => {
        const dayName = dayNames[index];
        doctors[doctorIndex].days[dayName] = checkbox.checked;
    });
    doctors[doctorIndex].diponible = hasCheckedDay;
    localStorage.setItem("doctors", JSON.stringify(doctors));

    showMessage("Disponibilités mises à jour avec succès !", "success");
}

function showMessage(message, type) {
    successMsg.textContent = message;
    successMsg.classList.remove("d-none", "bg-success-subtle", "bg-warning", "bg-danger");
    
    if (type === "success") {
        successMsg.classList.add("bg-success-subtle", "text-success", "border", "border-success");
    } else if (type === "warning") {
        successMsg.classList.add("bg-warning", "text-dark", "border", "border-warning");
    } else if (type === "danger") {
        successMsg.classList.add("bg-danger", "text-white", "border", "border-danger");
    }
    setTimeout(() => {
        successMsg.classList.add("d-none");
    }, 3000);
}