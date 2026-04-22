/**
 * DINEDASH MASTER SCRIPT
 * Handles: Auth, Theme, Dashboards, and Bookings
 */

/* ==========================================
   1. GLOBAL THEME & NAV CONTROLLER
   ========================================== */

// This function handles the actual visual switch
function applyTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
}

// Renamed for better clarity and compatibility
function handleThemeToggle() {
    const body = document.body;
    body.classList.toggle('light-mode');
    
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Keep this as an alias so your existing HTML 'toggleTheme()' calls still work
function toggleTheme() {
    handleThemeToggle();
}

function updateNavGreeting() {
    const name = localStorage.getItem('userName');
    const dashLink = document.getElementById('navDashLink');
    
    if (dashLink && name && localStorage.getItem('isLoggedIn') === 'true') {
        const hours = new Date().getHours();
        let greeting = (hours < 12) ? "Good Morning" : (hours < 17) ? "Good Afternoon" : "Good Evening";
        dashLink.innerHTML = `${greeting}, ${name} 👤`;
    }
}

/* ==========================================
   2. PAGE ROUTER & INITIALIZATION
   ========================================== */
window.addEventListener('DOMContentLoaded', () => {
    // 1. Core UI Setup
    applyTheme();
    updateNavGreeting();

    // 2. Initialize Reward Points if missing (Prevents 'undefined' errors)
    if (localStorage.getItem('isLoggedIn') === 'true') {
        let wallet = JSON.parse(localStorage.getItem('userWallet')) || { 
            balance: 512, 
            rewardPoints: 0, 
            history: [] 
        };
        // If wallet exists but points are missing, fix it
        if (wallet.rewardPoints === undefined) wallet.rewardPoints = 0;
        localStorage.setItem('userWallet', JSON.stringify(wallet));
    }

    // 3. Detect current page and run specific logic
    const pageActions = {
        'adminView': initAdmin,
        'authForm': initLogin,
        'userActivity': initDashboard,
        'navAuthBtn': initIndex,
        'eventForm': initEvent,
        'menuContainer': initFood,
        'bookingForm': initTable,
        'restaurantDetail': loadDetails,
        'restaurantGrid': initRestaurantList
    };

    for (const [id, action] of Object.entries(pageActions)) {
        if (document.getElementById(id)) action();
    }
});

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
}
/* ==========================================
   3. ADMIN PANEL LOGIC
   ========================================== */
function initAdmin() {
    if (localStorage.getItem('userRole') !== 'admin') window.location.href = 'login.html';
    renderAdminView();
}

function renderAdminView() {
    const container = document.getElementById('adminView');
    if (!container) return;

    const orders = JSON.parse(localStorage.getItem('cart')) || [];
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const all = [...orders, ...bookings].sort((a, b) => b.id - a.id);

    // Update Stats
    const tOrders = document.getElementById('totalOrders');
    const tBookings = document.getElementById('totalBookings');
    const pCount = document.getElementById('pendingCount');

    if (tOrders) tOrders.innerText = orders.length;
    if (tBookings) tBookings.innerText = bookings.length;
    if (pCount) pCount.innerText = all.filter(i => i.status !== 'Confirmed').length;

    if (all.length === 0) {
        container.innerHTML = `<div class="empty-msg">No active orders or bookings.</div>`;
        return;
    }

    container.innerHTML = all.map(item => `
        <div class="admin-card">
            <div class="card-top">
                <div>
                    <h4 style="font-size: 1.2rem; color: #ff4757;">${item.restaurantName || "Order"}</h4>
                    <p class="customer-info">👤 ${item.name || 'Anonymous'}</p>
                </div>
                <div>
                    ${item.status !== 'Confirmed' ? 
                        `<button class="approve-btn" onclick="approveItem('${item.id}')">Approve ✅</button>` : 
                        `<span style="color:#2ecc71; font-weight:bold;">✓ Confirmed</span>`
                    }
                </div>
            </div>
            <div class="details-grid">
                <div class="detail-item"><span>Category</span>${item.type}</div>
                <div class="detail-item"><span>Date</span>${item.date}</div>
                ${item.time ? `<div class="detail-item"><span>Time</span>${item.time}</div>` : ''}
                ${item.total ? `<div class="detail-item"><span>Amount</span>₹${item.total}</div>` : ''}
                ${item.details ? `<div class="detail-item" style="grid-column: 1/-1;"><span>Notes</span>${item.details}</div>` : ''}
            </div>
        </div>`).join('');
}

