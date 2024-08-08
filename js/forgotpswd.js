document.getElementById('forgot-password-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const id = document.getElementById('empid').value;

    if (!validateEmployeeId(id)) {
        alert('Invalid Employee ID. It must start with "VTS" followed by 7 digits.');
        return;
    }

    alert('OTP sent successfully');
    setTimeout(() => {
        // Simulate redirect to verify OTP page
        window.location.href = '../html/verifyOTP.html?employeeId=' + encodeURIComponent(id);
    }, 2000);
});

function validateEmployeeId(id) {
    var re = /^VTS\d{7}$/;
    return re.test(String(id).toUpperCase());
}