<<<<<<< HEAD
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


let selectMedcin = getElementById("selectMedcin");
let doctors = JSON.parse(localStorage.getItem("doctors")) || []

doctors.forEach(element => {
    const option = document.createElement("option");
    selectMedcin.appendChild(option)
    option.value=element.name;
});
=======
let btn = document.querySelector(".btn");
let successMsg = document.getElementById("successMsg")
let selectMedcin = document.getElementById("selectMedcin")
let checkboxes = document.querySelectorAll("#jour input[type='checkbox']")

btn.addEventListener("click", function () {     
    let medcin = selectMedcin.value;
    let joursChoisi = false ;

    if (medcin === "") {
        successMsg.textContent = "Veuillez choisir un médecin !";
        successMsg.classList.remove("d-none")
        successMsg.classList.remove("bg-success-subtle")
        successMsg.classList.add("bg-warning")
    } else if (checkboxes.forEach(function (checkbox) {
        if (checkboxes.checkbox) {
            joursChoisi=true
        }
        successMsg.textContent = ""
    })) {

    } else {
        successMsg.classList.remove("d-none");
        successMsg.classList.remove("bg-warning")
        successMsg.classList.add("bg-success-subtle")
    }
    setTimeout(() => {
        successMsg.classList.add("d-none");
    }, 3000);
})
>>>>>>> 47af833e32c49d081f14f30d4c79e4a8a569373c
