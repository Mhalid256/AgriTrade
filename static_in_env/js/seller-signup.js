
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('sellerSignupForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (data.password !== data.confirmPassword) {
            showNotification('Passwords do not match!', 'error');
            return;
        }
        
        if (!data.terms) {
            showNotification('Please accept the terms and conditions', 'error');
            return;
        }
        
        // Simulate API call
        showNotification('Creating your seller account...', 'info');
        
        setTimeout(() => {
            showNotification('Account created successfully! Redirecting to dashboard...', 'success');
            setTimeout(() => {
                window.location.href = 'seller-dashboard.html';
            }, 1500);
        }, 2000);
    });
});

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        }
        
        .notification-success {
            border-left: 4px solid var(--primary-green);
        }
        
        .notification-error {
            border-left: 4px solid #e74c3c;
        }
        
        .notification-info {
            border-left: 4px solid var(--primary-orange);
        }
        
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--text-light);
            cursor: pointer;
            margin-left: 15px;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}