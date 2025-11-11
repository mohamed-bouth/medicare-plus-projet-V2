let loadedDoctors = null;
let appointments = [];
let allAppointments = [];

window.addEventListener('DOMContentLoaded', () => {
    loadDoctors();
    loadAppointments();
});

async function loadData() {
    try {
        const response = await fetch('/admin/data/doctors.json');
        loadedDoctors = await response.json();
    } catch (error) {
        console.error("Error loading json data.", error);
    }
}

const filterDoctor = document.getElementById('filterDoctor');

async function loadDoctors(){
    await loadData();
    loadedDoctors.forEach((doctor) => {
        const option = document.createElement('option');
        option.innerText = doctor.name;
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

    appointmentsList.innerHTML = '';

    if (appointments.length === 0) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-info text-center';
        const icon = document.createElement('i');
        icon.className = 'fas fa-info-circle';
        alert.appendChild(icon);
        alert.appendChild(document.createTextNode(' Aucun rendez-vous enregistré dans le système.'));
        appointmentsList.appendChild(alert);
        appointmentCount.textContent = '0';
        return;
    }

    appointmentCount.textContent = appointments.length;

    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-responsive';

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

        const tdName = document.createElement('td');
        tdName.textContent = app.patientName;

        const tdEmail = document.createElement('td');
        tdEmail.textContent = app.patientEmail;

        const tdDoctor = document.createElement('td');
        tdDoctor.textContent = app.appointmentDoctor;

        const tdDate = document.createElement('td');
        tdDate.textContent = new Date(app.appointmentDate).toLocaleDateString('fr-FR');

        const tdTime = document.createElement('td');
        tdTime.textContent = app.appointmentTime;

        const tdStatus = document.createElement('td');
        const statusBadge = document.createElement('span');
        statusBadge.className = `badge bg-${statusColor(app.appointmentStatus)}`;
        statusBadge.textContent = statusText(app.appointmentStatus);
        tdStatus.appendChild(statusBadge);

        const tdActions = document.createElement('td');
        tdActions.className = 'text-center';

        const btnGroup = document.createElement('div');
        btnGroup.className = 'btn-group btn-group-sm';

        const btnAccept = document.createElement('button');
        btnAccept.className = 'btn btn-success';
        btnAccept.innerHTML = '<i class="fas fa-check"></i>';
        btnAccept.title = 'Accepter';
        btnAccept.onclick = () => changeStatus(app.id, 'accepted');

        const btnReject = document.createElement('button');
        btnReject.className = 'btn btn-danger';
        btnReject.innerHTML = '<i class="fas fa-times"></i>';
        btnReject.title = 'Refuser';
        btnReject.onclick = () => changeStatus(app.id, 'rejected');

        btnGroup.appendChild(btnAccept);
        btnGroup.appendChild(btnReject);
        tdActions.appendChild(btnGroup);

        tr.appendChild(tdName);
        tr.appendChild(tdEmail);
        tr.appendChild(tdDoctor);
        tr.appendChild(tdDate);
        tr.appendChild(tdTime);
        tr.appendChild(tdStatus);
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

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-pending').textContent = pending;
    document.getElementById('stat-accepted').textContent = accepted;
    document.getElementById('stat-rejected').textContent = rejected;
}

function changeStatus(id, nouveauStatut) {
    allAppointments = allAppointments.map(app => {
        if (app.id === id) {
            return { ...app, appointmentStatus: nouveauStatut };
        }
        return app;
    });
    localStorage.setItem('appointments', JSON.stringify(allAppointments));
    loadAppointments();
}

function statusColor(status) {
    const colors = {
        'pending': 'warning',
        'accepted': 'success',
        'rejected': 'danger',
    };
    return colors[status] || 'secondary';
}

function statusText(status) {
    const texts = {
        'pending': 'En attente',
        'accepted': 'Accepté',
        'rejected': 'Refusé',
    };
    return texts[status] || status;
}

function removeAllData() {

    if(allAppointments == []) {
        alert('Y a aucun rendez-vous pour le moment.');
        return
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

document.getElementById('searchInput')?.addEventListener('keyup', function () {
    const searchTerm = this.value.toLowerCase();
    filterAppointments(searchTerm);
});

function filterAppointments(searchTerm = '') {
    if (searchTerm === '') {
        appointments = [...allAppointments];
        renderAppointments();
        return;
    }

    appointments = allAppointments.filter(app =>
        app.patientName.toLowerCase().includes(searchTerm) ||
        app.patientEmail.toLowerCase().includes(searchTerm) ||
        app.appointmentDoctor.toLowerCase().includes(searchTerm)
    );

    const appointmentsList = document.getElementById('appointmentsList');
    const appointmentCount = document.getElementById('appointmentCount');

    if (appointments.length === 0) {
        appointmentsList.innerHTML = '';
        const alert = document.createElement('div');
        alert.className = 'alert alert-warning text-center';
        const icon = document.createElement('i');
        icon.className = 'fas fa-search';
        alert.appendChild(icon);
        alert.appendChild(document.createTextNode(` Aucun rendez-vous trouvé pour "${searchTerm}"`));
        appointmentsList.appendChild(alert);
        appointmentCount.textContent = '0';
        return;
    }

    renderAppointments();
}

