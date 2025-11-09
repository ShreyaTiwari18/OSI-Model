

document.addEventListener('DOMContentLoaded', () => {
  
  document.querySelectorAll('.layer-card').forEach(card => {
    const btn = card.querySelector('.toggle-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const circle = btn;
      card.classList.toggle('open');
      
      circle.classList.toggle('rot');
      
      document.querySelectorAll('.layer-card').forEach(sib => {
        if (sib !== card) {
          sib.classList.remove('open');
          const sb = sib.querySelector('.toggle-btn');
          if (sb) sb.classList.remove('rot');
        }
      });
    });
  });

  
  document.querySelectorAll('.stack-item').forEach(item => {
    const layer = item.getAttribute('data-layer');
    item.addEventListener('click', () => {
      
      const card = document.querySelector(`.layer-card[data-id="${layer}"]`);
      if (card) {
        card.scrollIntoView({behavior:'smooth', block:'center'});
        card.classList.add('highlight');
        setTimeout(()=>card.classList.remove('highlight'),900);
        
        const btn = card.querySelector('.toggle-btn');
        if (btn && !card.classList.contains('open')) btn.click();
      }
      
      const iconBtn = item.querySelector('.icon-btn');
      if(iconBtn){
        iconBtn.animate([
          { transform: 'rotate(0deg) scale(1)' },
          { transform: 'rotate(360deg) scale(1.04)' }
        ], { duration: 650, easing: 'cubic-bezier(.2,.9,.2,1)'});
      }
    });
  });

  
  const style = document.createElement('style');
  style.innerHTML = `
    .layer-card.highlight { box-shadow: 0 18px 45px rgba(43,110,246,0.14); transform: translateY(-6px) scale(1.01); transition: all 300ms ease;}
  `;
  document.head.appendChild(style);
});