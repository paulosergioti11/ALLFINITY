// Seletores
const cartBtn = document.getElementById('open-cart');
const cartSidebar = document.querySelector('.cart-sidebar');
const overlay = document.querySelector('.overlay');
const closeCartBtn = document.getElementById('close-cart');

// Função para abrir/fechar carrinho
function toggleCart(show) {
  cartSidebar.setAttribute('aria-hidden', show ? 'false' : 'true');
  overlay.style.display = show ? 'block' : 'none';
}

// Eventos
cartBtn.addEventListener('click', () => toggleCart(true));
closeCartBtn.addEventListener('click', () => toggleCart(false));
overlay.addEventListener('click', () => toggleCart(false));

// Cronômetro regressivo diário
function startCountdown() {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return; // evita erro se não existir

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
    countdownEl.style.color = diff <= 3600000 ? 'var(--pink)' : 'var(--turquoise)';
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}
startCountdown();
