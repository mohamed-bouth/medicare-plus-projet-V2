let loadedData = null;
async function loadData() {
    try {
        const response = await fetch('admin/data/admin.json');
        loadedData = await response.json();
    } catch (error) {
        console.error("Error loiding json data.", error);
    }
}

const loginForm = document.getElementById('loginForm');
const userName = document.getElementById('username');
const userPassword = document.getElementById('password');
const loginBtn = document.getElementById('loginButton');
const toggleBtn = document.getElementById('togglePassword');
const oldError = document.querySelector('.password-error-message');
const forgotPassword = document.getElementById('forgotPassword');

function togglePassword() {
    toggleBtn.addEventListener('click', () => {
        const type = userPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        userPassword.setAttribute('type', type);

        const eyeSlashed = document.createElement('i');
        if (type !== 'password') {
            toggleBtn.innerHTML = '';
            eyeSlashed.className = 'fa fa-eye-slash';
        } else {
            toggleBtn.innerHTML = '';
            eyeSlashed.className = 'fa fa-eye';
        }
        toggleBtn.appendChild(eyeSlashed);
    });
}

togglePassword()

function createSession(username) {
    const sessionData = {
        userId: username,
        loginTime: new Date().toISOString(),
        isLoggedIn: true
    };
    sessionStorage.setItem('userSession', JSON.stringify(sessionData));
    console.log("Session created for:", username);
}

function checkSession() {
    const session = sessionStorage.getItem('userSession');

    if (session) {
        const sessionData = JSON.parse(session);
        console.log("an active session has been found", sessionData);
        return sessionData;
    }
    return null;
}

async function loginAuthentification() {
    await loadData();

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = userName.value;
        const password = userPassword.value;

        if (!loadedData) {
            console.log('Error! cannot load data');
            return;
        }
        if (username !== loadedData.user.id || password !== loadedData.user.password) {
            if (oldError) oldError.remove();
            const warning = document.createElement('p');
            warning.innerText = "Erreur ! Identifiants incorrects";
            warning.className = 'password-error-message text-danger mt-2 mb-0';
            warning.style.fontSize = '0.875rem';
            warning.style.paddingLeft = '0.5rem';
            const mbDiv = inputGroup.parentElement;
            mbDiv.appendChild(warning);
            userName.style.borderColor = '#dc3545';
            userPassword.style.borderColor = '#dc3545';
            return;
        } else {
            console.log("Successfully logged in.");
        }
        createSession(username);
        checkSession();
        window.location.href = 'admin/pages/dashboard.html';
    });
}
loginAuthentification();

function forgottenPassword() {
    forgotPassword.addEventListener('click', (e) => {
        e.preventDefault();

        const email = prompt(' Entrez votre email :');
        if (!email) return;

        if (loadedData.user.email === email) {
            alert(`Vos identifiants :\n\n Utilisateur : ${loadedData.user.id}\n Mot de passe : ${loadedData.user.password}`);
        } else {
            alert('Email non trouvé');
        }
    })
}
forgottenPassword()