

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