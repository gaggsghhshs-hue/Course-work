// Filter products based on search query
function filterProducts(query) {
    const cards = document.querySelectorAll('.eco-card');
    const searchTerm = query.toLowerCase();
    
    cards.forEach(card => {
        const name = card.getAttribute('data-name');
        const description = card.querySelector('p');
        
        if (name && description) {
            const nameText = name.toLowerCase();
            const descText = description.textContent.toLowerCase();
            
            if (nameText.includes(searchTerm) || descText.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Handle search from any page
function handleSearchHome(event) {
    if (event.key === 'Enter') {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            const searchQuery = searchInput.value;
            if (searchQuery.trim()) {
                window.location.href = 'products.html?search=' + encodeURIComponent(searchQuery);
            }
        }
    }
}

// Load search results when products page loads
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = searchQuery;
            filterProducts(searchQuery);
        }
    }
});

// Add to Cart function
function addToCart(button) {
    // Get the product card
    var card = button.closest('.eco-card');
    
    // Get product information
    var name = card.getAttribute('data-name');
    var price = card.getAttribute('data-price');
    var image = card.getAttribute('data-image');
    
    // Get cart from browser storage
    var cartData = localStorage.getItem('cartItems');
    var cart = [];
    
    // If cart exists, convert it from text to object
    if (cartData != null) {
        cart = JSON.parse(cartData);
    }
    
    // Create product object
    var product = {
        id: Date.now(),
        name: name,
        price: price,
        image: image,
        quantity: 1
    };
    
    // Add product to cart
    cart.push(product);
    
    // Save cart back (convert object to text)
    localStorage.setItem('cartItems', JSON.stringify(cart));
    
    // Show message
    alert(name + ' added to cart!');
}




