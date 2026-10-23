// =========================================================================
// MODULE 1: DỮ LIỆU GỐC, LOCALSTORAGE & GIAO DIỆN CHUNG (data.js)
// =========================================================================

// 1. Mảng dữ liệu 4 Slider cho Banner: Persona The Series, P3, P4, P5 (Lab 8.1)
export const bannerSlides = [
    {
        id: 1,
        tabName: "Persona The Series",
        badge: "PERSONA THE SERIES",
        title: "BỘ SƯU TẬP CAO CẤP PERSONA",
        desc: "Khám phá trọn bộ thế giới Persona từ Dark Hour, Midnight Channel đến Phantom Thieves qua những ấn phẩm độc quyền.",
        img: "anh/P3Reload.jpg",
        targetCat: "all",
        color: "#ffffff"
    },
    {
        id: 2,
        tabName: "P3",
        badge: "PERSONA 3 RELOAD",
        title: "TRY THE DARK HOUR",
        desc: "Trang bị ngay áo thun Aigis Legacy, móc khóa súng triệu hồi Evoker và băng đeo tay S.E.E.S chính hãng.",
        img: "anh/P3Reload.jpg",
        targetCat: "p3",
        color: "#0055ff"
    },
    {
        id: 3,
        tabName: "P4",
        badge: "PERSONA 4 GOLDEN & REVIVAL",
        title: "REACH OUT TO THE TRUTH",
        desc: "Bước vào thế giới Midnight Channel với gối bông TV cổ điển, áo thun Teddie và huy hiệu nhóm điều tra Inaba.",
        img: "anh/P4R.webp",
        targetCat: "p4",
        color: "#e6b800"
    },
    {
        id: 4,
        tabName: "P5",
        badge: "PERSONA 5 ROYAL",
        title: "PHANTOM THIEVES OF HEARTS",
        desc: "Đánh cắp trái tim với Mặt nạ Joker tỉ lệ 1:1, thú nhồi bông Morgana và cặp xách học viện Shujin.",
        img: "anh/P5Royal.jpg",
        targetCat: "p5",
        color: "#e60012"
    }
];

const defaultCategories = [
    { id: "p3", name: "Persona 3", slogan: "Try the DARK HOUR.", img: "anh/P3Reload.jpg" },
    { id: "p4", name: "Persona 4", slogan: "Reach to the truth.", img: "anh/P4R.webp" },
    { id: "p5", name: "Persona 5", slogan: "Phantom Thieves Of Heart.", img: "anh/P5Royal.jpg" }
];

const defaultProducts = [
    { id: 1, name: "Persona 3 Reload: Aigis Legacy Shirt", price: 1050000, cat: "p3", img: "anh/aigis.jpeg", desc: "Áo thun phiên bản giới hạn in họa tiết Aigis. Chất liệu cotton cao cấp." },
    { id: 2, name: "Persona 3 Reload: Evoker Keychain", price: 450000, cat: "p3", img: "anh/evoker.webp", desc: "Móc khóa kim loại thiết kế theo súng triệu hồi Evoker." },
    { id: 3, name: "Persona 3 Reload: SEES Armband", price: 650000, cat: "p3", img: "anh/SEES.jpg", desc: "Băng đeo tay SEES tiêu chuẩn, có thể điều chỉnh kích cỡ." },
    { id: 4, name: "Persona 3 Reload: Acrylic Stand", price: 550000, cat: "p3", img: "anh/p3stand.webp", desc: "Standee mica nhân vật chính Makoto Yuki." },
    { id: 5, name: "Persona 4 Revival: TV Plush Pillow", price: 1200000, cat: "p4", img: "anh/p4tvpil.webp", desc: "Gối ôm hình chiếc TV cổ vào thế giới Midnight Channel." },
    { id: 6, name: "Persona 4 Golden: Teddie Shirt", price: 950000, cat: "p4", img: "anh/p4teddie.jpg", desc: "Áo thun Teddie độc quyền của Persona 4 Golden." },
    { id: 7, name: "Persona 4 Golden: Investigation Team Pin", price: 350000, cat: "p4", img: "anh/p4pin.jpg", desc: "Ghim cài áo huy hiệu nhóm điều tra Inaba." },
    { id: 8, name: "Persona 4 Revival: Desk Mat", price: 750000, cat: "p4", img: "anh/p4desk.webp", desc: "Lót chuột cỡ lớn họa tiết Persona 4 Revival." },
    { id: 9, name: "Persona 5 Royal: Joker Mask 1:1", price: 1450000, cat: "p5", img: "anh/p5jokermask.webp", desc: "Mặt nạ Joker tỉ lệ thực, thích hợp cho cosplay." },
    { id: 10, name: "Persona 5: Morgana Plush", price: 850000, cat: "p5", img: "anh/monapushp5.jpg", desc: "Thú nhồi bông Morgana siêu mềm mại." },
    { id: 11, name: "Persona 5 Royal: Phantom Thieves Cap", price: 650000, cat: "p5", img: "anh/ptvcap.jpg", desc: "Mũ lưỡi trai thêu logo Phantom Thieves." },
    { id: 12, name: "Persona 5 Royal: Shujin Academy Bag", price: 1100000, cat: "p5", img: "anh/shujin.webp", desc: "Cặp xách đồng phục học viện Shujin." }
];

