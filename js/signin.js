function togglePassword(id) {
    const passwordField = document.getElementById(id);
    const icon = passwordField.nextElementSibling.querySelector('i');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        passwordField.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
}

function validatePassword(password) {
    const lengthCheck = /(?=.{8,})/;
    const uppercaseCheck = /(?=.*[A-Z])/;
    const lowercaseCheck = /(?=.*[a-z])/;
    const digitCheck = /(?=.*\d)/;
    const specialCheck = /(?=.*[@$!%*?&])/;

    return {
        lengthValid: lengthCheck.test(password),
        uppercaseValid: uppercaseCheck.test(password),
        lowercaseValid: lowercaseCheck.test(password),
        digitValid: digitCheck.test(password),
        specialValid: specialCheck.test(password)
    };
}

function updateFeedback(validation) {
    document.getElementById('length-feedback').classList.toggle('valid', validation.lengthValid);
    document.getElementById('length-feedback').textContent = validation.lengthValid ? 'Length requirement met.' : 'Password must be at least 8 characters long.';
    document.getElementById('length-feedback').style.display = validation.lengthValid ? 'block' : 'none';

    document.getElementById('uppercase-feedback').classList.toggle('valid', validation.uppercaseValid);
    document.getElementById('uppercase-feedback').textContent = validation.uppercaseValid ? 'Uppercase requirement met.' : 'Password must contain at least one uppercase letter.';
    document.getElementById('uppercase-feedback').style.display = validation.uppercaseValid ? 'block' : 'none';

    document.getElementById('lowercase-feedback').classList.toggle('valid', validation.lowercaseValid);
    document.getElementById('lowercase-feedback').textContent = validation.lowercaseValid ? 'Lowercase requirement met.' : 'Password must contain at least one lowercase letter.';
    document.getElementById('lowercase-feedback').style.display = validation.lowercaseValid ? 'block' : 'none';

    document.getElementById('digit-feedback').classList.toggle('valid', validation.digitValid);
    document.getElementById('digit-feedback').textContent = validation.digitValid ? 'Digit requirement met.' : 'Password must contain at least one digit.';
    document.getElementById('digit-feedback').style.display = validation.digitValid ? 'block' : 'none';

    document.getElementById('special-feedback').classList.toggle('valid', validation.specialValid);
    document.getElementById('special-feedback').textContent = validation.specialValid ? 'Special character requirement met.' : 'Password must contain at least one special character (@$!%*?&).';
    document.getElementById('special-feedback').style.display = validation.specialValid ? 'block' : 'none';
}

function validateEmpId(empId) {
    const empIdCheck = /^VTS\d{7}$/;
    return empIdCheck.test(empId);
}

function validateEmail(email) {
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailCheck.test(email);
}

function validateForm() {
    const empId = document.getElementById('empId').value;
    const fullName = document.getElementById('fname').value;
    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validate Employee ID
    if (!validateEmpId(empId)) {
        document.getElementById('empId-feedback').style.display = 'block';
        document.getElementById('empId-feedback').textContent = 'Invalid Employee ID';
        document.getElementById('empId').focus();
        return false;
    } else {
        document.getElementById('empId-feedback').style.display = 'none';
    }

    if (fullName.trim() === '') {
        document.getElementById('full-name-feedback').style.display = 'block';
        document.getElementById('full-name-feedback').textContent = 'Full Name is required';
        document.getElementById('fname').focus();
        return false;
    } else {
        document.getElementById('full-name-feedback').style.display = 'none';
    }

    // Validate Email
    if (!validateEmail(email)) {
        document.getElementById('email-feedback').style.display = 'block';
        document.getElementById('email-feedback').textContent = 'Invalid Email ID';
        document.getElementById('email').focus();
        return false;
    } else {
        document.getElementById('email-feedback').style.display = 'none';
    }

    // Validate Password Match
    if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        document.getElementById('confirm-password').focus();
        return false;
    }

    // Validate Password
    const validation = validatePassword(newPassword);
    updateFeedback(validation);

    if (validation.lengthValid && validation.uppercaseValid && validation.lowercaseValid && validation.digitValid && validation.specialValid) {
        return true;
    } else {
        alert('Please meet all the password requirements');
        document.getElementById('new-password').focus();
        return false;
    }
}

document.getElementById('reset-password-form').addEventListener('submit', function (event) {
    event.preventDefault();

    if (validateForm()) {
        alert('Employee Id Registered');
        setTimeout(() => {
            // Simulate redirect to login page
            window.location.href = '../html/welcome.html';
        }, 2000);
    }
});

document.getElementById('new-password').addEventListener('input', function () {
    const newPassword = this.value;
    const validation = validatePassword(newPassword);
    updateFeedback(validation);
    document.getElementById('password-requirements').style.display = 'block'; // Show requirements when typing
});

document.getElementById('confirm-password').addEventListener('input', function () {
    const confirmPassword = this.value;
    const newPassword = document.getElementById('new-password').value;
    if (confirmPassword !== newPassword) {
        this.setCustomValidity('Passwords do not match');
    } else {
        this.setCustomValidity('');
    }
});
