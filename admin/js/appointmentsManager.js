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
            <td>${app.doctorName}</td>
            <td>${new Date(app.date).toLocaleDateString('fr-FR')}</td>
            <td>${app.time}</td>
            <td><span class="badge bg-${statusColor}">${getStatusText(app.appointmentStatus)}</span></td>
        `;

        tbody.appendChild(row);
    });
}

function removeAllData(){
    console.log("remove")
    localStorage.removeItem('appointments');
    location.reload()
}

displayAppointments()
renderStatistique()
