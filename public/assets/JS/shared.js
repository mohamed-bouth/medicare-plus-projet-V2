let loadedData = null;
async function loadData() {
    try {
        const response = await fetch('/admin/data/doctors.json');

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        loadedData = Array.isArray(data) ? data : [];

    }
    catch (error) {
        console.error("Erreur!:", error);
    }
}

let sat = {
    theme: 'light',
    favoriteDoctors: [],
    appointments: [],
    measurements: []
};

function loadState() {
    const savedState = localStorage.getItem('medicareState');
   
    if (savedState) {
        sat = JSON.parse(savedState);
    }
}




function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    applyTheme(sat.theme);
    themeToggle.addEventListener('click', function () {
        const newTheme = sat.theme === 'light' ? 'dark' : 'light';
     
        sat.theme = newTheme;
        applyTheme(newTheme);
        
        localStorage.setItem('medicareState', JSON.stringify(sat));
        
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