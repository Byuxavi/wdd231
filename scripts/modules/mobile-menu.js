export function initMobileMenu() {
  // tu código va acá adentro
}
// Función para controlar el menú móvil
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  // Verifica si los elementos existen
  if (mobileMenuBtn && navLinks) {
      // Event listener para el botón de menú
      mobileMenuBtn.addEventListener('click', function() {
          // Alterna la clase 'mobile-active' en el menú
          navLinks.classList.toggle('mobile-active');
          
          // Cambia el ícono (opcional - si usas íconos)
          const icon = mobileMenuBtn.querySelector('i');
          if (icon) {
              if (navLinks.classList.contains('mobile-active')) {
                  icon.className = 'fas fa-times'; // Icono X
              } else {
                  icon.className = 'fas fa-bars'; // Icono hamburguesa
              }
          }
      });
      
      // Cerrar el menú al hacer clic en un enlace
      const menuLinks = navLinks.querySelectorAll('a');
      menuLinks.forEach(link => {
          link.addEventListener('click', function() {
              navLinks.classList.remove('mobile-active');
              // Revertir el ícono
              const icon = mobileMenuBtn.querySelector('i');
              if (icon) {
                  icon.className = 'fas fa-bars';
              }
          });
      });
      
      // Cerrar el menú al hacer clic fuera
      document.addEventListener('click', function(event) {
          const isClickInsideMenu = navLinks.contains(event.target);
          const isClickOnMenuButton = mobileMenuBtn.contains(event.target);
          
          if (!isClickInsideMenu && !isClickOnMenuButton && navLinks.classList.contains('mobile-active')) {
              navLinks.classList.remove('mobile-active');
              // Revertir el ícono
              const icon = mobileMenuBtn.querySelector('i');
              if (icon) {
                  icon.className = 'fas fa-bars';
              }
          }
      });
  }
});