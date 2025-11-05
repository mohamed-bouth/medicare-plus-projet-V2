const doctorsData = [
    { id: 1, name: "Dr. Ahmed ben Alam", specialty: "cardiologue", image: "../assets/images/doctor2.png", available: true, description: "Cardiologue expérimenté avec plus de 15 ans d'expérience." },
    { id: 2, name: "Dr. Chaymae Halimi", specialty: "dermatologue", image: "../assets/images/doctor.png", available: true, description: "Spécialiste des maladies de la peau et des soins esthétiques." },
    { id: 3, name: "Dr. Soufian Talbi", specialty: "pediatre", image: "../assets/images/doctor3.png", available: false, description: "Pédiatre dévoué avec une approche douce pour les enfants." },
    { id: 4, name: "Dr. Rajae Slimani", specialty: "generaliste", image: "../assets/images/doctor4.png", available: true, description: "Médecin généraliste avec une approche holistique de la santé." },
    { id: 5, name: "Dr. Walid El Baghdadi", specialty: "ophtalmologue", image: "../assets/images/doctor5.png", available: true, description: "Ophtalmologue spécialisé dans les troubles de la vision." },
    { id: 6, name: "Dr. Romaysae Benkhlif", specialty: "cardiologue", image: "../assets/images/Jean.png", available: true, description: "Cardiologue spécialisée en prévention des maladies cardiaques." }
];

let state = {
    theme: 'light',
    favoriteDoctors: [],
    appointments: [],
    measurements: []
};

function loadState() {
    const savedState = localStorage.getItem('medicareState');
    if (savedState) {
        state = JSON.parse(savedState);
    }
}

function saveState() {
    localStorage.setItem('medicareState', JSON.stringify(state));
}

function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    applyTheme(state.theme);
    themeToggle.addEventListener('click', function () {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        state.theme = newTheme;
        applyTheme(newTheme);
        saveState();
    });
}

function applyTheme(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }
}

function getSpecialtyName(specialty) {
    const specialties = {
        'cardiologue': 'Cardiologie',
        'dermatologue': 'Dermatologie',
        'pediatre': 'Pédiatrie',
        'generaliste': 'Médecine générale',
        'ophtalmologue': 'Ophtalmologie'
    };
    return specialties[specialty] || specialty;
}

function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

document.addEventListener('DOMContentLoaded', function () {
    loadState();
    initializeTheme();
});