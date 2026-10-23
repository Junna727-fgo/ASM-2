// =========================================================================
// MODULE 7: ĐIỀU KHIỂN TRUNG TÂM & ROUTER SPA (main.js)
// =========================================================================
import { categories, cart, users, currentUser, setCurrentUser } from './data.js';
import {
    renderHome, renderCatalog, renderDetail, renderContact,
    setCategoryState, applyCatalogFilter, changeBannerSlide,
    goToBannerSlide, stopSliderLoop, submitContactForm
} from './product.js';
import {
    addToCart, changeQuantity, removeFromCart, clearAllCart,
    renderCart, placeOrder, renderOrderHistory, cancelUserOrder
} from './cart.js';
import { renderAuth, handleLogin, handleRegister } from './auth.js';
import {
    renderAdmin, saveProduct, startEditProduct, cancelEditProduct, deleteProduct,
    saveCategory, startEditCategory, cancelEditCategory, deleteCategory,
    updateOrderStatus, deleteOrder
} from './admin.js';

// Cập nhật Header (Menu danh mục động, số lượng giỏ hàng, trạng thái User/Admin)
export function refreshHeader() {
    const navUl = document.getElementById('dynamic-nav');
    if (navUl) {
        navUl.innerHTML = `
            <li><a onclick="navigate('home')" id="nav-home">Trang Chủ</a></li>
            <li><a onclick="navigate('catalog', 'all')" id="nav-catalog">Tất Cả Sản Phẩm</a></li>
            ${categories.map(c => `
                <li><a onclick="navigate('catalog', '${c.id}')" id="nav-${c.id}" class="nav-${c.id}">${c.name}</a></li>
            `).join('')}
            <li><a onclick="navigate('contact')" id="nav-contact">Liên Hệ</a></li>
        `;
    }

    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) cartCountEl.innerText = totalQty;

    const userAction = document.getElementById('user-action');
    const adminAction = document.getElementById('admin-action');
    if (currentUser) {
        userAction.innerHTML = `👤 ${currentUser.name} <small style="color:#e60012;" onclick="event.stopPropagation(); logout();">(Thoát)</small>`;
        adminAction.style.display = currentUser.role === 'admin' ? 'inline-block' : 'none';
    } else {
        userAction.innerHTML = `👤 Tài Khoản`;
        adminAction.style.display = 'none';
    }
}

function setActiveNav(navId) {
    document.querySelectorAll('.main-nav a').forEach(a => a.classList.remove('active'));
    const activeLink = document.getElementById(navId);
    if (activeLink) activeLink.classList.add('active');
}

// Bộ điều hướng SPA
export function navigate(page, param = 'all') {
    stopSliderLoop();
    refreshHeader();

    if (page === 'home') {
        setActiveNav('nav-home');
        renderHome();
    } else if (page === 'catalog') {
        setCategoryState(param);
        setActiveNav(param === 'all' ? 'nav-catalog' : `nav-${param}`);
        renderCatalog();
    } else if (page === 'contact') {
        setActiveNav('nav-contact');
        renderContact();
    } else if (page === 'cart') {
        setActiveNav('');
        renderCart();
    } else if (page === 'orders') {
        setActiveNav('');
        renderOrderHistory();
    } else if (page === 'auth') {
        setActiveNav('');
        renderAuth(false);
    } else if (page === 'admin') {
        setActiveNav('');
        renderAdmin('products');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Gắn các hàm vào đối tượng window để các sự kiện onclick trong HTML hoạt động với ES6 Module
window.refreshHeader = refreshHeader;
window.navigate = navigate;

// Sự kiện Trang chủ, Slider, Lọc & Liên hệ
window.changeBannerSlide = changeBannerSlide;
window.goToBannerSlide = goToBannerSlide;
window.filterByCategory = (cat) => navigate('catalog', cat);
window.applyCatalogFilter = applyCatalogFilter;
window.viewDetail = (id) => { stopSliderLoop(); renderDetail(id); window.scrollTo({ top: 0, behavior: 'smooth' }); };
window.submitContactForm = submitContactForm;

// Sự kiện Giỏ hàng & Đơn hàng
window.addProductToCart = addToCart;
window.changeCartQty = changeQuantity;
window.removeCartItem = removeFromCart;
window.clearCart = clearAllCart;
window.placeOrder = placeOrder;
window.cancelUserOrder = cancelUserOrder;

// Sự kiện Đăng nhập / Đăng ký
window.renderAuthView = renderAuth;
window.submitLogin = handleLogin;
window.submitRegister = handleRegister;
window.logout = () => { setCurrentUser(null); refreshHeader(); navigate('home'); };
window.quickAdminLogin = () => { setCurrentUser(users[0]); refreshHeader(); navigate('admin'); };
window.resetDefaultData = () => {
    if (confirm("Khôi phục toàn bộ sản phẩm, danh mục và đơn hàng về mặc định ban đầu?")) {
        localStorage.clear();
        location.reload();
    }
};

// Sự kiện Admin CRUD
window.switchAdminTab = renderAdmin;
window.saveProduct = saveProduct;
window.startEditProduct = startEditProduct;
window.cancelEditProduct = cancelEditProduct;
window.deleteProduct = deleteProduct;
window.saveCategory = saveCategory;
window.startEditCategory = startEditCategory;
window.cancelEditCategory = cancelEditCategory;
window.deleteCategory = deleteCategory;
window.changeOrderStatus = updateOrderStatus;
window.deleteOrder = deleteOrder;

// Khởi chạy ứng dụng khi tải trang
window.addEventListener('DOMContentLoaded', () => {
    refreshHeader();
    navigate('home');
});