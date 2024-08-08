function showPasscode() {
    document.querySelector('.passcode-group').classList.add('active');
    document.querySelector('.userid-group').classList.remove('active');
    document.querySelector('.btn-passcode').classList.add('active');
    document.querySelector('.btn-userid').classList.remove('active');
    document.getElementById('forgot-password').classList.add('hidden');
}

function showUserId() {
    document.querySelector('.passcode-group').classList.remove('active');
    document.querySelector('.userid-group').classList.add('active');
    document.querySelector('.btn-passcode').classList.remove('active');
    document.querySelector('.btn-userid').classList.add('active');
    document.getElementById('forgot-password').classList.remove('hidden');
    document.getElementById('password-requirements').style.display = 'none';
}

function togglePassword() {
    const passwordField = document.getElementById('password');
    const passwordIcon = document.querySelector('.toggle-password i');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        passwordIcon.classList.remove('fa-eye-slash');
        passwordIcon.classList.add('fa-eye');
    } else {
        passwordField.type = 'password';
        passwordIcon.classList.remove('fa-eye');
        passwordIcon.classList.add('fa-eye-slash');
    }
}

function validateLogin() {
    const empId = document.getElementById('empId').value;
    const password = document.getElementById('password').value;
    const passcode = document.getElementById('passcode').value;
    const errorMessage = document.getElementById('error-message');
    const passcodeError = document.getElementById('passcodeError');
    const passwordError = document.getElementById('passwordError');
    const passwordRequirements = document.getElementById('password-requirements');

    // Clear previous error messages
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';
    passcodeError.style.display = 'none';
    passcodeError.textContent = '';
    passwordError.style.display = 'none';
    passwordError.textContent = '';
    passwordRequirements.style.display = 'none';

    // Regular expression to match exactly 6 digits
    const regexPasscode = /^\d{6}$/;

    // EmpId pattern
    const empIdPattern = /^VTS\d{7}$/;

    // Determine which form is active
    if (document.querySelector('.passcode-group').classList.contains('active')) {
        // Passcode validation
        if (!regexPasscode.test(passcode)) {
            passcodeError.textContent = 'Passcode must be exactly 6 digits.';
            passcodeError.style.display = 'block';
            return;
        }
    } else if (document.querySelector('.userid-group').classList.contains('active')) {
        // User ID validation
        if (!empIdPattern.test(empId)) {
            errorMessage.textContent = 'Employee ID must start with "VTS" followed by 7 digits.';
            errorMessage.style.display = 'block';
            return;
        }

        // Password validation criteria
        const lengthCheck = /(?=.{8,})/;
        const uppercaseCheck = /(?=.*[A-Z])/;
        const lowercaseCheck = /(?=.*[a-z])/;
        const digitCheck = /(?=.*\d)/;
        const specialCheck = /(?=.*[@$!%*?&])/;

        let isValid = true;
        if (!lengthCheck.test(password)) {
            document.getElementById('length-check').style.color = 'red';
            isValid = false;
        } else {
            document.getElementById('length-check').style.color = '#555';
        }
        if (!uppercaseCheck.test(password)) {
            document.getElementById('uppercase-check').style.color = 'red';
            isValid = false;
        } else {
            document.getElementById('uppercase-check').style.color = '#555';
        }
        if (!lowercaseCheck.test(password)) {
            document.getElementById('lowercase-check').style.color = 'red';
            isValid = false;
        } else {
            document.getElementById('lowercase-check').style.color = '#555';
        }
        if (!digitCheck.test(password)) {
            document.getElementById('digit-check').style.color = 'red';
            isValid = false;
        } else {
            document.getElementById('digit-check').style.color = '#555';
        }
        if (!specialCheck.test(password)) {
            document.getElementById('special-check').style.color = 'red';
            isValid = false;
        } else {
            document.getElementById('special-check').style.color = '#555';
        }

        if (!isValid) {
            passwordRequirements.style.display = 'block';
            errorMessage.textContent = 'Please meet all password requirements.';
            errorMessage.style.display = 'block';
            return;
        }
    }

    // Simulate a successful login for demonstration purposes
    if (document.querySelector('.passcode-group').classList.contains('active')) {
        if (passcode === '123456') { // Replace with actual passcode logic
            alert('Login successful with Passcode!');
            // Redirect or handle successful login here
        } else {
            passcodeError.textContent = 'Invalid passcode.';
            passcodeError.style.display = 'block';
        }
    } else if (document.querySelector('.userid-group').classList.contains('active')) {
        if (empId === 'VTS2222222' && password === 'Password123!') { // Replace with actual login logic
            alert('Login successful!');
            // Redirect or handle successful login here
        } else {
            errorMessage.textContent = 'Invalid EmployeeId or password.';
            errorMessage.style.display = 'block';
        }
    }
}