function approveItem(id) {
    ['cart', 'bookings'].forEach(key => {
        let data = JSON.parse(localStorage.getItem(key)) || [];
        const idx = data.findIndex(i => i.id == id);
        if (idx !== -1) {
            data[idx].status = 'Confirmed';
            localStorage.setItem(key, JSON.stringify(data));
        }
    });
    renderAdminView();
}

/* ==========================================
   4. AUTHENTICATION (LOGIN/REGISTER)
   ========================================== */
let isLoginMode = true;
let selectedRole = 'user';

function switchRole(role, el) {
    selectedRole = role;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    const toggleLink = document.getElementById('toggleLink');
    if (role === 'admin') {
        toggleLink.style.visibility = 'hidden';
        if (!isLoginMode) toggleAuthMode();
    } else {
        toggleLink.style.visibility = 'visible';
    }
}

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    document.getElementById('formTitle').innerText = isLoginMode ? "Welcome Back" : "Create Account";
    document.getElementById('submitBtn').innerText = isLoginMode ? "Sign In" : "Register";
    document.getElementById('nameField').style.display = isLoginMode ? "none" : "block";
}

function initLogin() {
    document.getElementById('authForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;

        if (isLoginMode) {
            if (selectedRole === 'admin') {
                if (email === 'admin@dinedash.com' && pass === 'admin123') {
                    loginSuccess('admin', 'Administrator');
                } else showError("Invalid admin credentials.");
            } else {
                const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
                const match = users.find(u => u.email === email && u.password === pass);
                if (match || (email === 'test@user.com' && pass === 'user123')) {
                    loginSuccess('user', match ? match.name : 'Guest');
                } else showError("Invalid email or password.");
            }
        } else {
            const name = document.getElementById('regName').value;
            let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            users.push({ name, email, password: pass });
            localStorage.setItem('registeredUsers', JSON.stringify(users));
            alert("Account created! Please login.");
            toggleAuthMode();
        }
    });
}

function loginSuccess(role, name) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('userName', name);
    window.location.href = (role === 'admin') ? 'admin.html' : 'dashboard.html';
}

function showError(msg) {
    const err = document.getElementById('errorMsg');
    err.innerText = msg;
    err.style.display = 'block';
}

/* ==========================================
   5. CUSTOMER DASHBOARD
   ========================================== */
function initDashboard() {
    const name = localStorage.getItem('userName') || 'User';
    const welcome = document.getElementById('welcomeUser');
    if (welcome) welcome.innerText = `Welcome, ${name}!`;
    renderUserDashboard();
}

function renderUserDashboard() {
    const container = document.getElementById('userActivity');
    const orders = JSON.parse(localStorage.getItem('cart')) || [];
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const all = [...orders, ...bookings].sort((a, b) => b.id - a.id);

    document.getElementById('userOrdersCount').innerText = orders.length;
    document.getElementById('userBookingsCount').innerText = bookings.length;

    if (all.length === 0) {
        container.innerHTML = `<div class="empty-state"><p>No activity found yet.</p></div>`;
        return;
    }

    container.innerHTML = all.map(item => `
        <div class="item-card">
            <div>
                <h4>${item.restaurantName}</h4>
                <p style="color:#888; font-size:0.8rem;">${item.type} • ${item.date}</p>
            </div>
            <span class="status-badge ${item.status === 'Confirmed' ? 'status-confirmed' : 'status-pending'}">
                ${item.status}
            </span>
        </div>`).join('');
}

/* ==========================================
   6. RESTAURANT LIST & SEARCH
   ========================================== */
function initRestaurantList() {
    if (typeof restaurants !== 'undefined') displayRestaurants(restaurants);
}

