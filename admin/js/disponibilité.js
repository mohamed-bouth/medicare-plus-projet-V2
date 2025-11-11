let btn = document.querySelector(".btn");
let successMsg = document.getElementById("successMsg")
let selectMedcin = document.getElementById("selectMedcin")
let checkboxes = document.querySelectorAll(#jour input[type='checkbox'])

btn.addEventListener("click", function () {     
    let medcin = selectMedcin.value;
    let jours = false ;

    if (medcin === "") {
        successMsg.textContent = "Veuillez choisir un médecin !";
        successMsg.classList.remove("d-none")
        successMsg.classList.remove("bg-success-subtle")
        successMsg.classList.add("bg-warning")
    } else if (checkboxes.forEach(function (checkbox) {
        if (checkboxes.checkbox) {
            jours=true
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