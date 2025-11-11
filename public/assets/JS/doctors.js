let doctorsData = JSON.parse(localStorage.getItem("doctors")) || []

// const doctorsData = [
//     { id: 1, name: "Dr. Ahmed ben Alam", specialty: "cardiologue", image: "../assets/images/doctor2.png", available: true, description: "Cardiologue expérimenté avec plus de 15 ans d'expérience." },
//     { id: 2, name: "Dr. Chaymae Halimi", specialty: "dermatologue", image: "../assets/images/doctor.png", available: true, description: "Spécialiste des maladies de la peau et des soins esthétiques." },
//     { id: 3, name: "Dr. Soufian Talbi", specialty: "pediatre", image: "../assets/images/doctor3.png", available: false, description: "Pédiatre dévoué avec une approche douce pour les enfants." },
//     { id: 4, name: "Dr. Rajae Slimani", specialty: "generaliste", image: "../assets/images/doctor4.png", available: true, description: "Médecin généraliste avec une approche holistique de la santé." },
//     { id: 5, name: "Dr. Walid El Baghdadi", specialty: "ophtalmologue", image: "../assets/images/doctor5.png", available: true, description: "Ophtalmologue spécialisé dans les troubles de la vision." },
//     { id: 6, name: "Dr. Romaysae Benkhlif", specialty: "cardiologue", image: "../assets/images/Jean.png", available: true, description: "Cardiologue spécialisée en prévention des maladies cardiaques." }
// ];

//  const doctor = {
//         id: Date.now(),
//         name: nameValue,
//         specialty: specialtyValue,
//         diponible: trans,
//         description: descriptionValue,
//     }

document.addEventListener('DOMContentLoaded', function () {
    initializeDoctorsPage();
    initializeSearch();
});

function initializeDoctorsPage() {
    const specialtyFilter = document.getElementById('specialtyFilter');
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
    const doctorsList = document.getElementById('doctorsList');
    if (!doctorsList) return;

    const specialtyFilter = document.getElementById('specialtyFilter');
    const selectedSpecialty = specialtyFilter ? specialtyFilter.value : 'all';

    let filteredDoctors = doctorsData;
    if (selectedSpecialty !== 'all') {
        filteredDoctors = doctorsData.filter(doctor => doctor.specialty === selectedSpecialty);
    }
    doctorsList.innerHTML = '';

    filteredDoctors.forEach(doctor => {
        const isFavorite = state.favoriteDoctors.includes(doctor.id);
        const availabilityBadge = doctor.available ?
            '<span class="badge" style="background-color: #10b981; padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 500;">Disponible</span>' :
            '<span class="badge" style="background-color: #ef4444; padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 500;">Indisponible</span>';

        const doctorCard = document.createElement('div');
        doctorCard.className = 'col-md-6 col-lg-4 mb-4';
        let text
        if(doctor.diponible ===  true){
            text = "disponible"
            doctorCard.innerHTML = `
            <div class="card doctor-card h-100">
                <div class="position-relative">
                    <img src="${doctor.image}" class="card-img-top" alt="${doctor.name}" style="width:120px; object-fit: cover;">
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${doctor.id}">
                        <i class="bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}"></i>
                    </button>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${doctor.name}</h5>
                    <p class="card-text">
                        <span class="badge bg-primary">${getSpecialtyName(doctor.specialty)}</span>
                        <span class="badge bg-success">${text}</span>
                    </p>
                    <p class="card-text">${doctor.description}</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary" onclick="selectDoctorForAppointment(${doctor.id})">Prendre Rendez-vous</button>
                </div>
            </div>
        `;

        }else{
            text = "non disponible"
            doctorCard.innerHTML = `
            <div class="card doctor-card h-100">
                <div class="position-relative">
                    <img src="${doctor.image}" class="card-img-top" alt="${doctor.name}" style="width:120px; object-fit: cover;">
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${doctor.id}">
                        <i class="bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}"></i>
                    </button>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${doctor.name}</h5>
                    <p class="card-text">
                        <span class="badge bg-primary">${getSpecialtyName(doctor.specialty)}</span>
                        <span class="badge bg-danger">${text}</span>
                    </p>
                    <p class="card-text">${doctor.description}</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary" onclick="selectDoctorForAppointment(${doctor.id})">Prendre Rendez-vous</button>
                </div>
            </div>
        `;
        }
        

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