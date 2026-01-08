// Wireframe-aligned JS: search, popup, dynamic products, blog toggle, form validation

function showPopup(message){
  const modal = document.getElementById('globalModal');
  modal.querySelector('.modal-message').innerText = message;
  modal.classList.add('show');
}
function closePopup(){ document.getElementById('globalModal').classList.remove('show'); }

// --- Search handling ---
function handleSearchInput(ev){
  if(ev.key === 'Enter'){
    const q = ev.target.value.trim();
    if(q){ window.location.href = 'products.html?q=' + encodeURIComponent(q); }
  }
}

function getQueryParam(name){
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || '';
}

const products = [
  {id:1, name:'Bamboo Bottle', image:'assets/images/609689035_4358613927707988_6853016486720159718_n.jpg', price:25, discountPrice:19, description:'Durable bamboo-covered steel bottle.'},
  {id:2, name:'Organic Tote Bag', image:'assets/images/608776101_1416040396825486_813511971113812461_n.jpg', price:15, discountPrice:12, description:'Reusable cotton tote bag.'},
  {id:3, name:'Reusable Kitchen Set', image:'assets/images/607199437_895519612943482_5971018361102862669_n.jpg', price:30, discountPrice:24, description:'Starter kit to reduce single-use items.'}
];

function renderProducts(){
  const mount = document.getElementById('productList');
  if(!mount) return;
  const q = getQueryParam('q').toLowerCase();
  const filtered = q ? products.filter(p => p.name.toLowerCase().includes(q)) : products;
  mount.innerHTML = '';
  filtered.forEach(p =>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="content">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p><strong>Rs. ${p.discountPrice}</strong> <small style="color:#6b7280; text-decoration:line-through">Rs. ${p.price}</small></p>
        <button class="btn" onclick="showPopup('Limited-time deal on ${p.name}!')">View Deal</button>
      </div>`;
    mount.appendChild(card);
  });
  if(filtered.length === 0){
    mount.innerHTML = `<p>No products match "${q}". Try searching for 'bamboo' or 'tote'.</p>`;
  }
}

function toggleBlog(){
  const a = document.getElementById('blogA');
  const b = document.getElementById('blogB');
  const aHidden = a.style.display === 'none';
  a.style.display = aHidden ? 'block' : 'none';
  b.style.display = aHidden ? 'none' : 'block';
}

function validateContactForm(ev){
  ev.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const msg = document.getElementById('message');
  const err = document.getElementById('formError');
  const emailOK = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email.value);
  if(!name.value.trim() || !emailOK || msg.value.trim().length < 10){
    err.textContent = 'Please enter your name, a valid email, and at least 10 characters.';
    err.style.display = 'block';
    return false;
  }
  err.style.display = 'none';
  showPopup('Thanks for contacting EcoMart! We will reply within 24–48 hours.');
  ev.target.reset();
  return true;
}

window.addEventListener('DOMContentLoaded', ()=>{ renderProducts(); });
