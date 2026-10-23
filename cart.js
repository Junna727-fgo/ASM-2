// =========================================================================
// MODULE 4: GIỎ HÀNG (PUSH/SPLICE), ĐẶT HÀNG & LỊCH SỬ ĐƠN HÀNG (cart.js)
// =========================================================================
import { cart, orders, currentUser, saveStorage, formatMoney, renderCommonLayout } from './data.js';
import { checkTextLength, checkEmailFormat, checkPhoneFormat } from './validate.js';

function renderCartPage() {
    renderCommonLayout();
    const emptyBox = document.getElementById('empty-cart-box');
    const mainLayout = document.getElementById('cart-main-layout');
    const listEl = document.getElementById('cart-items-list');

    if (cart.length === 0) {
        emptyBox.style.display = 'block';
        mainLayout.style.display = 'none';
    } else {
        emptyBox.style.display = 'none';
        mainLayout.style.display = 'flex';

        let subTotal = 0;
        listEl.innerHTML = cart.map(item => {
            const itemTotal = item.price * item.quantity;
            subTotal += itemTotal;
            return `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}" onerror="this.src='anh/aigis.jpeg'">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p class="cart-item-cat">Đơn giá: ${formatMoney(item.price)} | Danh mục: ${item.cat.toUpperCase()}</p>
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="changeCartQty(${item.id}, -1)">-</button>
                            <span class="qty-num">${item.quantity}</span>
                            <button class="qty-btn" onclick="changeCartQty(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <div class="cart-price-col">
                        <p>${formatMoney(itemTotal)}</p>
                        <button class="btn-remove" onclick="removeCartItem(${item.id})">Xóa bỏ</button>
                    </div>
                </div>
            `;
        }).join('');

        const shippingFee = subTotal > 1000000 ? 0 : 35000;
        const grandTotal = subTotal + shippingFee;

        document.getElementById('summary-subtotal').innerText = formatMoney(subTotal);
        document.getElementById('summary-shipping').innerText = shippingFee === 0 ? 'Miễn phí' : formatMoney(shippingFee);
        document.getElementById('summary-total').innerText = formatMoney(grandTotal);
    }

    renderOrderHistorySection();
}

// Tăng giảm số lượng, nếu <= 0 thì xóa bằng splice()
window.changeCartQty = function (id, delta) {
    const index = cart.findIndex(item => item.id === Number(id));
    if (index !== -1) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1); // Xóa bằng splice() theo đúng yêu cầu
        }
    }
    saveStorage();
    renderCartPage();
};

// Xóa 1 sản phẩm bằng splice()
window.removeCartItem = function (id) {
    const index = cart.findIndex(item => item.id === Number(id));
    if (index !== -1) {
        cart.splice(index, 1); // Xóa bằng splice()
    }
    saveStorage();
    renderCartPage();
};

// Xóa toàn bộ giỏ bằng splice()
document.getElementById('btn-clear-cart')?.addEventListener('click', () => {
    if (cart.length > 0 && confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?")) {
        cart.splice(0, cart.length);
        saveStorage();
        renderCartPage();
    }
});

// Đặt hàng: Check Form Lab 8.2 + Thêm đơn hàng vào mảng orders bằng push()
document.getElementById('btn-submit-order')?.addEventListener('click', () => {
    const vName = checkTextLength('order-name', 'err-order-name', 'Họ và tên người nhận', 3, 50);
    const vEmail = checkEmailFormat('order-email', 'err-order-email');
    const vPhone = checkPhoneFormat('order-phone', 'err-order-phone');
    const vAddr = checkTextLength('order-address', 'err-order-address', 'Địa chỉ nhận hàng', 6, 150);

    if (!vName || !vEmail || !vPhone || !vAddr) return;

    const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = subTotal > 1000000 ? 0 : 35000;

    const newOrder = {
        id: 'DH' + Math.floor(1000 + Math.random() * 9000),
        userId: currentUser ? currentUser.id : null,
        customerName: document.getElementById('order-name').value.trim(),
        email: document.getElementById('order-email').value.trim(),
        phone: document.getElementById('order-phone').value.trim(),
        address: document.getElementById('order-address').value.trim(),
        date: new Date().toLocaleDateString('vi-VN'),
        total: subTotal + shippingFee,
        status: 'Chờ xác nhận',
        items: [...cart]
    };

    // Thêm đơn mới bằng push() và xóa giỏ bằng splice()
    orders.push(newOrder);
    cart.splice(0, cart.length);
    saveStorage();

    alert(`🎉 Đặt hàng thành công! Mã đơn của bạn là #${newOrder.id}`);
    renderCartPage();
    document.getElementById('order-history')?.scrollIntoView({ behavior: 'smooth' });
});

// Hiển thị danh sách Lịch sử đơn hàng
function renderOrderHistorySection() {
    const historyEl = document.getElementById('order-history-list');
    if (!historyEl) return;

    const displayOrders = [...orders].reverse();
    if (displayOrders.length === 0) {
        historyEl.innerHTML = `<div class="admin-panel-box" style="text-align:center;">Bạn chưa có đơn hàng nào.</div>`;
        return;
    }

    historyEl.innerHTML = displayOrders.map(order => `
        <div class="admin-panel-box">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee; padding-bottom:12px; margin-bottom:12px; flex-wrap:wrap; gap:10px;">
                <div>
                    <strong style="font-size:16px;">Mã đơn: <span style="color:var(--p3-color);">#${order.id}</span></strong>
                    <span style="color:var(--text-muted); font-size:13px; margin-left:10px;">📅 Ngày đặt: ${order.date}</span>
                    <p style="font-size:13.5px; color:#444; margin-top:4px;">
                        👤 Người nhận: <strong>${order.customerName}</strong> (${order.phone}) — 📍 ${order.address}
                    </p>
                </div>
                <div>
                    <span class="status-badge" style="background:#eef2ff; color:var(--p3-color);">${order.status}</span>
                    ${order.status === 'Chờ xác nhận' ? `
                        <button class="btn-action btn-delete" style="margin-left:8px;" onclick="cancelOrder('${order.id}')">Hủy đơn</button>
                    ` : ''}
                </div>
            </div>
            ${order.items.map(item => `
                <div style="display:flex; justify-content:space-between; padding:5px 0; font-size:14px;">
                    <span>• ${item.name} <strong>(x${item.quantity})</strong></span>
                    <strong>${formatMoney(item.price * item.quantity)}</strong>
                </div>
            `).join('')}
            <div style="text-align:right; margin-top:10px; padding-top:10px; border-top:1px dashed #ddd; font-size:16px; font-weight:800;">
                Tổng thanh toán: <span style="color:var(--p5-color);">${formatMoney(order.total)}</span>
            </div>
        </div>
    `).join('');
}

window.cancelOrder = function (orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order && confirm(`Bạn có chắc muốn hủy đơn hàng #${orderId}?`)) {
        order.status = 'Đã hủy';
        saveStorage();
        renderOrderHistorySection();
    }
};

window.addEventListener('DOMContentLoaded', () => {
    if (currentUser) {
        document.getElementById('order-name').value = currentUser.name || '';
        document.getElementById('order-email').value = currentUser.email || '';
        document.getElementById('order-phone').value = currentUser.phone || '';
    }
    renderCartPage();
});