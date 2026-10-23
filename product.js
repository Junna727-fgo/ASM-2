// =========================================================================
// MODULE 3: XỬ LÝ TRANG CHỦ, SLIDER 8.1, DANH MỤC & CHI TIẾT (product.js)
// =========================================================================
import { bannerSlides, categories, dssp, formatMoney, renderCommonLayout } from './data.js';

let currentSlide = 0;

// Tạo thẻ Card sản phẩm dẫn tới trang detail.html?id=...
function createProductCard(sp, index = 0) {
    const catObj = categories.find(c => c.id === sp.cat);
    const catName = catObj ? catObj.name : sp.cat.toUpperCase();
    return `
        <div class="product-card" style="animation-delay: ${index * 0.04}s">
            <a href="detail.html?id=${sp.id}" class="product-img-wrapper">
                <span class="cat-tag">${catName}</span>
                <img class="product-img" src="${sp.img}" alt="${sp.name}" onerror="this.src='anh/aigis.jpeg'">
            </a>
            <a href="detail.html?id=${sp.id}" class="product-title">${sp.name}</a>
            <div class="product-card-footer">
                <span class="product-price">${formatMoney(sp.price)}</span>
                <button class="btn-card-add" onclick="quickAddToCart(${sp.id})">+ Giỏ hàng</button>
            </div>
        </div>
    `;
}

// ==================== 1. KHỞI CHẠY TRANG CHỦ (index.html) ====================
function initHomePage() {
    // Render nút chọn Slide: Persona The Series | P3 | P4 | P5
    const dotsBox = document.getElementById('slider-dots-box');
    if (dotsBox) {
        dotsBox.innerHTML = bannerSlides.map((item, idx) => `
            <button class="slider-dot ${idx === 0 ? 'active' : ''}" data-idx="${idx}">${item.tabName}</button>
        `).join('');

        dotsBox.querySelectorAll('.slider-dot').forEach(btn => {
            btn.addEventListener('click', () => {
                currentSlide = Number(btn.getAttribute('data-idx'));
                updateBannerDOM();
            });
        });
    }

    document.getElementById('prev-slide-btn')?.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + bannerSlides.length) % bannerSlides.length;
        updateBannerDOM();
    });

    document.getElementById('next-slide-btn')?.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % bannerSlides.length;
        updateBannerDOM();
    });

    // Tự động chạy Slider mỗi 4 giây (Lab 8.1)
    setInterval(() => {
        currentSlide = (currentSlide + 1) % bannerSlides.length;
        updateBannerDOM();
    }, 4000);

    // Render Danh mục Vũ trụ
    const catGrid = document.getElementById('home-categories');
    if (catGrid) {
        catGrid.innerHTML = categories.map(c => `
            <a href="catalog.html?cat=${c.id}" class="collection-card">
                <img src="${c.img || 'anh/P3Reload.jpg'}" alt="${c.name}" onerror="this.src='anh/P3Reload.jpg'">
                <div class="collection-content">
                    <h3>${c.name.toUpperCase()}</h3>
                    <p>${c.slogan}</p>
                </div>
            </a>
        `).join('');
    }

    // Render 8 Sản phẩm nổi bật
    const featGrid = document.getElementById('home-featured-products');
    if (featGrid) {
        featGrid.innerHTML = dssp.slice(0, 8).map((sp, i) => createProductCard(sp, i)).join('');
    }
}

// Thao tác DOM thay đổi nội dung, thuộc tính src/href và CSS màu sắc của Banner
function updateBannerDOM() {
    const slide = bannerSlides[currentSlide];
    const badgeEl = document.getElementById('banner-badge');
    const titleEl = document.getElementById('banner-title');
    const descEl = document.getElementById('banner-desc');
    const imgEl = document.getElementById('banner-img');
    const btnEl = document.getElementById('banner-btn');

    if (!titleEl) return;

    badgeEl.innerText = slide.badge;
    titleEl.innerText = slide.title;
    descEl.innerText = slide.desc;

    imgEl.setAttribute('src', slide.img);
    btnEl.setAttribute('href', `catalog.html?cat=${slide.targetCat}`);

    badgeEl.style.borderColor = slide.color;
    imgEl.style.borderColor = slide.color;
    imgEl.style.boxShadow = `0 20px 50px ${slide.color}55`;

    document.querySelectorAll('.slider-dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
    });
}

