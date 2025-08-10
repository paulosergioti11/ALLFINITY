// Menu carrinho
document.getElementById('cart-btn').addEventListener('click', () => {
  const cartSidebar = document.querySelector('.cart-sidebar');
  const isHidden = cartSidebar.getAttribute('aria-hidden') === 'true';
  cartSidebar.setAttribute('aria-hidden', !isHidden);
});

// Animação dos produtos ao rolar
const productCards = document.querySelectorAll('.product');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
productCards.forEach(card => observer.observe(card));

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

    // Muda cor para vermelho se faltar < 1 hora
    if (diff <= 3600000) {
      countdownEl.style.color = 'red';
    } else {
      countdownEl.style.color = 'var(--blue)';
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}
startCountdown();
