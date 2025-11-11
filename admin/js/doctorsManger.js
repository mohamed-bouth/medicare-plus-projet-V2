
const cardsContainer = document.getElementById("cardsContainer")
const nameinput = document.getElementById("nameinput")
const specialtyInput = document.getElementById("specialtyinput")
const descriptionInput = document.getElementById("descriptionInput")
const submitBtn = document.getElementById("submitBtn")
const ajouterbtn = document.getElementById("ajouterbtn")
const formdoctor = document.getElementById("formdoctor")
const diponiblebtn = document.getElementById("diponiblebtn")
const diponiblefalse = document.getElementById("diponiblefalse")
const diponibletrue = document.getElementById("diponibletrue")
const checheBar = document.getElementById("cherche")
const sidebarOption = document.getElementById("option2")
const toutdoctor = document.getElementById("toutdoctor")
const toutdiponible = document.getElementById("toutdiponible")
const toutspicale = document.getElementById("toutspicale")
const section = document.getElementById("section")







let doctors = JSON.parse(localStorage.getItem("doctors")) || []

let doctorsInformation = doctors


let specialty = []

let spi = localStorage.getItem("speciality")

if (spi) {
    spi = JSON.parse(spi)

    spi.forEach(element => {
        specialty.push(element.name)
    })
}

console.log(specialty)


specialty.forEach(element => {
    const specialt = document.createElement("option")
    specialt.textContent = element
    specialtyInput.appendChild(specialt)
});

specialty.forEach(element => {
    const specialt = document.createElement("option")
    specialt.textContent = element
    sidebarOption.appendChild(specialt)
})

function renderStatistique() {


    toutdoctor.textContent = doctorsInformation.length
    flage = 0
    doctorsInformation.forEach(element => {
        if (element.diponible === true) {
            flage += 1
        }
    });

    toutdiponible.textContent = flage

    toutspicale.textContent = specialty.length
}
renderStatistique()

function resetform() {
    nameinput.value = ""
    specialtyInput.value = "Choisissez une spécialisation"
    descriptionInput.value = ""
}

let transid = null

function deleteAlert() {
    return new Promise((resolve) => {
        const alertContainer = document.createElement("div");
        alertContainer.style.position = "fixed";
        alertContainer.style.top = "0";
        alertContainer.style.left = "0";
        alertContainer.style.width = "100%";
        alertContainer.style.height = "100%";
        alertContainer.style.background = "rgba(0,0,0,0.5)";
        alertContainer.style.display = "flex";
        alertContainer.style.justifyContent = "center";
        alertContainer.style.alignItems = "center";
        alertContainer.style.zIndex = "9999";

        const box = document.createElement("div");
        box.style.background = "#fff";
        box.style.padding = "20px";
        box.style.borderRadius = "10px";
        box.style.width = "300px";
        box.style.textAlign = "center";
        box.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";

        const message = document.createElement("p");
        message.textContent = "Voulez-vous supprimer ce médecin ?";
        message.style.fontSize = "18px";
        message.style.marginBottom = "20px";

        const yesBtn = document.createElement("button");
        yesBtn.textContent = "Yes";
        yesBtn.className = "btn btn-danger";
        yesBtn.style.margin = "5px";

        const noBtn = document.createElement("button");
        noBtn.textContent = "No";
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
    })

}


