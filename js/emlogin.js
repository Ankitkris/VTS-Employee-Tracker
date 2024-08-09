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

    // Clear previous error messages
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';
    passcodeError.style.display = 'none';
    passcodeError.textContent = '';
    passwordError.style.display = 'none';
    passwordError.textContent = '';

    // Regular expression to match exactly 6 digits
    const regexPasscode = /^\d{6}$/;

    // EmpId pattern
    const empIdPattern = /^VTS\d{7}$/;

    // Determine which form is active
    if (document.querySelector('.passcode-group').classList.contains('active')) {
        // Passcode validation
        if (!regexPasscode.test(passcode)) {
            passcodeError.textContent = 'Please enter valid passcode.';
            passcodeError.style.display = 'block';
            return;
        }
        else {
            // Simulate successful login for the passcode section
            if (passcode === '123456') { // Replace with actual passcode logic
                alert('Login successful with Passcode!');
                window.location.href = '../html/empdashboard.html';
            } else {
                passcodeError.textContent = 'Invalid passcode.';
                passcodeError.style.display = 'block';
            }
        }
    } else if (document.querySelector('.userid-group').classList.contains('active')) {
        // User ID validation
        if (empId === '' && password === '') {
            errorMessage.textContent = 'Invalid Employee ID or password.';
            errorMessage.style.display = 'block';
            return;
        } else if (empId === '' || !empIdPattern.test(empId)) {
            errorMessage.textContent = 'Please enter valid Employee ID.';
            errorMessage.style.display = 'block';
            return;
        } else if (password === '') {
            passwordError.textContent = 'Please enter your valid password.';
            passwordError.style.display = 'block';
            return;
        }

        // Simulate a successful login for demonstration purposes
        if (empId === 'VTS2222222' && password === 'Password123!') { // Replace with actual login logic
            alert('Login successful!');
            window.location.href = '../html/empdashboard.html'; 
        } else {
            errorMessage.textContent = 'Invalid Employee ID or password.';
            errorMessage.style.display = 'block';
        }
    }
}
