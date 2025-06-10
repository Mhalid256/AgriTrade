
// Dashboard navigation and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Navigation handling
    const navItems = document.querySelectorAll('.nav-item[data-view]');
    const viewContents = document.querySelectorAll('.view-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetView = this.getAttribute('data-view');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show target view
            viewContents.forEach(view => view.classList.remove('active'));
            const targetContent = document.getElementById(targetView);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Update header title
            const headerTitle = document.querySelector('.header-left h1');
            if (headerTitle) {
                headerTitle.textContent = this.textContent.trim();
            }
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            console.log('Searching for:', searchTerm);
            // Add search logic here
        });
    }
    
    // Notification button
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            console.log('Notifications clicked');
            // Add notification logic here
        });
    }
    
    // User profile dropdown
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            console.log('User profile clicked');
            // Add profile dropdown logic here
        });
    }
    
    // Table row interactions
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            console.log('Order row clicked:', this);
            // Add order details modal or navigation logic here
        });
    });
    
    // Product item interactions
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('Product item clicked:', this);
            // Add product details logic here
        });
    });
    
    // Status badge animations
    const statusBadges = document.querySelectorAll('.status-badge');
    statusBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Sidebar toggle for mobile
    function createMobileToggle() {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');
        
        // Create mobile toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-sidebar-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        toggleBtn.style.cssText = `
            display: none;
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1001;
            background: var(--primary-orange);
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(toggleBtn);
        
        // Show toggle button on mobile
        function checkMobile() {
            if (window.innerWidth <= 768) {
                toggleBtn.style.display = 'block';
            } else {
                toggleBtn.style.display = 'none';
                sidebar.classList.remove('open');
            }
        }
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        // Toggle sidebar
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
        
        // Close sidebar when clicking outside
        mainContent.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    }
    
    createMobileToggle();
    
    // Animate stats on load
    function animateStats() {
        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach(stat => {
            const finalValue = stat.textContent;
            stat.textContent = '0';
            
            // Simple animation for numbers
            if (finalValue.includes('$')) {
                const numValue = parseFloat(finalValue.replace(/[$,]/g, ''));
                animateNumber(stat, 0, numValue, '$', ',');
            } else if (finalValue.includes('%')) {
                const numValue = parseFloat(finalValue.replace('%', ''));
                animateNumber(stat, 0, numValue, '', '%');
            } else {
                const numValue = parseInt(finalValue.replace(/,/g, ''));
                animateNumber(stat, 0, numValue, '', '');
            }
        });
    }
    
    function animateNumber(element, start, end, prefix = '', suffix = '') {
        const duration = 2000;
        const steps = 60;
        const increment = (end - start) / steps;
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (prefix === '$') {
                displayValue = displayValue.toLocaleString();
            }
            
            element.textContent = prefix + displayValue + suffix;
        }, duration / steps);
    }
    
    // Initialize animations
    setTimeout(animateStats, 500);
    
    // Add loading states for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = originalText;
                }, 1500);
            }
        });
    });
});

// Add some utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--white);
        color: var(--text-dark);
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}