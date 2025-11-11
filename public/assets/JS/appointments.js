document.addEventListener('DOMContentLoaded', function () {
    initializeAppointmentsPage();
    initializeSearch();
});

const appointmentForm = document.getElementById('appointmentForm');

function initializeAppointmentsPage() {
    const appointmentForm = document.getElementById('appointmentForm');
    if (!appointmentForm) return;

    const appointmentsSection = document.getElementById('appointments');
    if (appointmentsSection) {
        appointmentsSection.classList.remove('d-none');
    }

    updateDoctorsSelect();
    renderAppointments();
    const selectedDoctorId = localStorage.getItem('selectedDoctorId');
    if (selectedDoctorId) {
        const select = document.getElementById('appointmentDoctor');
        if (select) {
            select.value = selectedDoctorId;
            validateFieldById('appointmentDoctor');
        }
        localStorage.removeItem('selectedDoctorId');
    }

    appointmentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateAppointmentForm()) {
            addAppointment();
        }
    });

    const fields = ['patientName', 'patientEmail', 'appointmentDate', 'appointmentTime', 'appointmentDoctor'];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            if (field.tagName === 'SELECT') {
                field.addEventListener('change', validateField);
            } else {
                field.addEventListener('input', validateField);
            }
        }
    });
}

function validateAppointmentForm() {
    let isValid = true;
    const fields = ['patientName', 'patientEmail', 'appointmentDate', 'appointmentTime', 'appointmentDoctor'];

    fields.forEach(fieldId => {
        if (!validateFieldById(fieldId)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(e) {
    validateFieldById(e.target.id);
}

function validateFieldById(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return true;

    let isValid = true;

    if (fieldId === 'patientName') {
        isValid = field.value.trim().length >= 2;
    } else if (fieldId === 'patientEmail') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(field.value);
    } else if (fieldId === 'appointmentDate') {
        const selectedDate = new Date(field.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        isValid = selectedDate >= today;
    } else if (fieldId === 'appointmentTime') {
        isValid = field.value !== '';
    } else if (fieldId === 'appointmentDoctor') {
        isValid = field.value !== '';
    }

    if (isValid) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
    }

    return isValid;
}

async function updateDoctorsSelect() {
    await loadData();
    const select = document.getElementById('appointmentDoctor');
    if (!select) return;

    while (select.children.length > 1) {
        select.removeChild(select.lastChild);
    }
    loadedData.forEach(doctor => {
        if (doctor.available) {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = `${doctor.name} (${getSpecialtyName(doctor.specialty)})`;
            select.appendChild(option);
        }
    });
}

function addAppointment() {
    const patientName = document.getElementById('patientName').value;
    const patientEmail = document.getElementById('patientEmail').value;
    const appointmentDate = document.getElementById('appointmentDate').value;
    const appointmentTime = document.getElementById('appointmentTime').value;
    const appointmentDoctor = parseInt(document.getElementById('appointmentDoctor').value);
    const appointmentReason = document.getElementById('appointmentReason').value;

    const doctorId = document.getElementById('appointmentDoctor').value;
    const doctor = loadedData.find(d => d.id === doctorId);

    const newAppointment = {
        id: Date.now(),
        patientName,
        patientEmail,
        date: appointmentDate,
        time: appointmentTime,
        doctorId: appointmentDoctor,
        doctorName: doctor.name,
        doctorSpecialty: doctor.specialty,
        reason: appointmentReason
    };

    state.appointments.push(newAppointment);
    saveState();
    renderAppointments();
    document.getElementById('appointmentForm').reset();
    document.querySelectorAll('.is-valid').forEach(field => {
        field.classList.remove('is-valid');
    });

    // alert('Votre Rendez-vous est pris avec succès!');
}

function renderAppointments() {
    const appointmentsList = document.getElementById('appointmentsList');
    if (!appointmentsList) return;

    if (state.appointments.length === 0) {
        appointmentsList.innerHTML = `
            <div class="text-center py-5 text-muted">
                <i class="bi bi-calendar-x fs-1 d-block mb-3"></i>
                <p class="mb-0">Aucun rendez-vous pour le moment</p>
                <small>Vos rendez-vous apparaîtront ici</small>
            </div>
        `;
        return;
    }

    appointmentsList.innerHTML = '';

    const sortedAppointments = [...state.appointments].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
    });

    sortedAppointments.forEach(appointment => {
        const appointmentItem = document.createElement('div');
        appointmentItem.className = 'appointment-item mb-3 p-3 border rounded';
        appointmentItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <h6 class="mb-1">${appointment.doctorName}</h6>
                    <p class="mb-1">${getSpecialtyName(appointment.doctorSpecialty)}</p>
                    <p class="mb-1"><small>${formatDate(appointment.date)} à ${appointment.time}</small></p>
                    ${appointment.reason ? `<p class="mb-1"><small>Motif: ${appointment.reason}</small></p>` : ''}
                </div>
                <div>
                    <button class="btn btn-outline-primary btn-sm me-1" onclick="editAppointment(${appointment.id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-outline-danger btn-sm" onclick="deleteAppointment(${appointment.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `;

        appointmentsList.appendChild(appointmentItem);
    });
}

function deleteAppointment(appointmentId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous?')) {
        state.appointments = state.appointments.filter(a => a.id !== appointmentId);
        saveState();
        renderAppointments();
    }
}

