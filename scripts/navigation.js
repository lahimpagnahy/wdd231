

document.addEventListener('DOMContentLoaded', () => {
    
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const primaryNav = document.getElementById('primaryNav');
  
    
    hamburgerBtn.addEventListener('click', () => {
      primaryNav.classList.toggle('open');
      
      hamburgerBtn.textContent = hamburgerBtn.textContent === '☰' ? '✕' : '☰';
    });
  
    
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        primaryNav.classList.remove('open');
        hamburgerBtn.textContent = '☰';
      }
    });
  });