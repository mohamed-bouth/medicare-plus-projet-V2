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