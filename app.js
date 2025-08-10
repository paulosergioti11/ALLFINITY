const products = [
  {id:1, title:"Fone Bluetooth X1", price:79.90, img:"https://images.unsplash.com/photo-1518444020937-6b6f8b3b37a9?q=80&w=800&auto=format&fit=crop"},
  {id:2, title:"Relógio SmartFit", price:129.90, img:"https://images.unsplash.com/photo-1517414204281-9c0b1b0aba82?q=80&w=800&auto=format&fit=crop"},
  {id:3, title:"Mini Projetor Portátil", price:189.90, img:"https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=800&auto=format&fit=crop"},
  {id:4, title:"Capa Protetora Silicone", price:29.90, img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop"},
  {id:5, title:"Powerbank 20000mAh", price:99.90, img:"https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=800&auto=format&fit=crop"},
  {id:6, title:"Câmera de Ação 4K", price:249.90, img:"https://images.unsplash.com/photo-1519183071298-a2962eadc3e6?q=80&w=800&auto=format&fit=crop"}
];

const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItemsEl = document.getElementById('cartItems');
const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

let cart = JSON.parse(localStorage.getItem('allfinity_cart') || '[]');

function fmt(n){ return n.toFixed(2).replace('.',',') }

function renderProducts(){
  productGrid.innerHTML = '';
  products.forEach(p=>{
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${p.img}" alt="${p.title}" />
      <h3>${p.title}</h3>
      <div class="price">R$ ${fmt(p.price)}</div>
      <button class="btn" data-id="${p.id}">Adicionar ao carrinho</button>
    `;
    productGrid.appendChild(div);
  });
}

function renderCart(){
  cartItemsEl.innerHTML = '';
  if(cart.length === 0) cartItemsEl.innerHTML = '<p>Seu carrinho está vazio.</p>';
  let total = 0;
  cart.forEach(item=>{
    total += item.price * item.qty;
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img src="${item.img}" alt="${item.title}" />
      <div style="flex:1">
        <div>${item.title}</div>
        <div style="font-weight:600">R$ ${fmt(item.price)} x ${item.qty}</div>
      </div>
      <div>
        <button data-op="dec" data-id="${item.id}">−</button>
        <button data-op="inc" data-id="${item.id}">+</button>
      </div>
    `;
    cartItemsEl.appendChild(el);
  });
  cartCountEl.textContent = cart.reduce((s,i)=>s+i.qty,0);
  cartTotalEl.textContent = fmt(total);
  localStorage.setItem('allfinity_cart', JSON.stringify(cart));
}

document.body.addEventListener('click', e=>{
  const t = e.target;
  if(t.matches('.product .btn')){
    const id = Number(t.dataset.id);
    const p = products.find(x=>x.id===id);
    const inCart = cart.find(x=>x.id===id);
    if(inCart) inCart.qty++;
    else cart.push({...p, qty:1});
    renderCart();
    openCart();
  }
  if(t === cartBtn){ openCart(); }
  if(t === closeCart){ closeCartFn(); }
  if(t.dataset.op){
    const id = Number(t.dataset.id);
    const item = cart.find(x=>x.id===id);
    if(!item) return;
    if(t.dataset.op === 'inc') item.qty++;
    if(t.dataset.op === 'dec') item.qty = Math.max(0, item.qty-1);
    cart = cart.filter(x=>x.qty>0);
    renderCart();
  }
  if(t === checkoutBtn){
    if(cart.length===0){ alert('Carrinho vazio'); return; }
    const text = encodeURIComponent(
      'Olá, gostaria de fazer o pedido:\n' +
      cart.map(i=>`${i.qty}x ${i.title} — R$ ${fmt(i.price)}`).join('\n') +
      `\nTotal: R$ ${cartTotalEl.textContent}`
    );
    window.open(`https://wa.me/SEU_NUMERO_AQUI?text=${text}`, '_blank');
  }
});

function openCart(){ cartSidebar.setAttribute('aria-hidden','false'); }
function closeCartFn(){ cartSidebar.setAttribute('aria-hidden','true'); }

renderProducts();
renderCart();

// Animação de entrada ao rolar
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.product').forEach(card => observer.observe(card));

// Cronômetro regressivo diário
function startCountdown() {
  const countdownEl = document.getElementById('countdown');