const defaultUsers = [
    { id: 1, name: "Quản Trị Viên", email: "admin@gmail.com", phone: "0901234567", password: "123456", role: "admin" },
    { id: 2, name: "Makoto Yuki", email: "khachhang@gmail.com", phone: "0987654321", password: "123456", role: "user" }
];

const defaultOrders = [
    {
        id: "DH1001",
        userId: 2,
        customerName: "Makoto Yuki",
        email: "khachhang@gmail.com",
        phone: "0987654321",
        address: "Ký túc xá Iwatodai, Quận Port Island",
        date: "23/10/2026",
        total: 1050000,
        status: "Đã hoàn thành",
        items: [
            { id: 1, name: "Persona 3 Reload: Aigis Legacy Shirt", price: 1050000, quantity: 1, img: "anh/aigis.jpeg" }
        ]
    }
];

export let categories = JSON.parse(localStorage.getItem('asm2_categories')) || defaultCategories;
export let dssp = JSON.parse(localStorage.getItem('asm2_dssp')) || defaultProducts;
export let users = JSON.parse(localStorage.getItem('asm2_users')) || defaultUsers;
export let cart = JSON.parse(localStorage.getItem('asm2_cart')) || [];
export let orders = JSON.parse(localStorage.getItem('asm2_orders')) || defaultOrders;
export let currentUser = JSON.parse(localStorage.getItem('asm2_currentUser')) || null;

export function saveStorage() {
    localStorage.setItem('asm2_categories', JSON.stringify(categories));
    localStorage.setItem('asm2_dssp', JSON.stringify(dssp));
    localStorage.setItem('asm2_users', JSON.stringify(users));
    localStorage.setItem('asm2_cart', JSON.stringify(cart));
    localStorage.setItem('asm2_orders', JSON.stringify(orders));
    localStorage.setItem('asm2_currentUser', JSON.stringify(currentUser));
}

export function setCurrentUser(user) {
    currentUser = user;
    saveStorage();
}

export function formatMoney(number) {
    return Number(number).toLocaleString('vi-VN') + ' ₫';
}

// Hàm thêm nhanh sản phẩm vào giỏ hàng bằng push() dùng chung cho mọi trang
export function quickAddToCart(id) {
    const existingItem = cart.find(item => item.id === Number(id));
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const product = dssp.find(p => p.id === Number(id));
        if (product) {
            cart.push({ ...product, quantity: 1 }); // Dùng push() theo đúng yêu cầu
        }
    }
    saveStorage();
    renderCommonLayout();
    alert("🛒 Đã thêm sản phẩm vào giỏ hàng!");
}

