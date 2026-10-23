// =========================================================================
// MODULE 2: CHECK FORM & THAO TÁC DOM CSS (validate.js)
// Đáp ứng Lab 8.2 & Phần 2: Kiểm tra trống, đúng định dạng, chiều dài chuỗi
// =========================================================================

export function showError(inputId, errorId, message) {
    const inputEl = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    if (inputEl) {
        inputEl.style.borderColor = "#e60012"; // Đổi CSS trực tiếp qua DOM
        inputEl.style.backgroundColor = "#fff5f5";
    }
    if (errorEl) {
        errorEl.innerText = message;
    }
    return false;
}

export function clearError(inputId, errorId) {
    const inputEl = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    if (inputEl) {
        inputEl.style.borderColor = "#22c55e";
        inputEl.style.backgroundColor = "#ffffff";
    }
    if (errorEl) {
        errorEl.innerText = "";
    }
    return true;
}

// 1. Kiểm tra dữ liệu trống & Kiểm tra chiều dài chuỗi
export function checkTextLength(inputId, errorId, fieldName, minLen = 1, maxLen = 255) {
    const inputEl = document.getElementById(inputId);
    const val = inputEl ? inputEl.value.trim() : "";

    if (val === "") {
        return showError(inputId, errorId, `* ${fieldName} không được để trống!`);
    }
    if (val.length < minLen || val.length > maxLen) {
        return showError(inputId, errorId, `* ${fieldName} phải có độ dài từ ${minLen} đến ${maxLen} ký tự!`);
    }
    return clearError(inputId, errorId);
}

// 2. Kiểm tra định dạng Email
export function checkEmailFormat(inputId, errorId) {
    const inputEl = document.getElementById(inputId);
    const val = inputEl ? inputEl.value.trim() : "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (val === "") {
        return showError(inputId, errorId, "* Email không được để trống!");
    }
    if (!emailRegex.test(val)) {
        return showError(inputId, errorId, "* Email không đúng định dạng (VD: ten@gmail.com)!");
    }
    return clearError(inputId, errorId);
}

// 3. Kiểm tra định dạng Số điện thoại (10 chữ số, bắt đầu bằng 0)
export function checkPhoneFormat(inputId, errorId) {
    const inputEl = document.getElementById(inputId);
    const val = inputEl ? inputEl.value.trim() : "";
    const phoneRegex = /^0[0-9]{9}$/;

    if (val === "") {
        return showError(inputId, errorId, "* Số điện thoại không được để trống!");
    }
    if (!phoneRegex.test(val)) {
        return showError(inputId, errorId, "* Số điện thoại phải gồm đúng 10 chữ số và bắt đầu bằng số 0!");
    }
    return clearError(inputId, errorId);
}

// 4. Kiểm tra định dạng Số dương (Giá sản phẩm)
export function checkPositiveNumber(inputId, errorId, fieldName) {
    const inputEl = document.getElementById(inputId);
    const val = inputEl ? inputEl.value.trim() : "";

    if (val === "") {
        return showError(inputId, errorId, `* ${fieldName} không được để trống!`);
    }
    if (isNaN(val) || Number(val) <= 0) {
        return showError(inputId, errorId, `* ${fieldName} phải là số lớn hơn 0!`);
    }
    return clearError(inputId, errorId);
}