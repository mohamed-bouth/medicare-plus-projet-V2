document.addEventListener('DOMContentLoaded', function () {
    initializeHealthPage();
    initializeSearch();
});

function initializeHealthPage() {
    const measurementForm = document.getElementById('measurementForm');
    if (!measurementForm) return;

    const healthSection = document.getElementById('health');
    if (healthSection) {
        healthSection.classList.remove('d-none');
    }

    renderMeasurements();
    updateHealthStats();

    measurementForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addMeasurement();
    });

    const dateField = document.getElementById('measurementDate');
    if (dateField) {
        dateField.valueAsDate = new Date();
    }
}

function addMeasurement() {
    const date = document.getElementById('measurementDate').value;
    const type = document.getElementById('measurementType').value;
    const value = parseFloat(document.getElementById('measurementValue').value);

    const newMeasurement = {
        id: Date.now(),
        date,
        type,
        value
    };

    state.measurements.push(newMeasurement);
    saveState();
    renderMeasurements();
    updateHealthStats();

    document.getElementById('measurementForm').reset();
    const dateField = document.getElementById('measurementDate');
    if (dateField) {
        dateField.valueAsDate = new Date();
    }
}

function renderMeasurements() {
    const measurementsList = document.getElementById('measurements-list');

    if (!measurementsList) {
        return;
    }

    if (state.measurements.length === 0) {
        measurementsList.innerHTML = '<p class="text-muted">Aucune mesure enregistrée.</p>';
        return;
    }

    measurementsList.innerHTML = '';
    const sortedMeasurements = [...state.measurements].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    sortedMeasurements.forEach(measurement => {
        const measurementItem = document.createElement('div');
        measurementItem.className = 'measurement-item mb-3 p-3 border rounded';

        let typeLabel = '';
        let unit = '';

        switch (measurement.type) {
            case 'poids':
                typeLabel = 'Poids';
                unit = 'kg';
                break;
            case 'tension':
                typeLabel = 'Tension artérielle';
                unit = 'mmHg';
                break;
            case 'glycemie':
                typeLabel = 'Glycémie';
                unit = 'mg/dL';
                break;
        }

        measurementItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-1">${typeLabel}</h6>
                    <p class="mb-1">${measurement.value} ${unit}</p>
                    <p class="mb-0"><small>${formatDate(measurement.date)}</small></p>
                </div>
                <div>
                    <button class="btn btn-outline-danger btn-sm" onclick="deleteMeasurement(${measurement.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
            <div class="health-indicator ${getHealthIndicatorClass(measurement.type, measurement.value)}"></div>
        `;

        measurementsList.appendChild(measurementItem);
    });
}

function getHealthIndicatorClass(type, value) {
    switch (type) {
        case 'poids':
            if (value >= 50 && value <= 90) return 'health-good';
            if ((value >= 45 && value < 50) || (value > 90 && value <= 100)) return 'health-warning';
            return 'health-danger';

        case 'tension':
            if (value >= 90 && value <= 120) return 'health-good';
            if ((value >= 80 && value < 90) || (value > 120 && value <= 140)) return 'health-warning';
            return 'health-danger';

        case 'glycemie':
            if (value >= 70 && value <= 100) return 'health-good';
            if ((value >= 60 && value < 70) || (value > 100 && value <= 125)) return 'health-warning';
            return 'health-danger';

        default:
            return 'health-good';
    }
}

function deleteMeasurement(measurementId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette mesure?')) {
        state.measurements = state.measurements.filter(m => m.id !== measurementId);
        saveState();
        renderMeasurements();
        updateHealthStats();
    }
}

function updateHealthStats() {
    const healthStats = document.getElementById('healthStats');
    if (!healthStats) return;

    if (state.measurements.length === 0) {
        healthStats.innerHTML = '<p class="text-muted">Aucune donnée disponible.</p>';
        return;
    }

    const types = ['poids', 'tension', 'glycemie'];
    let statsHTML = '';

    types.forEach(type => {
        const measurements = state.measurements.filter(m => m.type === type);

        if (measurements.length > 0) {
            const sum = measurements.reduce((total, m) => total + m.value, 0);
            const average = sum / measurements.length;

            let typeLabel = '';
            let unit = '';

            switch (type) {
                case 'poids':
                    typeLabel = 'Poids moyen';
                    unit = 'kg';
                    break;
                case 'tension':
                    typeLabel = 'Tension moyenne';
                    unit = 'mmHg';
                    break;
                case 'glycemie':
                    typeLabel = 'Glycémie moyenne';
                    unit = 'mg/dL';
                    break;
            }

            statsHTML += `
                <div class="mb-3">
                    <h6>${typeLabel}</h6>
                    <p class="mb-1">${average.toFixed(2)} ${unit}</p>
                    <div class="health-indicator ${getHealthIndicatorClass(type, average)}"></div>
                </div>
            `;
        }
    });

    statsHTML.innerHTML = statsHTML || '<p class="text-muted">Aucune donnée disponible.</p>';
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        filterMeasurements(searchTerm);
    });
}

function filterMeasurements(searchTerm) {
    const measurementItems = document.querySelectorAll('.measurement-item');

    measurementItems.forEach(item => {
        const type = item.querySelector('h6').textContent.toLowerCase();
        const value = item.querySelector('p').textContent.toLowerCase();
        const date = item.querySelectorAll('p')[1].textContent.toLowerCase();

        if (type.includes(searchTerm) || value.includes(searchTerm) || date.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}