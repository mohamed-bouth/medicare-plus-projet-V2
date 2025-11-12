const totalrondez = document.getElementById("stat-total")
const rondezEnattente = document.getElementById("stat-pending")
const rondezAccptes = document.getElementById("stat-accepted")
const rondezRefuses = document.getElementById("stat-rejected")

allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

console.log(allAppointments)


function renderStatistique() {
    totalrondez.textContent = allAppointments.length
}


function updateNotifications() {
    const appointmentsList = document.getElementById('appointmentsList');
    appointmentsList.innerHTML = '';

    if (allAppointments.length === 0) {
        appointmentsList.innerHTML = `<div class="alert alert-info text-center">
                        <i class="fas fa-info-circle me-1"></i> Aucun rendez-vous enregistré.
                    </div>`
        return;
    }
    if (allAppointments) {
        allAppointments.forEach(app => {
            const item = document.createElement('div');
            item.className = 'list-group-item list-group-item-action my-2';

            const statusColor = {
                pending: 'warning',
                accepted: 'success',
                rejected: 'danger'
            }[app.appointmentStatus] || 'secondary';

            item.innerHTML = `
            <div class="d-flex justify-content-between align-items-center bg-body-secondary rounded-2 p-1">
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
            appointmentsList.appendChild(item)
        });
    }
}

function getStatusText(status) {
    const texts = {
        pending: 'En attente',
        accepted: 'Accepté',
        rejected: 'Refusé'
    };
    return texts[status] || status;
}


renderStatistique()
updateNotifications()