function rendercard() {
    cardsContainer.innerHTML = ""
    doctorsInformation.forEach(doctor => {
        const cardContainer = document.createElement("div")
        cardContainer.className = "border border-dark rounded-3"
        cardContainer.style = "width: 300px; height: 225px;"

        const uperContainer = document.createElement("div")
        uperContainer.className = "d-flex"
        uperContainer.style = "height: 100px;"

        const imgContainer = document.createElement("div")
        imgContainer.className = "bg-secondary border-0 rounded-2"
        imgContainer.style = "width: 100px; height: 100px;"

        const nameContainer = document.createElement("div")
        nameContainer.className = "w-75 border border-0 d-flex flex-column align-items-center"

        const name = document.createElement("p")
        name.className = "text-center"
        name.textContent = doctor.name

        const specialty = document.createElement("div")
        specialty.className = "w-75 rounded-2 bg-primary d-flex justify-content-center align-items-center"
        specialty.style = "height: 20px"

        const specialtytext = document.createElement("p")
        specialtytext.className = "text-white text-center m-0"
        specialtytext.textContent = doctor.specialty

        const disponible = document.createElement("div")
        disponible.className = "w-75 rounded-2 mt-2 bg-success d-flex justify-content-center align-items-center"
        disponible.style = "height: 20px"

        const disponibletext = document.createElement("p")
        disponibletext.className = "text-white text-center m-0"
        if (doctor.diponible) {
            disponibletext.textContent = "desponible"
        } else {
            disponibletext.textContent = "non desponible"
            disponible.className = "w-75 rounded-2 mt-2 bg-danger d-flex justify-content-center align-items-center"
        }
        const discard = document.createElement("div")
        discard.style = "height: 40%;"

        const description = document.createElement("p")
        description.style = "font-size: small;"
        description.textContent = doctor.description

        const btnContainer = document.createElement("div")
        btnContainer.className = "d-flex justify-content-evenly"

        const editbtn = document.createElement("button")
        editbtn.className = "px-5 border-dark rounded-3 bg-white"
        editbtn.textContent = "edit"

        const dltbtn = document.createElement("button")
        dltbtn.className = "px-5 border-0 rounded-3 bg-danger text-white"
        dltbtn.textContent = "delete"

        cardsContainer.appendChild(cardContainer)
        cardContainer.appendChild(uperContainer)
        uperContainer.appendChild(imgContainer)
        uperContainer.appendChild(nameContainer)
        nameContainer.appendChild(name)
        nameContainer.appendChild(specialty)
        specialty.appendChild(specialtytext)
        nameContainer.appendChild(disponible)
        disponible.appendChild(disponibletext)
        cardContainer.appendChild(discard)
        discard.appendChild(description)
        cardContainer.appendChild(btnContainer)
        btnContainer.appendChild(editbtn)
        btnContainer.appendChild(dltbtn)

        renderStatistique()

        dltbtn.addEventListener("click", () => {
            async function dltfn() {
                const confirmed = await deleteAlert()
                if (confirmed) {
                    let id = doctor.id
                    console.log(doctor.id)
                    doctorsInformation = doctorsInformation.filter(doctor => doctor.id !== id)
                    localStorage.setItem("doctors", JSON.stringify(doctorsInformation));
                    rendercard();
                    console.log(doctorsInformation)
                    renderStatistique()
                }

            }
            dltfn()


        })

        editbtn.addEventListener("click", () => {
            section.style.pointerEvents = "none"
            formdoctor.style.display = "block"
            ajoutestate = true
            function rendercardagain() {
                diponiblebtnFlage = doctor.diponible
                if (diponiblebtnFlage === true) {
                    diponiblefalse.style = "height: 18px; width: 198px; top: 0; left: -200px;"
                    diponibletrue.style = "height: 18px; width: 198px; top: 0; left: 0"

                } else {
                    diponiblefalse.style = "height: 18px; width: 198px; top: 0; left: 0"
                    diponibletrue.style = "height: 18px; width: 198px; top: 0; left: 200px"
                }
                nameinput.value = doctor.name
                specialtyInput.value = doctor.specialty
                descriptionInput.value = doctor.description
                transid = doctor.id
            }
            rendercardagain()
            renderStatistique()
        })
    });

}

rendercard()

let trans = false

let transedit

let ajoutestate = false

ajouterbtn.addEventListener("click", () => {
    resetform()
    console.log("click")
    if (ajoutestate === false) {
        formdoctor.style.display = "block"
        ajoutestate = true
    } else {
        formdoctor.style.display = "none"
        ajoutestate = false

    }
    let diponiblebtnFlage = false
    trans = diponiblebtnFlage
    diponiblefalse.style = "height: 18px; width: 198px; top: 0; left: 0"
    diponibletrue.style = "height: 18px; width: 198px; top: 0; left: 200px"
    diponiblebtn.addEventListener("click", () => {
        console.log("========")
        console.log()
        if (!transid) {
            console.log("click work")
            if (diponiblebtnFlage === false) {
                diponiblefalse.style = "height: 18px; width: 198px; top: 0; left: -200px;"
                diponibletrue.style = "height: 18px; width: 198px; top: 0; left: 0"
                diponiblebtnFlage = true
                trans = diponiblebtnFlage
            } else {
                diponiblefalse.style = "height: 18px; width: 198px; top: 0; left: 0"
                diponibletrue.style = "height: 18px; width: 198px; top: 0; left: 200px"
                diponiblebtnFlage = false
                trans = diponiblebtnFlage
            }
        } else {
            let flags = false
            doctorsInformation.forEach(doc => {
                if (doc.id === transid) {
                    flags = true
                    console.log(transid)
                    transedit = doc.diponible
                    console.log("work")
                    if (diponiblebtnFlage === false) {
                        diponiblefalse.style = "height: 18px; width: 198px; top: 0; left: -200px;"
                        diponibletrue.style = "height: 18px; width: 198px; top: 0; left: 0"
                        diponiblebtnFlage = true
                        transedit = diponiblebtnFlage
                    } else {
                        diponiblefalse.style = "height: 18px; width: 198px; top: 0; left: 0"
                        diponibletrue.style = "height: 18px; width: 198px; top: 0; left: 200px"
                        diponiblebtnFlage = false
                        transedit = diponiblebtnFlage
                    }
                }
            });
            if (!flags) {
                transedit = null
            }

        }
    })

})

