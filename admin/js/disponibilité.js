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


let btn = document.querySelector(".btn");
let successMsg = document.getElementById("successMsg")
let selectMedcin = document.getElementById("selectMedcin")
let checkboxes = document.querySelectorAll("#jour input[type='checkbox']")

let doctors = JSON.parse(localStorage.getItem("doctors")) || []

doctors.forEach(element => {
    const option = document.createElement("option")
    selectMedcin.appendChild(option)
    option.textContent = element.name
});


btn.addEventListener("click", function () {
    let medcin = selectMedcin.value;
    let joursChoisi = false;
    let jourSelectionnes = [];

    checkboxes.forEach((checkbox)=> {
        if (checkbox.checked) {
            joursChoisi = true;
            jourSelectionnes.push(checkbox.parentElement.textContent.trim())
        }
    })
    if (medcin === "") {
        successMsg.textContent = "Veuillez choisir un médecin !";
        successMsg.classList.remove("d-none")
        successMsg.classList.remove("bg-success-subtle")
        successMsg.classList.add("bg-warning")
    } else if (!joursChoisi) {
        successMsg.textContent = "Veuillez sélectionner au moins un jour !";
        successMsg.classList.remove("d-none");
        successMsg.classList.remove("bg-success-subtle");
        successMsg.classList.add("bg-warning");
    } else {
        doctors.forEach((doctor)=> {
            if(doctor.name === medcin) {
                doctor.jour = jourSelectionnes;
            }
            localStorage.setItem("doctors", JSON.stringify(doctors));
        })
        successMsg.textContent = "Disponibilités mises à jour"
        successMsg.classList.remove("d-none");
        successMsg.classList.remove("bg-warning")
        successMsg.classList.add("bg-success-subtle")
    }

    setTimeout(() => {
        successMsg.classList.add("d-none");
    }, 3000);
})