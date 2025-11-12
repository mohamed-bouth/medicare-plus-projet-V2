
const cardsContainer = document.getElementById("cardsContainer");
const nameinput = document.getElementById("nameinput");
const specialtyInput = document.getElementById("specialtyinput");
const descriptionInput = document.getElementById("descriptionInput");
const submitBtn = document.getElementById("submitBtn");
const ajouterbtn = document.getElementById("ajouterbtn");
const formdoctor = document.getElementById("formdoctor");
const diponiblebtn = document.getElementById("diponiblebtn");
const diponiblefalse = document.getElementById("diponiblefalse");
const diponibletrue = document.getElementById("diponibletrue");
const checheBar = document.getElementById("cherche");
const sidebarOption = document.getElementById("option2");
const toutdoctor = document.getElementById("toutdoctor");
const toutdiponible = document.getElementById("toutdiponible");
const toutspicale = document.getElementById("toutspicale");
const section = document.getElementById("section");
const doctorsidebar = document.getElementById("doctorSideBar");
const toggle = document.getElementById("profileToggle");
const dropdownMenu = document.getElementById("dropdownMenu");
const doctorSidebarBtn = document.getElementById("doctorSidebarBtn");
const photoInput = document.getElementById("photoInput");

let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
let doctorsInformation = doctors;
let specialty = [];
let transid = null;
let diponiblebtnFlage = false;
let ajoutestate = false;
let clickOrNo = false;

initializePage();

function initializePage() {
    loadSpecialties();
    renderStatistique();
    rendercard();
    initializeSidebar();
    initializeDropdown();
    initializeEventListeners();
}

function initializeSidebar() {
    doctorsidebar.style.left = "99%";

    doctorSidebarBtn.addEventListener("click", () => {
        if (clickOrNo === false) {
            doctorsidebar.style.left = "auto";
            clickOrNo = true;
        } else {
            doctorsidebar.style.left = "99%";
            clickOrNo = false;
        }
    });
}

function initializeDropdown() {
    toggle.addEventListener('click', function (event) {
        event.preventDefault();
        dropdownMenu.classList.toggle('show');
    });
}

function loadSpecialties() {
    let spi = localStorage.getItem("speciality");
    
    if (spi) {
        spi = JSON.parse(spi);
        specialty = spi.map(element => element.name);
    }
    while (specialtyInput.options.length > 1) {
        specialtyInput.remove(1);
    }

    specialty.forEach(element => {
        const option = document.createElement("option");
        option.textContent = element;
        option.value = element;
        specialtyInput.appendChild(option);
    });
    while (sidebarOption.options.length > 1) {
        sidebarOption.remove(1);
    }

    specialty.forEach(element => {
        const option = document.createElement("option");
        option.textContent = element;
        option.value = element;
        sidebarOption.appendChild(option);
    });
}

function renderStatistique() {
    toutdoctor.textContent = doctorsInformation.length;
    
    const disponibles = doctorsInformation.filter(doc => doc.diponible === true).length;
    toutdiponible.textContent = disponibles;
    
    toutspicale.textContent = specialty.length;
}

function resetform() {
    nameinput.value = "";
    specialtyInput.value = "Choisissez une spécialisation";
    descriptionInput.value = "";
    diponiblebtnFlage = false;
    diponiblefalse.style = "height: 18px; width: 198px; top: 0; left: 0";
    diponibletrue.style = "height: 18px; width: 198px; top: 0; left: 200px";
}

