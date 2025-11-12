const toggle = document.getElementById("profileToggle");
const dropdownMenu = document.getElementById("dropdownMenu");

dropdownMenu.classList.toggle('show');




function toggleMenu() {
    dropdownMenu.classList.toggle('show');
}

profileToggle.addEventListener('click', function (event) {
    event.preventDefault();
    toggleMenu();
});




const openModalBtn = document.getElementById('openModalBtn');
const addSpecialityModal = document.getElementById('addSpecialityModal');
const customModal = document.querySelector('custom-modal');
const closeModalBtn = document.getElementById('closeModalBtn');
const localstoragebtn = document.querySelector(".localstorage")


function addSpeciality() {
    openModalBtn.addEventListener('click', () => {
        addSpecialityModal.style.display = 'flex';
    })
    closeModalBtn.addEventListener('click', () => {
       closeModal()
    })
}

function addArrayToLocalStorage(){
    localStorage.setItem("docteur", JSON.stringify(array));
}

openModalBtn.addEventListener('click', function (event) {
    event.preventDefault();
    addSpeciality();
})

const specialityForm = document.getElementById('specialityForm');
const specialityTableBody = document.getElementById('specialityTableBody');
let speciality = []
let = specialityStorage = []

 specialityStorage = localStorage.getItem("speciality");
if (specialityStorage) {
    speciality = JSON.parse(specialityStorage);
}

specialityForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const specialityNom = document.getElementById('specialityNom').value.trim();
    const description = document.getElementById('description').value.trim();



    const newSpeciality = {
        name: specialityNom,
        description: description
    };

    speciality.push(newSpeciality);
    localStorage.setItem("speciality", JSON.stringify(speciality));


    const newRow = document.createElement('tr');
    newRow.innerHTML = ` 
        <td>${newSpeciality.name}</td>
        <td>${newSpeciality.description}</td>
        <td class="d-flex flex-row">
            <button class="btn btn-sm">
                <img src="/admin/images/delete-icon.png" style="width: 20px;" alt="">
            </button>
            <button class="btn btn-sm">
                <img src="/admin/images/pencil-icon.png" style="width:20px;" alt="">
            </button>
        </td>
    `;
    specialityTableBody.appendChild(newRow);

    specialityForm.reset();

    closeModal();
});

function closeModal(){
 addSpecialityModal.style.display = 'none';
}

function loadData() {
    speciality.forEach((sp) => {

        const newRow = document.createElement('tr');
        newRow.innerHTML = ` 
  <td>${sp.name}</td>
  <td>${sp.description} </td>
 
                            <td class="d-flex flex-row">
                                <button class="btn btn-sm">
                                    <img src="/admin/images/delete-icon.png" style="width: 20px;" alt="">
                                </button>
                                <button class="btn btn-sm">
                                    <img src="/admin/images/pencil-icon.png" style="width:20px;" alt="">
                                </button>
                            </td>`;


        specialityTableBody.appendChild(newRow);



    })


}
loadData()