function editAppointment(appointmentId) {
    const appointment = state.appointments.find(a => a.id === appointmentId);

    if (appointment) {
        document.getElementById('patientName').value = appointment.patientName;
        document.getElementById('patientEmail').value = appointment.patientEmail;
        document.getElementById('appointmentDate').value = appointment.date;
        document.getElementById('appointmentTime').value = appointment.time;
        document.getElementById('appointmentDoctor').value = appointment.doctorId;
        document.getElementById('appointmentReason').value = appointment.reason || '';

        validateFieldById('patientName');
        validateFieldById('patientEmail');
        validateFieldById('appointmentDate');
        validateFieldById('appointmentTime');
        validateFieldById('appointmentDoctor');

        deleteAppointment(appointmentId);

        document.getElementById('appointmentForm').scrollIntoView({ behavior: 'smooth' });
    }
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        filterAppointments(searchTerm);
    });
}

const appointmentItems = document.querySelectorAll('.appointment-item');

function filterAppointments(searchTerm) {
    const appointmentItems = document.querySelectorAll('.appointment-item');

    appointmentItems.forEach(item => {
        const doctorName = item.querySelector('h6').textContent.toLowerCase();
        const specialty = item.querySelector('p').textContent.toLowerCase();
        const dateTime = item.querySelectorAll('p')[1].textContent.toLowerCase();
        const reason = item.querySelectorAll('p')[2] ? item.querySelectorAll('p')[2].textContent.toLowerCase() : '';

        if (doctorName.includes(searchTerm) || specialty.includes(searchTerm) ||
            dateTime.includes(searchTerm) || reason.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

const patientName = document.getElementById('patientName');
const patientEmail = document.getElementById('patientEmail');
const appointmentDate = document.getElementById('appointmentDate');
const appointmentTime = document.getElementById('appointmentTime');
const appointmentDoctor = document.getElementById('appointmentDoctor');

let newFormData = JSON.parse(localStorage.getItem('appointments')) || [];

appointmentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const appointment = {
        id: Date.now(),
        patientName: patientName.value,
        patientEmail: patientEmail.value,
        appointmentDate: appointmentDate.value,
        appointmentTime: appointmentTime.value,
        appointmentDoctor: appointmentDoctor.options[appointmentDoctor.selectedIndex].text,
        appointmentStatus: 'pending',
        dateCreation: new Date().toISOString()
    };

    newFormData.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(newFormData));

    alert('Rendez-vous enregistré avec succès !');
});