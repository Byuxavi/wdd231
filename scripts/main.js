// Módulos JS
import { initThemeToggle } from './modules/theme.js';
import { initMobileMenu } from './modules/mobile-menu.js';
import { initProjectsGallery } from './modules/projects-gallery.js';
import { initContactForm } from './modules/contact-form.js';
import { loadRecentProjects } from './modules/recent-projects.js';

// Inicialización de funcionalidades comunes
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar toggle de tema oscuro/claro
  initThemeToggle();
  
  // Inicializar menú móvil
  initMobileMenu();
  
  
  // Cargar proyectos recientes en la página de inicio si estamos en esa página
  if (document.querySelector('.featured-projects')) {
    loadRecentProjects();
  }
  
  // Inicializar galería de proyectos si estamos en la página de catálogo
  if (document.querySelector('#projects-container')) {
    initProjectsGallery();
  }
  
  // Inicializar formulario de contacto si estamos en la página de contacto
  if (document.querySelector('#contact-form')) {
    initContactForm();
  }
});