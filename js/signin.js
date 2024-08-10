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
    const specialCheck = /(?=.[@$!%?&])/;

    return {
        lengthValid: lengthCheck.test(password),
        uppercaseValid: uppercaseCheck.test(password),
        lowercaseValid: lowercaseCheck.test(password),
        digitValid: digitCheck.test(password),
        specialValid: specialCheck.test(password)
    };
}

function gatherUnmetRequirements(validation) {
    const unmetRequirements = [];

    if (!validation.lengthValid) {
        unmetRequirements.push('Password must be at least 8 characters long.');
    }
    if (!validation.uppercaseValid) {
        unmetRequirements.push('Password must contain at least one uppercase letter.');
    }
    if (!validation.lowercaseValid) {
        unmetRequirements.push('Password must contain at least one lowercase letter.');
    }
    if (!validation.digitValid) {
        unmetRequirements.push('Password must contain at least one digit.');
    }
    if (!validation.specialValid) {
        unmetRequirements.push('Password must contain at least one special character (@$!%*?&).');
    }

    return unmetRequirements;
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

    // Validate Full Name
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
        document.getElementById('confirm-password').setCustomValidity('Passwords do not match');
        document.getElementById('confirm-password').reportValidity();
        return false;
    } else {
        document.getElementById('confirm-password').setCustomValidity('');
    }

    // Validate Password
    const validation = validatePassword(newPassword);
    const allRequirementsMet = validation.lengthValid && validation.uppercaseValid && validation.lowercaseValid && validation.digitValid && validation.specialValid;

    // Show or hide password requirements
    const passwordRequirementsContainer = document.getElementById('password-requirements');
    const feedbackElements = passwordRequirementsContainer.getElementsByClassName('validation-feedback');

    if (!allRequirementsMet) {
        // Gather unmet requirements
        const unmetRequirements = gatherUnmetRequirements(validation);

        // Display unmet requirements in the container
        for (let i = 0; i < feedbackElements.length; i++) {
            if (unmetRequirements[i]) {
                feedbackElements[i].textContent = unmetRequirements[i];
                feedbackElements[i].style.display = 'block';
            } else {
                feedbackElements[i].style.display = 'none';
            }
        }
        passwordRequirementsContainer.style.display = 'block';

        // Focus on password field
        document.getElementById('new-password').focus();
        return false;
    } else {
        // Hide password requirements if all are met
        passwordRequirementsContainer.style.display = 'none';
    }

    return true;
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
    // During typing, hide feedback
    updateFeedback({}); // Hide all feedback during typing
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