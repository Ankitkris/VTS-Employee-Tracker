document.getElementById('verify-otp-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const otp = document.getElementById('otp').value;

    if (!validateOtp(otp)) {
        alert('OTP must be a 6-digit number');
        return;
    }

    alert('OTP verified successfully');
    setTimeout(() => {
        // Simulate redirect to reset password page
        window.location.href = '/reset-pswd.html';
    }, 2000);
});

function validateOtp(otp) {
    const re = /^\d{6}$/; // OTP should be 6 digits
    return re.test(String(otp));
}