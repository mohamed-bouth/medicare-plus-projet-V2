let loadedDoctors = null;

async function loadData() {
    try {
        const response = await fetch('/admin/data/doctors.json');
        loadedDoctors = await response.json();
        console.log(loadedDoctors);
    } catch (error) {
        console.error("Error loiding json data.", error);
    }
}

loadData()
