function openModal(id){
    document.getElementById(id).style.display="flex"
}

function closeModal(id){
    document.getElementById(id).style.display="none"
}

let alertTimeout = 5000;

// تابع برای بستن آلرت
function closeAlert() {
    let alertElement = document.getElementById('myAlert');
    if (alertElement) {
        alertElement.classList.remove('show');
        setTimeout(function() {
            alertElement.style.display = 'none';
        }, 500);
    }
}

// اجرای تابع پس از گذشت زمان مشخص شده
setTimeout(closeAlert, alertTimeout);


// Little Show and Hide Password
const passwordInput = document.getElementById('password');
const toggleButton = document.getElementById('toggle-admin-view');

toggleButton.addEventListener('click', function() {
    const currentType = passwordInput.getAttribute('type');

    if (currentType === 'password') {
        passwordInput.setAttribute('type', 'text');
    } else {
        passwordInput.setAttribute('type', 'password');
    }
});