// ==================== 2. KHỞI CHẠY TRANG DANH MỤC (catalog.html) ====================
function initCatalogPage() {
    const params = new URLSearchParams(window.location.search);
    let selectedCat = params.get('cat') || 'all';

    const renderTabsAndProducts = () => {
        const catObj = categories.find(c => c.id === selectedCat);
        document.getElementById('catalog-heading').innerText =
            selectedCat === 'all' ? 'Tất Cả Sản Phẩm' : `Bộ Sưu Tập ${catObj ? catObj.name : selectedCat.toUpperCase()}`;

        // Render các nút lọc danh mục
        const tabsEl = document.getElementById('catalog-cat-tabs');
        tabsEl.innerHTML = `
            <button class="cat-tab-btn ${selectedCat === 'all' ? 'active' : ''}" data-cat="all">
                Tất cả (${dssp.length})
            </button>
            ${categories.map(c => `
                <button class="cat-tab-btn ${selectedCat === c.id ? 'active' : ''}" data-cat="${c.id}">
                    ${c.name} (${dssp.filter(sp => sp.cat === c.id).length})
                </button>
            `).join('')}
        `;

        tabsEl.querySelectorAll('.cat-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                selectedCat = btn.getAttribute('data-cat');
                renderTabsAndProducts();
            });
        });

        filterAndSortProducts(selectedCat);
    };

    document.getElementById('search-input')?.addEventListener('input', () => filterAndSortProducts(selectedCat));
    document.getElementById('sort-select')?.addEventListener('change', () => filterAndSortProducts(selectedCat));

    renderTabsAndProducts();
}

function filterAndSortProducts(selectedCat) {
    const keyword = document.getElementById('search-input')?.value.trim().toLowerCase() || '';
    const sortType = document.getElementById('sort-select')?.value || 'none';

    let filtered = dssp.filter(sp => {
        const matchCat = (selectedCat === 'all') || (sp.cat === selectedCat);
        const matchKw = sp.name.toLowerCase().includes(keyword) || sp.desc.toLowerCase().includes(keyword);
        return matchCat && matchKw;
    });

    if (sortType === 'asc') filtered.sort((a, b) => a.price - b.price);
    if (sortType === 'desc') filtered.sort((a, b) => b.price - a.price);

    document.getElementById('product-count').innerText = `Hiển thị ${filtered.length} sản phẩm`;
    const grid = document.getElementById('catalog-grid');
    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:50px; border:1px solid #eee; border-radius:10px;">Không tìm thấy sản phẩm nào phù hợp.</div>`;
    } else {
        grid.innerHTML = filtered.map((sp, i) => createProductCard(sp, i)).join('');
    }
}

// ==================== 3. KHỞI CHẠY TRANG CHI TIẾT (detail.html) ====================
function initDetailPage() {
    const params = new URLSearchParams(window.location.search);
    const prodId = Number(params.get('id')) || dssp[0]?.id;
    const sp = dssp.find(item => item.id === prodId) || dssp[0];
    if (!sp) return;

    const catObj = categories.find(c => c.id === sp.cat);
    const catName = catObj ? catObj.name : sp.cat.toUpperCase();

    // Truy xuất phần tử HTML và thay đổi nội dung, thuộc tính qua DOM
    document.getElementById('detail-breadcrumb-cat').innerText = catName;
    document.getElementById('detail-breadcrumb-cat').setAttribute('href', `catalog.html?cat=${sp.cat}`);
    document.getElementById('detail-breadcrumb-name').innerText = sp.name;
    document.getElementById('detail-img').setAttribute('src', sp.img);
    document.getElementById('detail-cat-badge').innerText = catName;
    document.getElementById('detail-title').innerText = sp.name;
    document.getElementById('detail-price').innerText = formatMoney(sp.price);
    document.getElementById('detail-desc').innerText = sp.desc;

    document.getElementById('btn-detail-add').onclick = () => window.quickAddToCart(sp.id);
    document.getElementById('btn-detail-buy').onclick = () => {
        window.quickAddToCart(sp.id);
        window.location.href = 'cart.html';
    };

    const related = dssp.filter(item => item.cat === sp.cat && item.id !== sp.id).slice(0, 4);
    document.getElementById('related-grid').innerHTML = related.map((item, i) => createProductCard(item, i)).join('');
}

// Tự động nhận diện trang HTML hiện tại để khởi chạy
window.addEventListener('DOMContentLoaded', () => {
    renderCommonLayout();
    const pageId = document.body.id;
    if (pageId === 'home-page') initHomePage();
    if (pageId === 'catalog-page') initCatalogPage();
    if (pageId === 'detail-page') initDetailPage();
});