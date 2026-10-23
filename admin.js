// =========================================================================
// MODULE 6: QUẢN TRỊ ADMIN - CRUD SẢN PHẨM, DANH MỤC & ĐƠN HÀNG (admin.js)
// Sử dụng push() để thêm, splice() để xóa và cập nhật giao diện
// =========================================================================
import { categories, dssp, orders, saveStorage, formatMoney, renderCommonLayout } from './data.js';
import { checkTextLength, checkPositiveNumber, showError, clearError } from './validate.js';

let editingProductId = null;
let editingCategoryId = null;

function switchAdminSection(tab) {
    document.getElementById('tab-btn-products').classList.toggle('active', tab === 'products');
    document.getElementById('tab-btn-categories').classList.toggle('active', tab === 'categories');
    document.getElementById('tab-btn-orders').classList.toggle('active', tab === 'orders');

    document.getElementById('admin-sec-products').style.display = tab === 'products' ? 'block' : 'none';
    document.getElementById('admin-sec-categories').style.display = tab === 'categories' ? 'block' : 'none';
    document.getElementById('admin-sec-orders').style.display = tab === 'orders' ? 'block' : 'none';
}

// ==================== 1. CRUD SẢN PHẨM (DÙNG PUSH & SPLICE) ====================
function renderAdminProducts() {
    // Đổ danh mục vào thẻ <select>
    const catSelect = document.getElementById('adm-prod-cat');
    if (catSelect) {
        catSelect.innerHTML = categories.map(c => `<option value="${c.id}">${c.name} (${c.id})</option>`).join('');
    }

    // Đổ bảng danh sách sản phẩm
    const tbody = document.getElementById('admin-product-tbody');
    if (tbody) {
        tbody.innerHTML = dssp.map(p => {
            const cat = categories.find(c => c.id === p.cat);
            return `
                <tr>
                    <td><strong>#${p.id}</strong></td>
                    <td><img src="${p.img}" style="width:48px; height:48px; object-fit:contain; background:#f4f6f8; border-radius:6px;" onerror="this.src='anh/aigis.jpeg'"></td>
                    <td><strong>${p.name}</strong></td>
                    <td>${cat ? cat.name : p.cat}</td>
                    <td><strong>${formatMoney(p.price)}</strong></td>
                    <td>
                        <button class="btn-action btn-edit" onclick="startEditProduct(${p.id})">✏️ Sửa</button>
                        <button class="btn-action btn-delete" onclick="deleteProduct(${p.id})">🗑️ Xóa</button>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

document.getElementById('btn-save-product')?.addEventListener('click', () => {
    const vName = checkTextLength('adm-prod-name', 'err-adm-prod-name', 'Tên sản phẩm', 3, 100);
    const vPrice = checkPositiveNumber('adm-prod-price', 'err-adm-prod-price', 'Giá sản phẩm');
    const vImg = checkTextLength('adm-prod-img', 'err-adm-prod-img', 'Đường dẫn ảnh', 3, 250);
    const vDesc = checkTextLength('adm-prod-desc', 'err-adm-prod-desc', 'Mô tả sản phẩm', 5, 500);
    if (!vName || !vPrice || !vImg || !vDesc) return;

    const name = document.getElementById('adm-prod-name').value.trim();
    const price = Number(document.getElementById('adm-prod-price').value);
    const cat = document.getElementById('adm-prod-cat').value;
    const img = document.getElementById('adm-prod-img').value.trim();
    const desc = document.getElementById('adm-prod-desc').value.trim();

    if (editingProductId !== null) {
        const index = dssp.findIndex(p => p.id === editingProductId);
        if (index !== -1) {
            dssp[index] = { id: editingProductId, name, price, cat, img, desc };
        }
    } else {
        const newId = dssp.length > 0 ? Math.max(...dssp.map(p => p.id)) + 1 : 1;
        dssp.push({ id: newId, name, price, cat, img, desc }); // Thêm bằng push()
    }

    saveStorage();
    resetProductForm();
    renderAdminProducts();
});

window.startEditProduct = function (id) {
    const prod = dssp.find(p => p.id === Number(id));
    if (!prod) return;
    editingProductId = prod.id;

    document.getElementById('prod-form-heading').innerText = `✏️ Đang Cập Nhật Sản Phẩm #${prod.id}`;
    document.getElementById('btn-save-product').innerText = '💾 LƯU CẬP NHẬT';
    document.getElementById('btn-cancel-product').style.display = 'inline-block';

    document.getElementById('adm-prod-name').value = prod.name;
    document.getElementById('adm-prod-price').value = prod.price;
    document.getElementById('adm-prod-cat').value = prod.cat;
    document.getElementById('adm-prod-img').value = prod.img;
    document.getElementById('adm-prod-desc').value = prod.desc;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

function resetProductForm() {
    editingProductId = null;
    document.getElementById('prod-form-heading').innerText = '➕ Thêm Sản Phẩm Mới';
    document.getElementById('btn-save-product').innerText = '💾 THÊM SẢN PHẨM (PUSH)';
    document.getElementById('btn-cancel-product').style.display = 'none';
    ['adm-prod-name', 'adm-prod-price', 'adm-prod-img', 'adm-prod-desc'].forEach(id => {
        document.getElementById(id).value = '';
    });
}

document.getElementById('btn-cancel-product')?.addEventListener('click', resetProductForm);

window.deleteProduct = function (id) {
    const index = dssp.findIndex(p => p.id === Number(id));
    if (index !== -1 && confirm(`Xóa sản phẩm "${dssp[index].name}"?`)) {
        dssp.splice(index, 1); // Xóa bằng splice()
        saveStorage();
        renderAdminProducts();
    }
};

// ==================== 2. CRUD DANH MỤC (DÙNG PUSH & SPLICE) ====================
function renderAdminCategories() {
    const tbody = document.getElementById('admin-category-tbody');
    if (!tbody) return;

    tbody.innerHTML = categories.map(c => `
        <tr>
            <td><strong>${c.id}</strong></td>
            <td><img src="${c.img}" style="width:55px; height:38px; object-fit:cover; border-radius:4px;" onerror="this.src='anh/P3Reload.jpg'"></td>
            <td><strong>${c.name}</strong></td>
            <td>${c.slogan}</td>
            <td>${dssp.filter(p => p.cat === c.id).length} SP</td>
            <td>
                <button class="btn-action btn-edit" onclick="startEditCategory('${c.id}')">✏️ Sửa</button>
                <button class="btn-action btn-delete" onclick="deleteCategory('${c.id}')">🗑️ Xóa</button>
            </td>
        </tr>
    `).join('');
}

document.getElementById('btn-save-category')?.addEventListener('click', () => {
    const vId = checkTextLength('adm-cat-id', 'err-adm-cat-id', 'Mã danh mục', 2, 15);
    const vName = checkTextLength('adm-cat-name', 'err-adm-cat-name', 'Tên danh mục', 2, 40);
    const vSlogan = checkTextLength('adm-cat-slogan', 'err-adm-cat-slogan', 'Slogan', 3, 100);
    const vImg = checkTextLength('adm-cat-img', 'err-adm-cat-img', 'Đường dẫn ảnh', 3, 250);
    if (!vId || !vName || !vSlogan || !vImg) return;

    const id = document.getElementById('adm-cat-id').value.trim().toLowerCase();
    const name = document.getElementById('adm-cat-name').value.trim();
    const slogan = document.getElementById('adm-cat-slogan').value.trim();
    const img = document.getElementById('adm-cat-img').value.trim();

    if (editingCategoryId !== null) {
        const index = categories.findIndex(c => c.id === editingCategoryId);
        if (index !== -1) {
            categories[index] = { id: editingCategoryId, name, slogan, img };
        }
    } else {
        if (categories.some(c => c.id === id)) {
            showError('adm-cat-id', 'err-adm-cat-id', '* Mã danh mục này đã tồn tại!');
            return;
        }
        categories.push({ id, name, slogan, img }); // Thêm danh mục bằng push()
    }

    saveStorage();
    resetCategoryForm();
    renderCommonLayout();
    renderAdminCategories();
    renderAdminProducts();
});

window.startEditCategory = function (id) {
    const cat = categories.find(c => c.id === id);
    if (!cat) return;
    editingCategoryId = cat.id;

    document.getElementById('cat-form-heading').innerText = `✏️ Đang Sửa Danh Mục [${cat.id.toUpperCase()}]`;
    document.getElementById('btn-save-category').innerText = '💾 LƯU CẬP NHẬT';
    document.getElementById('btn-cancel-category').style.display = 'inline-block';

    const idInput = document.getElementById('adm-cat-id');
    idInput.value = cat.id;
    idInput.disabled = true;
    document.getElementById('adm-cat-name').value = cat.name;
    document.getElementById('adm-cat-slogan').value = cat.slogan;
    document.getElementById('adm-cat-img').value = cat.img;
    clearError('adm-cat-id', 'err-adm-cat-id');
};

function resetCategoryForm() {
    editingCategoryId = null;
    document.getElementById('cat-form-heading').innerText = '➕ Thêm Danh Mục Mới';
    document.getElementById('btn-save-category').innerText = '💾 THÊM DANH MỤC (PUSH)';
    document.getElementById('btn-cancel-category').style.display = 'none';
    const idInput = document.getElementById('adm-cat-id');
    idInput.disabled = false;
    ['adm-cat-id', 'adm-cat-name', 'adm-cat-slogan', 'adm-cat-img'].forEach(id => {
        document.getElementById(id).value = '';
    });
}

document.getElementById('btn-cancel-category')?.addEventListener('click', resetCategoryForm);

window.deleteCategory = function (id) {
    const index = categories.findIndex(c => c.id === id);
    if (index !== -1 && confirm(`Xóa danh mục "${categories[index].name}"?`)) {
        categories.splice(index, 1); // Xóa danh mục bằng splice()
        saveStorage();
        renderCommonLayout();
        renderAdminCategories();
        renderAdminProducts();
    }
};

// ==================== 3. QUẢN LÝ ĐƠN HÀNG (*) ====================
function renderAdminOrders() {
    const tbody = document.getElementById('admin-order-tbody');
    if (!tbody) return;

    tbody.innerHTML = orders.map(o => `
        <tr>
            <td><strong>#${o.id}</strong></td>
            <td><strong>${o.customerName}</strong><br><small>${o.phone}</small></td>
            <td>${o.address}</td>
            <td>${o.date}</td>
            <td><strong style="color:var(--p5-color);">${formatMoney(o.total)}</strong></td>
            <td>
                <select onchange="changeOrderStatus('${o.id}', this.value)">
                    <option value="Chờ xác nhận" ${o.status === 'Chờ xác nhận' ? 'selected' : ''}>Chờ xác nhận</option>
                    <option value="Đang giao hàng" ${o.status === 'Đang giao hàng' ? 'selected' : ''}>Đang giao hàng</option>
                    <option value="Đã hoàn thành" ${o.status === 'Đã hoàn thành' ? 'selected' : ''}>Đã hoàn thành</option>
                    <option value="Đã hủy" ${o.status === 'Đã hủy' ? 'selected' : ''}>Đã hủy</option>
                </select>
            </td>
            <td>
                <button class="btn-action btn-delete" onclick="deleteOrder('${o.id}')">🗑️ Xóa</button>
            </td>
        </tr>
    `).join('');
}

window.changeOrderStatus = function (orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        saveStorage();
    }
};

window.deleteOrder = function (orderId) {
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1 && confirm(`Xóa đơn hàng #${orderId} khỏi hệ thống?`)) {
        orders.splice(index, 1); // Xóa đơn bằng splice()
        saveStorage();
        renderAdminOrders();
    }
};

window.addEventListener('DOMContentLoaded', () => {
    renderCommonLayout();
    renderAdminProducts();
    renderAdminCategories();
    renderAdminOrders();

    document.getElementById('tab-btn-products')?.addEventListener('click', () => switchAdminSection('products'));
    document.getElementById('tab-btn-categories')?.addEventListener('click', () => switchAdminSection('categories'));
    document.getElementById('tab-btn-orders')?.addEventListener('click', () => switchAdminSection('orders'));
});