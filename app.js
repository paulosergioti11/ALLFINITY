// Abrir carrinho
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.querySelector('.cart-sidebar');
const overlay = document.getElementById('overlay');
const closeCartBtn = document.getElementById('close-cart');

cartBtn.addEventListener('click', () => {
  cartSidebar.setAttribute('aria-hidden', 'false');
  overlay.style.display = 'block';
});

// Fechar carrinho pelo botão ✖
closeCartBtn.addEventListener('click', () => {
  cartSidebar.setAttribute('aria-hidden', 'true');
  overlay.style.display = 'none';
});

// Fechar carrinho clicando fora (overlay)
overlay.addEventListener('click', () => {
  cartSidebar.setAttribute('aria-hidden', 'true');
  overlay.style.display = 'none';
});

// Cronômetro regressivo diário
function startCountdown() {
  const countdownEl = document.getElementById('countdown');
  function updateTimer() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 999);
    const diff = midnight - now;

    if (diff <= 0) {
      countdownEl.textContent = "00:00:00";
      return;
    }

    const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

    countdownEl.textContent = `${hours}:${minutes}:${seconds}`;

    // Muda cor para rosa neon se faltar < 1 hora
    if (diff <= 3600000) {
      countdownEl.style.color = 'var(--pink)';
    } else {
      countdownEl.style.color = 'var(--turquoise)';
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}
startCountdown();
