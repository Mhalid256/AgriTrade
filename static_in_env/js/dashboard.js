
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeNavigation();
    initializeProductUpload();
    initializeProductSearch();
    loadProducts();
});

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-view]');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const view = this.getAttribute('data-view');
            switchView(view);
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Switch between dashboard views
function switchView(viewName) {
    const views = document.querySelectorAll('.view-content');
    views.forEach(view => {
        view.classList.remove('active');
    });
    
    const targetView = document.getElementById(viewName);
    if (targetView) {
        targetView.classList.add('active');
    }
    
    // Update navigation
    const navItems = document.querySelectorAll('.nav-item[data-view]');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-view') === viewName) {
            item.classList.add('active');
        }
    });
}

// Product upload functionality
function initializeProductUpload() {
    const form = document.getElementById('productUploadForm');
    const imageUploadArea = document.getElementById('imageUploadArea');
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    
    let uploadedImages = [];
    
    // Handle image upload area click
    imageUploadArea.addEventListener('click', function() {
        imageUpload.click();
    });
    
    // Handle drag and drop
    imageUploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = 'var(--primary-orange)';
    });
    
    imageUploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = 'var(--border)';
    });
    
    imageUploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = 'var(--border)';
        const files = Array.from(e.dataTransfer.files);
        handleImageFiles(files);
    });
    
    // Handle file input change
    imageUpload.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        handleImageFiles(files);
    });
    
    function handleImageFiles(files) {
        files.forEach(file => {
            if (file.type.startsWith('image/') && uploadedImages.length < 5) {
                uploadedImages.push(file);
                displayImagePreview(file, uploadedImages.length - 1);
            }
        });
    }
    
    function displayImagePreview(file, index) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewItem = document.createElement('div');
            previewItem.className = 'image-preview-item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button type="button" class="remove-btn" onclick="removeImage(${index})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            imagePreview.appendChild(previewItem);
        };
        reader.readAsDataURL(file);
    }
    
    // Global function to remove image
    window.removeImage = function(index) {
        uploadedImages.splice(index, 1);
        renderImagePreviews();
    };
    
    function renderImagePreviews() {
        imagePreview.innerHTML = '';
        uploadedImages.forEach((file, index) => {
            displayImagePreview(file, index);
        });
    }
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const productData = Object.fromEntries(formData);
        
        // Add images to product data
        productData.images = uploadedImages;
        
        // Basic validation
        if (!productData.productName || !productData.price || !productData.category) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Simulate API call
        showNotification('Uploading product...', 'info');
        
        setTimeout(() => {
            showNotification('Product uploaded successfully!', 'success');
            
            // Reset form
            form.reset();
            uploadedImages = [];
            imagePreview.innerHTML = '';
            
            // Refresh products list
            loadProducts();
            
            // Switch to products view
            setTimeout(() => {
                switchView('products');
            }, 1500);
        }, 2000);
    });
}

// Product search functionality
function initializeProductSearch() {
    const searchInput = document.getElementById('productSearch');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterProducts(searchTerm);
    });
}

function filterProducts(searchTerm) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-title').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Load and display products
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    // Mock product data
    const products = [
        {
            id: 1,
            name: "Wireless Bluetooth Headphones",
            price: 79.99,
            stock: 25,
            category: "Electronics",
            status: "active",
            views: 145
        },
        {
            id: 2,
            name: "Cotton T-Shirt",
            price: 24.99,
            stock: 0,
            category: "Clothing",
            status: "out_of_stock",
            views: 89
        },
        {
            id: 3,
            name: "Gaming Mouse",
            price: 49.99,
            stock: 12,
            category: "Electronics",
            status: "active",
            views: 203
        },
        {
            id: 4,
            name: "Coffee Mug",
            price: 12.99,
            stock: 50,
            category: "Home",
            status: "active",
            views: 67
        }
    ];
    
    productsGrid.innerHTML = '';
    
    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <div class="no-products-content">
                    <i class="fas fa-box-open"></i>
                    <h3>No products found</h3>
                    <p>Start by uploading your first product</p>
                    <button class="btn btn-primary" onclick="switchView('upload')">Add Your First Product</button>
                </div>
            </div>
        `;
        return;
    }
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const statusClass = `status-${product.status.replace('_', '-')}`;
    const statusText = product.status === 'active' ? 'Active' : 
                     product.status === 'out_of_stock' ? 'Out of Stock' : 'Draft';
    
    card.innerHTML = `
        <div class="product-image">
            <i class="fas fa-image"></i>
            <span>Product Image</span>
        </div>
        <div class="product-content">
            <div class="product-header">
                <div>
                    <h3 class="product-title">${product.name}</h3>
                </div>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="product-price">$${product.price}</div>
            <div class="product-meta">
                <span>Stock: ${product.stock}</span>
                <span>${product.views} views</span>
            </div>
            <div class="product-category">Category: ${product.category}</div>
            <div class="product-actions">
                <button class="btn btn-outline" onclick="viewProduct(${product.id})">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="btn btn-outline" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-outline" onclick="deleteProduct(${product.id})" style="color: #e74c3c; border-color: #e74c3c;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Product action functions
window.viewProduct = function(productId) {
    showNotification(`Viewing product ${productId}`, 'info');
};

window.editProduct = function(productId) {
    showNotification(`Editing product ${productId}`, 'info');
};

window.deleteProduct = function(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        showNotification(`Product ${productId} deleted`, 'success');
        loadProducts(); // Refresh the list
    }
};

// Notification system
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
    
    // Add notification styles if not already added
    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
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
            
            .no-products {
                grid-column: 1 / -1;
                text-align: center;
                padding: 60px 20px;
            }
            
            .no-products-content i {
                font-size: 4rem;
                color: var(--text-light);
                margin-bottom: 20px;
            }
            
            .no-products-content h3 {
                font-size: 1.5rem;
                color: var(--text-dark);
                margin-bottom: 10px;
            }
            
            .no-products-content p {
                color: var(--text-light);
                margin-bottom: 30px;
            }
        `;
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

// Make switchView function global
window.switchView = switchView;