function addcard() {
    nameValue = nameinput.value
    specialtyValue = specialtyInput.value
    descriptionValue = descriptionInput.value
    if (specialtyValue === "Choisissez une spécialisation" || nameValue === "" || descriptionValue === "") {
        alert("fill the blanks")
        return
    }
    const doctor = {
        id: Date.now(),
        name: nameValue,
        specialty: specialtyValue,
        diponible: trans,
        description: descriptionValue,
        days: {
           Lundi: false,
           Mardi: false,
           Mercredi: false,
           Jeudi: false,
           Vendredi: false,
        }
    }
    doctorsInformation.push(doctor)
    console.log(doctorsInformation)
    formdoctor.style.display = "none"
    ajoutestate = false
}



submitBtn.addEventListener("click", (e) => {
    section.style.pointerEvents = "auto"
    if (!transid) {
        e.preventDefault()
        addcard()
        rendercard()
    } else {
        e.preventDefault()
        doctorsInformation.forEach(doc => {
            if (doc.id === transid) {
                doc.name = nameinput.value
                doc.specialty = specialtyInput.value
                doc.description = descriptionInput.value
                doc.diponible = transedit
                console.log(doctorsInformation)

            }
        });
        resetform()
        rendercard()
        formdoctor.style.display = "none"
        ajoutestate = false
        transid = null
    }
    localStorage.setItem("doctors", JSON.stringify(doctorsInformation));

})

function rendercardByfilter(doctor) {
    const cardContainer = document.createElement("div");
    cardContainer.className = "border border-dark rounded-3";
    cardContainer.style = "width: 300px; height: 225px;";

    const uperContainer = document.createElement("div");
    uperContainer.className = "d-flex";
    uperContainer.style = "height: 100px;";

    const imgContainer = document.createElement("div");
    imgContainer.className = "bg-secondary border-0 rounded-2";
    imgContainer.style = "width: 100px; height: 100px;";

    const nameContainer = document.createElement("div");
    nameContainer.className = "w-75 border border-0 d-flex flex-column align-items-center";

    const name = document.createElement("p");
    name.className = "text-center";
    name.textContent = doctor.name;

    const specialty = document.createElement("div");
    specialty.className = "w-75 rounded-2 bg-primary d-flex justify-content-center align-items-center";
    specialty.style = "height: 20px;";

    const specialtytext = document.createElement("p");
    specialtytext.className = "text-white text-center m-0";
    specialtytext.textContent = doctor.specialty;

    const disponible = document.createElement("div");
    disponible.className = "w-75 rounded-2 mt-2 bg-success d-flex justify-content-center align-items-center";
    disponible.style = "height: 20px;";

    const disponibletext = document.createElement("p");
    disponibletext.className = "text-white text-center m-0";

    if (doctor.diponible) {
        disponibletext.textContent = "desponible";
    } else {
        disponibletext.textContent = "non desponible";
        disponible.className = "w-75 rounded-2 mt-2 bg-danger d-flex justify-content-center align-items-center";
    }

    const discard = document.createElement("div");
    discard.style = "height: 40%;";

    const description = document.createElement("p");
    description.style = "font-size: small;";
    description.textContent = doctor.description;

    const btnContainer = document.createElement("div");
    btnContainer.className = "d-flex justify-content-evenly";

    const editbtn = document.createElement("button");
    editbtn.className = "px-5 border-dark rounded-3 bg-white";
    editbtn.textContent = "edit";

    const dltbtn = document.createElement("button");
    dltbtn.className = "px-5 border-0 rounded-3 bg-danger text-white";
    dltbtn.textContent = "delete";

    cardsContainer.appendChild(cardContainer);
    cardContainer.appendChild(uperContainer);
    uperContainer.appendChild(imgContainer);
    uperContainer.appendChild(nameContainer);
    nameContainer.appendChild(name);
    nameContainer.appendChild(specialty);
    specialty.appendChild(specialtytext);
    nameContainer.appendChild(disponible);
    disponible.appendChild(disponibletext);
    cardContainer.appendChild(discard);
    discard.appendChild(description);
    cardContainer.appendChild(btnContainer);
    btnContainer.appendChild(editbtn);
    btnContainer.appendChild(dltbtn);
}

checheBar.addEventListener("input", () => {
    let chercheInput = checheBar.value.toLowerCase();
    cardsContainer.innerHTML = "";


    doctorsInformation.forEach(doctor => {

        if (chercheInput === "") {
            rendercard()
        } else if (doctor.name.toLowerCase().includes(chercheInput)) {
            rendercardByfilter(doctor)
        }
    });
});

sidebarOption.addEventListener("change", () => {
    cardsContainer.innerHTML = "";
    doctorsInformation.forEach(doctor => {

        if (sidebarOption.value === "tout") {
            rendercard()
        } else if (sidebarOption.value === doctor.specialty) {
            console.log("other spicial")
            rendercardByfilter(doctor)
        }
    });
})