function displayRestaurants(list) {
    const grid = document.getElementById('restaurantGrid');
    if (!grid) return;
    grid.innerHTML = list.map(r => `
        <div class="card" onclick="goToDetail(${r.id})">
            <img src="${r.image}" alt="${r.name}">
            <div class="rating">${r.rating} ⭐</div>
            <div class="card-content">
                <div class="name">${r.name}</div>
                <div class="cuisine">${r.cuisine}</div>
                <div class="footer-info">
                    <div class="location">📍 ${r.location}</div>
                </div>
            </div>
        </div>`).join('');
}

function filterResults() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = restaurants.filter(r => r.name.toLowerCase().includes(query) || r.cuisine.toLowerCase().includes(query));
    displayRestaurants(filtered);
}

function filterByLocation(loc, btn) {
    document.querySelectorAll('.loc-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filtered = (loc === 'All') ? restaurants : restaurants.filter(r => r.location.includes(loc));
    displayRestaurants(filtered);
}

function goToDetail(id) {
    localStorage.setItem('selectedRestaurant', id);
    window.location.href = 'restaurant.html';
}

/* ==========================================
   7. FOOD, TABLE, & EVENT BOOKING
   ========================================== */
const getRes = () => {
    const id = localStorage.getItem('selectedRestaurant');
    return (typeof restaurants !== 'undefined') ? restaurants.find(r => r.id == id) : null;
};

function initEvent() {
    const r = getRes();
    if (r) document.getElementById('resTitle').innerText = `${r.name} - Banquet Hall`;
}

function initTable() {
    const r = getRes();
    if (r) document.getElementById('resName').innerText = `Book at ${r.name}`;
}

function saveInquiry(data) {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(data);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    // REMOVED: alert("Request Sent Successfully!"); 
    // The Success Popup is now handled by showSuccessPopup()
}

function initFood() {
    const r = getRes();
    if (r) document.getElementById('resNameHeader').innerText = `Menu - ${r.name}`;
    renderMenu();
}

function renderMenu() {
    const container = document.getElementById('menuContainer');
    if (!container || typeof menuItems === 'undefined') return;
    const cats = [...new Set(menuItems.map(i => i.category))];
    container.innerHTML = cats.map(c => `
        <h3 style="color:#ff4757; margin:20px 0 10px;">${c}</h3>
        ${menuItems.filter(i => i.category === c).map(item => `
            <div class="menu-card">
                <div class="menu-info">
                    <img src="${item.image}">
                    <div><h4>${item.name}</h4><p>₹${item.price}</p></div>
                </div>
                <button class="add-btn" onclick="addToCart(${item.id})">ADD</button>
            </div>`).join('')}`).join('');
}

let cart = [];
function addToCart(id) {
    const item = menuItems.find(i => i.id === id);
    cart.push(item);
    const list = document.getElementById('cartItems');
    list.innerHTML = cart.map(i => `<div class="cart-item"><span>${i.name}</span><span>₹${i.price}</span></div>`).join('');
    const total = cart.reduce((s, i) => s + i.price, 0);
    document.getElementById('cartTotal').innerText = `₹${total}`;
    document.getElementById('checkoutBtn').disabled = false;
}
function goToPayment() {
    const total = cart.reduce((s, i) => s + i.price, 0);
    localStorage.setItem('temp_order', JSON.stringify({ total: total }));
    window.location.href = 'payment.html';
}
// This runs when you click "Place Order" in food.html
function initiateOrder() {
    const total = cart.reduce((s, i) => s + i.price, 0); //
    
    if (total === 0) {
        alert("Your cart is empty!");
        return;
    }

    const r = getRes(); //
    const tempOrder = {
        total: total,
        restaurantName: r ? r.name : "Restaurant",
        items: cart,
        date: new Date().toLocaleDateString()
    };

    // Save for the payment page to read
    localStorage.setItem('temp_order', JSON.stringify(tempOrder));
    window.location.href = 'payment.html'; //
}

/* ==========================================
   7. FOOD, TABLE, & EVENT BOOKING (Update this section)
   ========================================== */

// ... (keep your existing addToCart and initiateOrder functions)

// ADD THIS NEW FUNCTION HERE:
/* ==========================================
   MASTER WALLET & REWARDS LOGIC
   ========================================== */

// Add 'method' as a parameter (e.g., 'wallet' or 'upi')
// Add a parameter to check if it's a 'wallet' or 'external' (UPI/Card) payment
/* ==========================================
   FIXED: Finalize Payment & Order Placement
   ========================================== */
/* Update this function in script.js to match admin.html requirements */
function finalizePayment(method = 'wallet') {
    const tempOrder = JSON.parse(localStorage.getItem('temp_order'));
    if (!tempOrder) return;

    // 1. MUST use 'cart' as the key to sync with Admin Panel
    const orderHistory = JSON.parse(localStorage.getItem('cart')) || [];
    
    const newOrder = {
        id: Date.now(), // Unique ID for Admin logic
        restaurantName: tempOrder.restaurantName,
        items: tempOrder.items.map(i => i.name), // Admin expects an array of strings
        total: tempOrder.total,
        status: 'Preparing', // Initial status for Admin 'Pending' count
        date: new Date().toLocaleDateString(),
        paymentMethod: method
    };

    orderHistory.push(newOrder);
    localStorage.setItem('cart', JSON.stringify(orderHistory)); //

    // 2. Clear temp data and redirect
    localStorage.removeItem('temp_order');
    showSuccessPopup("Order Placed! 🎉", "Your meal is being prepared.");
}
function redeemPoints() {
    // FIX: You must fetch the wallet from storage first
    let wallet = JSON.parse(localStorage.getItem('userWallet')) || { rewardPoints: 0 };
    
    if (wallet.rewardPoints > 0) {
        showConfirmPopup(
            "Redeem Points?", 
            `Convert ${wallet.rewardPoints} points into ₹${wallet.rewardPoints} balance?`, 
            () => {
                wallet.balance += wallet.rewardPoints;
                
                wallet.history.push({
                    desc: "Points Redeemed",
                    amount: `+ ₹${wallet.rewardPoints}`,
                    date: new Date().toLocaleDateString()
                });

                wallet.rewardPoints = 0; // Reset points
                localStorage.setItem('userWallet', JSON.stringify(wallet));
                location.reload(); 
            }
        );
    } else {
        alert("No points available to redeem!");
    }
}

function initIndex() {
    const btn = document.getElementById('navAuthBtn');
    if (localStorage.getItem('isLoggedIn') === 'true') {
        btn.innerText = 'Go to Dashboard 👤';
        btn.href = 'dashboard.html';
    }
}

function loadDetails() {
    const res = getRes();
    if (!res) return;
    const mapQuery = encodeURIComponent(`${res.name} Hyderabad`);
    const mapUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
    
    document.getElementById('restaurantDetail').innerHTML = `
        <div class="banner" style="background-image: url('${res.image}')">
            <div class="overlay"><div class="container">
                <h1 class="res-name">${res.name}</h1>
                <p class="res-meta">${res.cuisine} • ${res.rating} ⭐</p>
            </div></div>
        </div>
        <div class="container">
            <div class="service-grid">
                <a href="food.html" class="service-card"><span class="icon">🍽️</span><h3>Order Food</h3></a>
                <a href="table.html" class="service-card"><span class="icon">🪑</span><h3>Book a Table</h3></a>
                <a href="event.html" class="service-card"><span class="icon">🎉</span><h3>Banquet Hall</h3></a>
            </div>
            <div class="content-grid">
                <div class="details-section"><h4>About</h4><p>${res.description || 'Premium Hyderabad Dining.'}</p></div>
                <div class="details-section"><h4>Location</h4><div class="map-container"><iframe src="${mapUrl}"></iframe></div></div>
            </div>
        </div>`;
}



// // Function to show the Confirmation Popup
// function showConfirmPopup(title, message, onConfirm) {
//     const overlay = document.createElement('div');
//     overlay.id = 'customConfirm';
//     overlay.style = `
//         position: fixed; top: 0; left: 0; width: 100%; height: 100%;
//         background: rgba(0,0,0,0.85); display: flex; align-items: center;
//         justify-content: center; z-index: 10000; backdrop-filter: blur(5px);
//     `;

//     overlay.innerHTML = `
//         <div style="background: var(--card-bg); padding: 40px; border-radius: 25px; border: 1px solid var(--border); text-align: center; max-width: 400px; box-shadow: var(--shadow);">
//             <div style="font-size: 3rem; margin-bottom: 20px;">🤔</div>
//             <h2 style="color: var(--text-main); margin-bottom: 10px;">${title}</h2>
//             <p style="color: var(--text-dim); margin-bottom: 30px;">${message}</p>
//             <div style="display: flex; gap: 15px; justify-content: center;">
//                 <button id="cancelBtn" style="padding: 12px 25px; border-radius: 10px; border: 1px solid var(--border); background: none; color: var(--text-dim); cursor: pointer;">Go Back</button>
//                 <button id="confirmBtn" style="padding: 12px 25px; border-radius: 10px; border: none; background: #ff4757; color: white; font-weight: bold; cursor: pointer;">Yes, Confirm</button>
//             </div>
//         </div>
//     `;

//     document.body.appendChild(overlay);

//     document.getElementById('cancelBtn').onclick = () => overlay.remove();
//     document.getElementById('confirmBtn').onclick = () => {
//         overlay.remove();
//         onConfirm();
//     };
// }

// // Function to show the Success Popup
// function showSuccessPopup(title, message) {
//     const overlay = document.createElement('div');
//     overlay.style = `
//         position: fixed; top: 0; left: 0; width: 100%; height: 100%;
//         background: rgba(0,0,0,0.9); display: flex; align-items: center;
//         justify-content: center; z-index: 10001;
//     `;

//     overlay.innerHTML = `
//         <div style="background: var(--card-bg); padding: 50px; border-radius: 30px; text-align: center; border: 2px solid #2ecc71; animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
//             <div class="success-icon" style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
//             <h2 style="color: #2ecc71; margin-bottom: 10px;">${title}</h2>
//             <p style="color: var(--text-dim);">${message}</p>
//             <p style="margin-top: 20px; font-size: 0.8rem; color: #ff4757;">Redirecting to Dashboard...</p>
//         </div>
//         <style>
//             @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
//         </style>
//     `;

//     document.body.appendChild(overlay);
    
//     // Redirect after 2.5 seconds
//     setTimeout(() => {
//         window.location.href = "dashboard.html";
//     }, 2500);
// }

// --- CUSTOM CONFIRMATION POPUP ---
function showConfirmPopup(title, message, onConfirm) {
    const overlay = document.createElement('div');
    overlay.style = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.85); display: flex; align-items: center;
        justify-content: center; z-index: 10000; backdrop-filter: blur(5px);
    `;

    overlay.innerHTML = `
        <div style="background: var(--card-bg); padding: 40px; border-radius: 25px; border: 1px solid var(--border); text-align: center; max-width: 400px; color: var(--text-main);">
            <div style="font-size: 3rem; margin-bottom: 20px;">🤔</div>
            <h2 style="margin-bottom: 10px;">${title}</h2>
            <p style="color: var(--text-dim); margin-bottom: 30px;">${message}</p>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button id="cancelBtn" style="padding: 12px 25px; border-radius: 10px; border: 1px solid var(--border); background: none; color: var(--text-dim); cursor: pointer;">Go Back</button>
                <button id="confirmBtn" style="padding: 12px 25px; border-radius: 10px; border: none; background: #ff4757; color: white; font-weight: bold; cursor: pointer;">Confirm</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('cancelBtn').onclick = () => overlay.remove();
    document.getElementById('confirmBtn').onclick = () => {
        overlay.remove();
        onConfirm();
    };
}

// --- CUSTOM SUCCESS POPUP ---
function showSuccessPopup(title, message) {
    const overlay = document.createElement('div');
    overlay.style = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9); display: flex; align-items: center;
        justify-content: center; z-index: 10001;
    `;

    overlay.innerHTML = `
        <div style="background: var(--card-bg); padding: 50px; border-radius: 30px; text-align: center; border: 2px solid #2ecc71; color: var(--text-main);">
            <div style="font-size: 4rem; margin-bottom: 20px;">✅</div>
            <h2 style="color: #2ecc71; margin-bottom: 10px;">${title}</h2>
            <p style="color: var(--text-dim);">${message}</p>
            <p style="margin-top: 25px; font-size: 0.8rem; color: #ff4757;">Redirecting to Dashboard...</p>
        </div>
    `;

    document.body.appendChild(overlay);
    
    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 2500);
}

