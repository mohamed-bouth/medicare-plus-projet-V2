let allAppointments = [];
let doctors = [];
let specialities = [];

window.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
});

function initializeDashboard() {
    loadAllData();
    initializeDropdown();
    initializeSearch();
}

function loadAllData() {
    allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    doctors = JSON.parse(localStorage.getItem('doctors')) || [];
    specialities = JSON.parse(localStorage.getItem('speciality')) || [];

    updateGlobalStats();
    updateSpecialtyStats();
    updateNotifications();
    displayAppointments();
}

function initializeDropdown() {
    const toggle = document.getElementById("profileToggle");
    const dropdownMenu = document.getElementById("dropdownMenu");

    if (toggle && dropdownMenu) {
        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            dropdownMenu.classList.toggle('show');
        });
    }
}

function updateGlobalStats() {
    const totalAppointments = allAppointments.length;
    const pendingAppointments = allAppointments.filter(a => a.appointmentStatus === 'pending').length;
    const doctorsOnline = doctors.filter(d => d.diponible === true).length;
    const doctorsOffline = doctors.filter(d => d.diponible === false).length;

    document.getElementById('stat-total').textContent = totalAppointments;
    document.getElementById('stat-pending').textContent = pendingAppointments;
    document.getElementById('stat-doctors-online').textContent = doctorsOnline;
    document.getElementById('stat-doctors-offline').textContent = doctorsOffline;
}

function updateSpecialtyStats() {
    const specialtyStatsContainer = document.getElementById('specialty-stats');
    specialtyStatsContainer.innerHTML = '';

    if (specialities.length === 0) {
        specialtyStatsContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info">Aucune spécialité enregistrée</div>
            </div>
        `;
        return;
    }

    specialities.forEach(specialty => {
        const doctorsCount = doctors.filter(d => d.specialty === specialty.name).length;
        
        const col = document.createElement('div');
        col.className = 'col-md-4 col-lg-3';
        
        col.innerHTML = `
            <div class="card shadow-sm text-center">
                <div class="card-body">
                    <h6 class="text-muted">${specialty.name}</h6>
                    <h4 class="text-primary fw-bold">${doctorsCount}</h4>
                    <small class="text-muted">médecin(s)</small>
                </div>
            </div>
        `;
        
        specialtyStatsContainer.appendChild(col);
    });
}

function updateNotifications() {
    const notificationsBox = document.getElementById('notificationsBox');
    notificationsBox.innerHTML = '';

    if (allAppointments.length === 0) {
        notificationsBox.innerHTML = `
            <div class="list-group-item text-center text-muted">
                Aucune notification pour le moment
            </div>
        `;
        return;
    }

    const latestAppointments = allAppointments.slice(-5).reverse();

    latestAppointments.forEach(app => {
        const item = document.createElement('div');
        item.className = 'list-group-item list-group-item-action';

        const statusColor = {
            pending: 'warning',
            accepted: 'success',
            rejected: 'danger'
        }[app.appointmentStatus] || 'secondary';

        item.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <strong>${app.patientName}</strong> a pris un rendez-vous avec 
                    <strong>${app.appointmentDoctor}</strong><br>
                    <small class="text-muted">
                        <i class="far fa-calendar me-1"></i>${new Date(app.appointmentDate).toLocaleDateString('fr-FR')} 
                        <i class="far fa-clock ms-2 me-1"></i>${app.appointmentTime}
                    </small>
                </div>
                <span class="badge bg-${statusColor}">${getStatusText(app.appointmentStatus)}</span>
            </div>
        `;

        notificationsBox.appendChild(item);
    });
}

function displayAppointments() {
    const appointmentsList = document.getElementById('appointmentsList');
    appointmentsList.innerHTML = '';

    if (allAppointments.length === 0) {
        appointmentsList.innerHTML = `
            <div class="alert alert-info text-center">
                <i class="fas fa-info-circle me-2"></i>Aucun rendez-vous enregistré
            </div>
        `;
        return;
    }

    const table = document.createElement('table');
    table.className = 'table table-hover table-striped';

    table.innerHTML = `
        <thead class="table-light">
            <tr>
                <th>Patient</th>
                <th>Médecin</th>
                <th>Date</th>
                <th>Heure</th>
                <th>Statut</th>
            </tr>
        </thead>
        <tbody id="appointmentsTableBody"></tbody>
    `;

    appointmentsList.appendChild(table);

    const tbody = document.getElementById('appointmentsTableBody');
    
    allAppointments.slice(-10).reverse().forEach(app => {
        const row = document.createElement('tr');
        
        const statusColor = {
            pending: 'warning',
            accepted: 'success',
            rejected: 'danger'
        }[app.appointmentStatus] || 'secondary';

        row.innerHTML = `
            <td>${app.patientName}</td>
            <td>${app.appointmentDoctor}</td>
            <td>${new Date(app.appointmentDate).toLocaleDateString('fr-FR')}</td>
            <td>${app.appointmentTime}</td>
            <td><span class="badge bg-${statusColor}">${getStatusText(app.appointmentStatus)}</span></td>
        `;

        tbody.appendChild(row);
    });
}

function getStatusText(status) {
    const texts = {
        pending: 'En attente',
        accepted: 'Accepté',
        rejected: 'Refusé'
    };
    return texts[status] || status;
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterAppointments(searchTerm);
        });
    }
}

function filterAppointments(searchTerm) {
    const tbody = document.getElementById('appointmentsTableBody');
    if (!tbody) return;

    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}