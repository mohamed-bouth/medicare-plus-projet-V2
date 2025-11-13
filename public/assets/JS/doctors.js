let doctors = JSON.parse(localStorage.getItem("doctors")) || []

let speciality = JSON.parse(localStorage.getItem("speciality"))
console.log(speciality)

loadedData = doctors

console.log(loadedData)

document.addEventListener('DOMContentLoaded', function () {
    initializeDoctorsPage();
    initializeSearch();
});

async function initializeDoctorsPage() {
    await loadData();

    if (!loadedData) {
        console.error("Impossible de charger les données");
        return;
    }

    const specialtyFilter = document.getElementById("specialtyFilter");

    speciality.forEach(element => {
        const optionfilter = document.createElement("option");
        optionfilter.textContent = element.name;
        specialtyFilter.appendChild(optionfilter);
    });

    const doctorsList = document.getElementById('doctorsList');

    if (!doctorsList) return;
    const doctorsSection = document.getElementById('doctors');
    if (doctorsSection) {
        doctorsSection.classList.remove('d-none');
    }

    renderDoctors();

    if (specialtyFilter) {
        specialtyFilter.addEventListener('change', function () {
            renderDoctors();
        });
    }
}

function renderDoctors() {
    console.log(loadedData)
    if (!loadedData) return;

    const doctorsList = document.getElementById('doctorsList');
    if (!doctorsList) return;

    const specialtyFilter = document.getElementById('specialtyFilter');
    const selectedSpecialty = specialtyFilter ? specialtyFilter.value : 'all';

    let filteredDoctors = loadedData;
    if (selectedSpecialty !== 'all') {
        filteredDoctors = loadedData.filter(doctor => doctor.specialty === selectedSpecialty);
    }
    doctorsList.innerHTML = '';

    filteredDoctors.forEach(doctor => {
        const isFavorite = sat.favoriteDoctors.includes(doctor.id);
        const availabilityBadge = doctor.diponible ?
            '<span class="badge" style="background-color: #10b981; padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 500;">Disponible</span>' :
            '<span class="badge" style="background-color: #ef4444; padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 500;">Indisponible</span>';

        const doctorCard = document.createElement('div');
        doctorCard.className = 'col-md-6 col-lg-4 mb-4';
        doctorCard.innerHTML = `
            <div class="card doctor-card h-100">
                <div class="position-relative">
                    <img src="${doctor.url}" class="card-img-top" alt="${doctor.name}" style="width:120px; object-fit: cover;">
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${doctor.id}">
                        <i class="bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}"></i>
                    </button>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${doctor.name}</h5>
                    <p class="card-text">
                        <span class="badge bg-primary">${getSpecialtyName(doctor.specialty)}</span>
                        ${availabilityBadge}
                    </p>
                    <p class="card-text">${doctor.description}</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary" onclick="selectDoctorForAppointment(${doctor.id})">Prendre Rendez-vous</button>
                </div>
            </div>
        `;

        doctorsList.appendChild(doctorCard);
    });

    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', function () {
            const doctorId = parseInt(this.getAttribute('data-id'));
            toggleFavoriteDoctor(doctorId);
        });
    });
}

function toggleFavoriteDoctor(doctorId) {
    const index = state.favoriteDoctors.indexOf(doctorId);

    if (index === -1) {
        state.favoriteDoctors.push(doctorId);
    } else {
        state.favoriteDoctors.splice(index, 1);
    }

    saveState();
    renderDoctors();
}

function selectDoctorForAppointment(doctorId) {
    localStorage.setItem('selectedDoctorId', doctorId);
    window.location.href = '/public/pages/appointments.html';
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        filterDoctors(searchTerm);
    });
}

function filterDoctors(searchTerm) {
    const doctorCards = document.querySelectorAll('.doctor-card');

    doctorCards.forEach(card => {
        const doctorName = card.querySelector('.card-title').textContent.toLowerCase();
        const doctorSpecialty = card.querySelector('.badge').textContent.toLowerCase();
        if (doctorName.includes(searchTerm) || doctorSpecialty.includes(searchTerm)) {
            card.parentElement.style.display = 'block';
        } else {
            card.parentElement.style.display = 'none';
        }
    });
}