function deleteAlert() {
    return new Promise((resolve) => {
        const alertContainer = document.createElement("div");
        alertContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;

        const box = document.createElement("div");
        box.style.cssText = `
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            width: 300px;
            text-align: center;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
        `;

        const message = document.createElement("p");
        message.textContent = "Voulez-vous supprimer ce médecin ?";
        message.style.cssText = "font-size: 18px; margin-bottom: 20px;";

        const yesBtn = document.createElement("button");
        yesBtn.textContent = "Oui";
        yesBtn.className = "btn btn-danger";
        yesBtn.style.margin = "5px";

        const noBtn = document.createElement("button");
        noBtn.textContent = "Non";
        noBtn.className = "btn btn-secondary";
        noBtn.style.margin = "5px";

        box.appendChild(message);
        box.appendChild(yesBtn);
        box.appendChild(noBtn);
        alertContainer.appendChild(box);
        document.body.appendChild(alertContainer);

        yesBtn.onclick = () => {
            document.body.removeChild(alertContainer);
            resolve(true);
        };

        noBtn.onclick = () => {
            document.body.removeChild(alertContainer);
            resolve(false);
        };
    });
}

function rendercard() {
    cardsContainer.innerHTML = "";
    
    doctorsInformation.forEach(doctor => {
        const card = createDoctorCard(doctor);
        cardsContainer.appendChild(card);
    });

    renderStatistique();
}

function createDoctorCard(doctor) {
    const cardContainer = document.createElement("div");
    cardContainer.className = "border border-gray rounded-3 my-2 bg-body-tertiary mx-2";
    cardContainer.style = "width: 300px; height: 225px;";

    const disponibleClass = doctor.diponible ? "bg-success" : "bg-danger";
    const disponibleText = doctor.diponible ? "disponible" : "non disponible";

    cardContainer.innerHTML = `
        <div class="d-flex" style="height: 100px;">
            <div class="bg-secondary border-0 rounded-2" style="width: 100px; height: 100px;">
                ${doctor.image ? `<img src="${doctor.image}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 0.5rem;" alt="${doctor.name}">` : ''}
            </div>
            <div class="w-75 border border-0 d-flex flex-column align-items-center">
                <p class="text-center">${doctor.name}</p>
                <div class="w-75 rounded-2 bg-primary d-flex justify-content-center align-items-center" style="height: 20px">
                    <p class="text-white text-center m-0">${doctor.specialty}</p>
                </div>
                <div class="w-75 rounded-2 mt-2 ${disponibleClass} d-flex justify-content-center align-items-center" style="height: 20px">
                    <p class="text-white text-center m-0">${disponibleText}</p>
                </div>
            </div>
        </div>
        <div style="height: 40%;">
            <p style="font-size: small;">${doctor.description}</p>
        </div>
        <div class="d-flex justify-content-evenly">
            <button class="edit-btn px-5 border-dark rounded-3 bg-white">Modifier</button>
            <button class="delete-btn px-5 border-0 rounded-3 bg-danger text-white">Supprimer</button>
        </div>
    `;

    cardContainer.querySelector('.delete-btn').addEventListener("click", async () => {
        const confirmed = await deleteAlert();
        if (confirmed) {
            doctorsInformation = doctorsInformation.filter(doc => doc.id !== doctor.id);
            localStorage.setItem("doctors", JSON.stringify(doctorsInformation));
            rendercard();
        }
    });

    cardContainer.querySelector('.edit-btn').addEventListener("click", () => {
        openEditForm(doctor);
    });

    return cardContainer;
}

function openEditForm(doctor) {
    section.style.pointerEvents = "none";
    formdoctor.style.display = "block";
    ajoutestate = true;
    transid = doctor.id;

    nameinput.value = doctor.name;
    specialtyInput.value = doctor.specialty;
    descriptionInput.value = doctor.description;
    diponiblebtnFlage = doctor.diponible;

    if (diponiblebtnFlage) {
        diponiblefalse.style = "height: 18px; width: 198px; top: 0; left: -200px;";
        diponibletrue.style = "height: 18px; width: 198px; top: 0; left: 0";
    } else {
        diponiblefalse.style = "height: 18px; width: 198px; top: 0; left: 0";
        diponibletrue.style = "height: 18px; width: 198px; top: 0; left: 200px";
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
