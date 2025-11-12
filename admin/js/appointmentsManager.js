<<<<<<< HEAD
let loadedDoctors = [];
let appointments = [];
let allAppointments = [];

window.addEventListener('DOMContentLoaded', () => {
    loadDoctors();
    loadAppointments();
    initializeFilters();
    initializeDropdown();
});

async function loadData() {
    try {
        const response = await fetch('/admin/data/doctors.json');
        if (!response.ok) throw new Error('Erreur de chargement');
        return await response.json();
    } catch (error) {
        console.error("Erreur lors du chargement des données JSON:", error);
        return [];
    }
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

async function loadDoctors() {
    loadedDoctors = await loadData();
    const filterDoctor = document.getElementById('filterDoctor');
    
    if (!filterDoctor) return;

    while (filterDoctor.options.length > 1) {
        filterDoctor.remove(1);
    }

    loadedDoctors.forEach((doctor) => {
        const option = document.createElement('option');
        option.textContent = doctor.name;
        option.value = doctor.name;
        filterDoctor.appendChild(option);
    });
}

function loadAppointments() {
    allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments = [...allAppointments];
    renderAppointments();
    updateStats();
}

function renderAppointments() {
    const appointmentsList = document.getElementById('appointmentsList');
    const appointmentCount = document.getElementById('appointmentCount');

    if (!appointmentsList || !appointmentCount) return;

    appointmentsList.innerHTML = '';

    if (appointments.length === 0) {
        appointmentsList.innerHTML = `
            <div class="alert alert-info text-center">
                <i class="fas fa-info-circle"></i> Aucun rendez-vous enregistré dans le système.
            </div>`;
        appointmentCount.textContent = '0';
        return;
    }

    appointmentCount.textContent = appointments.length;

    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-responsive';

=======
const totalrondez = document.getElementById("stat-total")
const rondezEnattente = document.getElementById("stat-pending")
const rondezAccptes = document.getElementById("stat-accepted")
const rondezRefuses = document.getElementById("stat-rejected")

allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

console.log(allAppointments)

function renderStatistique() {
    totalrondez.textContent = allAppointments.length
}

function getStatusText(status) {
    const texts = {
        pending: 'En attente',
        accepted: 'Accepté',
        rejected: 'Refusé'
    };
    return texts[status] || status;
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
>>>>>>> 2c4558a44d48feea2abc974a093a747bf3928a70
    const table = document.createElement('table');
    table.className = 'table table-hover align-middle';

    const thead = document.createElement('thead');
    thead.className = 'table-light';
    thead.innerHTML = `
        <tr>
            <th><i class="fas fa-user me-1"></i>Patient</th>
            <th><i class="fas fa-envelope me-1"></i>Email</th>
            <th><i class="fas fa-user-md me-1"></i>Médecin</th>
            <th><i class="fas fa-calendar me-1"></i>Date</th>
            <th><i class="fas fa-clock me-1"></i>Heure</th>
            <th><i class="fas fa-info-circle me-1"></i>Statut</th>
            <th class="text-center">Actions</th>
        </tr>
    `;

    const tbody = document.createElement('tbody');

    appointments.forEach(app => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${app.patientName}</td>
            <td>${app.patientEmail}</td>
            <td>${app.appointmentDoctor}</td>
            <td>${new Date(app.appointmentDate).toLocaleDateString('fr-FR')}</td>
            <td>${app.appointmentTime}</td>
            <td><span class="badge bg-${statusColor(app.appointmentStatus)}">${statusText(app.appointmentStatus)}</span></td>
        `;

        const tdActions = document.createElement('td');
        tdActions.className = 'text-center';

        const btnGroup = document.createElement('div');
        btnGroup.className = 'btn-group btn-group-sm';

        const btnAccept = document.createElement('button');
        btnAccept.className = 'btn btn-success';
        btnAccept.innerHTML = '<i class="fas fa-check"></i>';
        btnAccept.onclick = () => changeStatus(app.id, 'accepted');
        btnAccept.title = 'Accepter';

        const btnReject = document.createElement('button');
        btnReject.className = 'btn btn-danger';
        btnReject.innerHTML = '<i class="fas fa-times"></i>';
        btnReject.onclick = () => changeStatus(app.id, 'rejected');
        btnReject.title = 'Refuser';

        btnGroup.appendChild(btnAccept);
        btnGroup.appendChild(btnReject);
        tdActions.appendChild(btnGroup);
        tr.appendChild(tdActions);

        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);
    appointmentsList.appendChild(tableContainer);
}

function updateStats() {
    const total = allAppointments.length;
    const pending = allAppointments.filter(a => a.appointmentStatus === 'pending').length;
    const accepted = allAppointments.filter(a => a.appointmentStatus === 'accepted').length;
    const rejected = allAppointments.filter(a => a.appointmentStatus === 'rejected').length;

    const statTotal = document.getElementById('stat-total');
    const statPending = document.getElementById('stat-pending');
    const statAccepted = document.getElementById('stat-accepted');
    const statRejected = document.getElementById('stat-rejected');

    if (statTotal) statTotal.textContent = total;
    if (statPending) statPending.textContent = pending;
    if (statAccepted) statAccepted.textContent = accepted;
    if (statRejected) statRejected.textContent = rejected;
}

<<<<<<< HEAD
function changeStatus(id, newStatus) {
    allAppointments = allAppointments.map(app =>
        app.id === id ? { ...app, appointmentStatus: newStatus } : app
    );
    localStorage.setItem('appointments', JSON.stringify(allAppointments));
    loadAppointments();
}

function statusColor(status) {
    const colors = {
        pending: 'warning',
        accepted: 'success',
        rejected: 'danger'
    };
    return colors[status] || 'secondary';
}

function statusText(status) {
    const texts = {
        pending: 'En attente',
        accepted: 'Accepté',
        rejected: 'Refusé'
    };
    return texts[status] || status;
}

function removeAllData() {
    if (allAppointments.length === 0) {
        alert('Il n\'y a aucun rendez-vous pour le moment.');
        return;
    }

    if (confirm('Voulez-vous vraiment effacer tous les rendez-vous ?')) {
        localStorage.removeItem('appointments');
        allAppointments = [];
        appointments = [];
        renderAppointments();
        updateStats();
        alert('Toutes les données ont été effacées avec succès.');
    }
}

function initializeFilters() {
    const searchInput = document.getElementById('searchInput');
    const filterStatus = document.getElementById('filterStatus');
    const filterDoctor = document.getElementById('filterDoctor');

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    if (filterStatus) {
        filterStatus.addEventListener('change', applyFilters);
    }

    if (filterDoctor) {
        filterDoctor.addEventListener('change', applyFilters);
    }
}

function applyFilters() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('filterStatus')?.value || 'all';
    const doctorFilter = document.getElementById('filterDoctor')?.value || 'all';

    appointments = allAppointments.filter(app => {
        const matchesSearch = 
            app.patientName.toLowerCase().includes(searchTerm) ||
            app.patientEmail.toLowerCase().includes(searchTerm) ||
            app.appointmentDoctor.toLowerCase().includes(searchTerm);

        const matchesStatus = statusFilter === 'all' || app.appointmentStatus === statusFilter;
        const matchesDoctor = doctorFilter === 'all' || app.appointmentDoctor === doctorFilter;

        return matchesSearch && matchesStatus && matchesDoctor;
    });

    renderAppointments();
}
=======
displayAppointments()
renderStatistique()
>>>>>>> 2c4558a44d48feea2abc974a093a747bf3928a70
