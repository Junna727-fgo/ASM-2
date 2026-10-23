// =========================================================================
// MODULE 5: ĐĂNG NHẬP, ĐĂNG KÝ & LIÊN HỆ - CHECK FORM 8.2 (auth.js)
// =========================================================================
import { users, setCurrentUser, saveStorage, renderCommonLayout } from './data.js';
import { checkTextLength, checkEmailFormat, checkPhoneFormat, showError, clearError } from './validate.js';

function switchAuthTab(tabName) {
    document.getElementById('tab-login').classList.toggle('active', tabName === 'login');
    document.getElementById('tab-register').classList.toggle('active', tabName === 'register');
    document.getElementById('tab-contact').classList.toggle('active', tabName === 'contact');

    document.getElementById('form-login-box').style.display = tabName === 'login' ? 'block' : 'none';
    document.getElementById('form-register-box').style.display = tabName === 'register' ? 'block' : 'none';
    document.getElementById('form-contact-box').style.display = tabName === 'contact' ? 'block' : 'none';
}

// 1. Xử lý Check Form Đăng nhập
document.getElementById('btn-login-submit')?.addEventListener('click', () => {
    const vEmail = checkEmailFormat('login-email', 'err-login-email');
    const vPass = checkTextLength('login-pass', 'err-login-pass', 'Mật khẩu', 6, 30);
    if (!vEmail || !vPass) return;

    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-pass').value.trim();

    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === pass);
    if (!foundUser) {
        showError('login-pass', 'err-login-pass', '* Email hoặc mật khẩu không chính xác!');
        return;
    }

    setCurrentUser(foundUser);
    alert(`🎉 Đăng nhập thành công! Xin chào ${foundUser.name}.`);
    window.location.href = foundUser.role === 'admin' ? 'admin.html' : 'index.html';
});

// 2. Xử lý Check Form Đăng ký & Thêm user bằng push()
document.getElementById('btn-register-submit')?.addEventListener('click', () => {
    const vName = checkTextLength('reg-name', 'err-reg-name', 'Họ và tên', 3, 40);
    const vEmail = checkEmailFormat('reg-email', 'err-reg-email');
    const vPhone = checkPhoneFormat('reg-phone', 'err-reg-phone');
    const vPass = checkTextLength('reg-pass', 'err-reg-pass', 'Mật khẩu', 6, 20);

    const passVal = document.getElementById('reg-pass').value.trim();
    const repassVal = document.getElementById('reg-repass').value.trim();
    let vRepass = false;

    if (repassVal === '') {
        vRepass = showError('reg-repass', 'err-reg-repass', '* Vui lòng xác nhận lại mật khẩu!');
    } else if (repassVal !== passVal) {
        vRepass = showError('reg-repass', 'err-reg-repass', '* Mật khẩu xác nhận không khớp!');
    } else {
        vRepass = clearError('reg-repass', 'err-reg-repass');
    }

    if (!vName || !vEmail || !vPhone || !vPass || !vRepass) return;

    const emailVal = document.getElementById('reg-email').value.trim();
    if (users.some(u => u.email.toLowerCase() === emailVal.toLowerCase())) {
        showError('reg-email', 'err-reg-email', '* Email này đã được đăng ký!');
        return;
    }

    const newUser = {
        id: Date.now(),
        name: document.getElementById('reg-name').value.trim(),
        email: emailVal,
        phone: document.getElementById('reg-phone').value.trim(),
        password: passVal,
        role: 'user'
    };

    users.push(newUser); // Thêm vào mảng bằng push()
    saveStorage();

    alert("🎉 Đăng ký tài khoản thành công! Vui lòng đăng nhập.");
    document.getElementById('login-email').value = emailVal;
    switchAuthTab('login');
});

// 3. Xử lý Check Form Liên hệ (Lab 8.2)
document.getElementById('btn-contact-submit')?.addEventListener('click', () => {
    const vName = checkTextLength('contact-name', 'err-contact-name', 'Họ và tên', 3, 50);
    const vEmail = checkEmailFormat('contact-email', 'err-contact-email');
    const vPhone = checkPhoneFormat('contact-phone', 'err-contact-phone');
    const vMsg = checkTextLength('contact-msg', 'err-contact-msg', 'Nội dung liên hệ', 10, 500);

    if (vName && vEmail && vPhone && vMsg) {
        alert("✅ Gửi liên hệ thành công! Cảm ơn bạn đã phản hồi cho Atlus Shop.");
        document.getElementById('contact-name').value = '';
        document.getElementById('contact-email').value = '';
        document.getElementById('contact-phone').value = '';
        document.getElementById('contact-msg').value = '';
    }
});

window.addEventListener('DOMContentLoaded', () => {
    renderCommonLayout();
    document.getElementById('tab-login')?.addEventListener('click', () => switchAuthTab('login'));
    document.getElementById('tab-register')?.addEventListener('click', () => switchAuthTab('register'));
    document.getElementById('tab-contact')?.addEventListener('click', () => switchAuthTab('contact'));

    const tabParam = new URLSearchParams(window.location.search).get('tab');
    if (tabParam === 'contact') switchAuthTab('contact');
    if (tabParam === 'register') switchAuthTab('register');
});