// Hàm khởi tạo Header & Footer chung cho tất cả 6 file HTML
export function renderCommonLayout() {
    const headerEl = document.getElementById('site-header');
    const footerEl = document.getElementById('site-footer');
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    const currentPath = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const currentCat = urlParams.get('cat');

    if (headerEl) {
        headerEl.innerHTML = `
            <div class="header-content">
                <a href="index.html" class="logo">ATLUS <span>SHOP</span></a>
                <nav class="main-nav">
                    <ul>
                        <li><a href="index.html" class="${currentPath.endsWith('index.html') || currentPath.endsWith('/') ? 'active' : ''}">Trang Chủ</a></li>
                        <li><a href="catalog.html?cat=all" class="${currentPath.endsWith('catalog.html') && (!currentCat || currentCat === 'all') ? 'active' : ''}">Tất Cả Sản Phẩm</a></li>
                        ${categories.map(c => `
                            <li><a href="catalog.html?cat=${c.id}" class="nav-${c.id} ${currentCat === c.id ? 'active' : ''}">${c.name}</a></li>
                        `).join('')}
                        <li><a href="auth.html?tab=contact" class="${urlParams.get('tab') === 'contact' ? 'active' : ''}">Liên Hệ</a></li>
                    </ul>
                </nav>
                <div class="header-actions">
                    ${currentUser ? `
                        <a href="auth.html" class="action-icon">👤 ${currentUser.name}</a>
                        <span id="btn-logout-header" class="action-icon" style="color:#e60012;">(Thoát)</span>
                    ` : `
                        <a href="auth.html" class="action-icon">👤 Tài Khoản</a>
                    `}
                    <a href="cart.html#order-history" class="action-icon">📦 Lịch Sử Đơn</a>
                    <a href="admin.html" class="action-icon admin-badge" style="display:${currentUser && currentUser.role === 'admin' ? 'inline-block' : 'none'};">⚙️ Quản Trị</a>
                    <a href="cart.html" class="cart-icon">🛒 Giỏ Hàng (<span>${totalQty}</span>)</a>
                </div>
            </div>
        `;

        const logoutBtn = document.getElementById('btn-logout-header');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                setCurrentUser(null);
                window.location.href = 'index.html';
            });
        }
    }

    if (footerEl) {
        footerEl.innerHTML = `
            <div class="footer-inner">
                <div class="footer-col">
                    <h4>VỀ ATLUS SHOP</h4>
                    <p>Cửa hàng vật phẩm Premium chính thức từ thương hiệu Persona.</p>
                    <p id="btn-quick-admin" style="margin-top:10px; color:#38bdf8; font-weight:600;">
                        🔑 [Bấm để mở nhanh Trang Quản Trị Admin]
                    </p>
                </div>
                <div class="footer-col">
                    <h4>ĐIỀU HƯỚNG NHANH</h4>
                    <p><a href="catalog.html?cat=all">Danh mục sản phẩm</a></p>
                    <p><a href="cart.html#order-history">Tra cứu lịch sử đơn hàng</a></p>
                    <p><a href="auth.html?tab=contact">Liên hệ & Góp ý (Lab 8.2)</a></p>
                    <p id="btn-reset-data" style="color:#f87171;">Khôi phục dữ liệu gốc</p>
                </div>
                <div class="footer-col">
                    <h4>NHẬN ƯU ĐÃI</h4>
                    <div class="newsletter">
                        <input type="email" placeholder="Nhập email...">
                        <button onclick="alert('Đăng ký nhận tin thành công!')">→</button>
                    </div>
                </div>
            </div>
            <div class="copyright">
                © 2026 ATLUS STORE. Hoàn thiện E-Commerce ASM 2 & Lab 8 (Multi-Page HTML & ES6 Module).
            </div>
        `;

        document.getElementById('btn-quick-admin')?.addEventListener('click', () => {
            setCurrentUser(users[0]);
            window.location.href = 'admin.html';
        });

        document.getElementById('btn-reset-data')?.addEventListener('click', () => {
            if (confirm("Khôi phục toàn bộ sản phẩm, danh mục và đơn hàng về mặc định ban đầu?")) {
                localStorage.clear();
                window.location.href = 'index.html';
            }
        });
    }
}

window.quickAddToCart = quickAddToCart;