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
    option.value = element.id
});
 
selectMedcin.addEventListener("change", function () {
  let selectedId = parseInt(selectMedcin.value);
  let doctor = doctors.find(d => d.id === selectedId);

  if (!doctor) return;

  // mettre à jour les checkboxes selon les jours du médecin
  checkboxes.forEach(ch => {
    let jour = ch.parentElement.textContent.trim();
    ch.checked = doctor.days[jour] === true;
  });
});

// Quand on coche / décoche un jour
checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", function () {
    let selectedId = parseInt(selectMedcin.value);
    let doctor = doctors.find(d => d.id === selectedId);
    if (!doctor) return; // aucun médecin sélectionné

    let jour = checkbox.parentElement.textContent.trim();
    // mettre à jour la valeur true/false
    doctor.days[jour] = checkbox.checked;

    // sauvegarder le changement dans localStorage
    localStorage.setItem("doctors", JSON.stringify(doctors));

    console.log(`→ ${doctor.name} : ${jour} = ${doctor.days[jour]}`);
  });
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
        successMsg.textContent = "Disponibilités mises à jour"
        successMsg.classList.remove("d-none");
        successMsg.classList.remove("bg-warning")
        successMsg.classList.add("bg-success-subtle")
    }

    setTimeout(() => {
        successMsg.classList.add("d-none");
    }, 3000);
})