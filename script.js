// Basic interactive behaviour:
// 1) clicking layer circle toggles expand + rotates circle
// 2) clicking the vertical stack icons scrolls to that layer card and pulses it

document.addEventListener('DOMContentLoaded', () => {
  // toggle cards
  document.querySelectorAll('.layer-card').forEach(card => {
    const btn = card.querySelector('.toggle-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const circle = btn;
      card.classList.toggle('open');
      // rotate icon
      circle.classList.toggle('rot');
      // close siblings (optional: keep only one open)
      document.querySelectorAll('.layer-card').forEach(sib => {
        if (sib !== card) {
          sib.classList.remove('open');
          const sb = sib.querySelector('.toggle-btn');
          if (sb) sb.classList.remove('rot');
        }
      });
    });
  });

  // stack buttons -> scroll to card & pulse
  document.querySelectorAll('.stack-item').forEach(item => {
    const layer = item.getAttribute('data-layer');
    item.addEventListener('click', () => {
      // find matching card with same data-id
      const card = document.querySelector(`.layer-card[data-id="${layer}"]`);
      if (card) {
        card.scrollIntoView({behavior:'smooth', block:'center'});
        card.classList.add('highlight');
        setTimeout(()=>card.classList.remove('highlight'),900);
        // also open that card
        const btn = card.querySelector('.toggle-btn');
        if (btn && !card.classList.contains('open')) btn.click();
      }
      // animate the clicked icon
      const iconBtn = item.querySelector('.icon-btn');
      if(iconBtn){
        iconBtn.animate([
          { transform: 'rotate(0deg) scale(1)' },
          { transform: 'rotate(360deg) scale(1.04)' }
        ], { duration: 650, easing: 'cubic-bezier(.2,.9,.2,1)'});
      }
    });
  });

  // small helper: highlight class via CSS animation
  const style = document.createElement('style');
  style.innerHTML = `
    .layer-card.highlight { box-shadow: 0 18px 45px rgba(43,110,246,0.14); transform: translateY(-6px) scale(1.01); transition: all 300ms ease;}
  `;
  document.head.appendChild(style);
});