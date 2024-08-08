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

function updateFeedback(validation, isEmpty) {
    document.getElementById('length-feedback').classList.toggle('valid', validation.lengthValid);
    document.getElementById('length-feedback').style.display = validation.lengthValid ? 'none' : 'block';
    document.getElementById('uppercase-feedback').classList.toggle('valid', validation.uppercaseValid);
    document.getElementById('uppercase-feedback').style.display = validation.uppercaseValid ? 'none' : 'block';
    document.getElementById('lowercase-feedback').classList.toggle('valid', validation.lowercaseValid);
    document.getElementById('lowercase-feedback').style.display = validation.lowercaseValid ? 'none' : 'block';
    document.getElementById('digit-feedback').classList.toggle('valid', validation.digitValid);
    document.getElementById('digit-feedback').style.display = validation.digitValid ? 'none' : 'block';
    document.getElementById('special-feedback').classList.toggle('valid', validation.specialValid);
    document.getElementById('special-feedback').style.display = validation.specialValid ? 'none' : 'block';
    document.getElementById('empty-feedback').style.display = isEmpty ? 'block' : 'none';
}

document.getElementById('reset-password-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!newPassword && !confirmPassword) {
        updateFeedback({}, true);
        document.getElementById('empty-feedback').textContent = 'Please enter both password and confirm password.';
        return;
    }

    if (!newPassword || !confirmPassword) {
        updateFeedback({}, true);
        document.getElementById('empty-feedback').textContent = 'Password should not be empty';
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const validation = validatePassword(newPassword);
    updateFeedback(validation, false);

    if (validation.lengthValid && validation.uppercaseValid && validation.lowercaseValid && validation.digitValid && validation.specialValid) {
        alert('Password reset successfully');
        setTimeout(() => {
            // Simulate redirect to login page
            window.location.href = '../html/welcome.html';
        }, 2000);
    } else {
        alert('Password does not meet all requirements.');
    }
});
