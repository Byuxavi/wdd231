// Módulo para manejar la galería de proyectos
export function initProjectsGallery() {
  // Variables de estado
  let projects = [];
  let currentPage = 1;
  let projectsPerPage = 5;
  let totalPages = 1;
  let currentFilter = 'all';
  let currentView = 'cards';
  
  // Referencias a elementos DOM
  const projectsContainer = document.getElementById('projects-container');
  const paginationContainer = document.querySelector('.pagination');
  const prevButton = document.querySelector('.page-btn.prev');
  const nextButton = document.querySelector('.page-btn.next');
  const currentPageEl = document.querySelector('.current-page');
  const totalPagesEl = document.querySelector('.total-pages');
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-body');
  const closeBtn = modal.querySelector('.close-btn');
  
  // Botones de vista (si existen)
  const viewButtons = document.querySelectorAll('.view-btn');
  
  // Función para cargar datos de proyectos
  async function loadProjects() {
    try {
      const response = await fetch('data/projects.json');
      if (!response.ok) {
        throw new Error('Failed to load projects data');
      }
      
      const data = await response.json();
      projects = data.projects;
      
      // Añadir filtros de categoría si existen
      if (data.categories && data.categories.length > 0) {
        setupCategoryFilters(data.categories);
      }
      
      // Calculamos el total de páginas
      totalPages = Math.ceil(projects.length / projectsPerPage);
      totalPagesEl.textContent = totalPages;
      
      // Renderizar la primera página
      renderProjects(currentPage);
      
      // Configurar paginación
      setupPagination();
      
    } catch (error) {
      console.error('Error loading projects:', error);
      projectsContainer.innerHTML = `<p class="error-message">Failed to load projects. Please try again later.</p>`;
    }
  }
  
  // Función para renderizar proyectos
  function renderProjects(page) {
    // Limpiar contenedor
    projectsContainer.innerHTML = '';
    
    // Filtrar proyectos por categoría si es necesario
    const filteredProjects = currentFilter === 'all' 
      ? projects 
      : projects.filter(project => project.category === currentFilter);
    
    // Calcular índices de inicio y fin para esta página
    const startIndex = (page - 1) * projectsPerPage;
    const endIndex = Math.min(startIndex + projectsPerPage, filteredProjects.length);
    
    // Si no hay proyectos
    if (filteredProjects.length === 0) {
      projectsContainer.innerHTML = `<p class="info-message">No projects found in this category.</p>`;
      return;
    }
    
    // Actualizar total de páginas para el filtro actual
    totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    totalPagesEl.textContent = totalPages;
    
    // Asegurar que la página actual es válida
    if (page > totalPages) {
      currentPage = 1;
      currentPageEl.textContent = currentPage;
    }
    
    // Crear elementos de proyecto
    const projectsToShow = filteredProjects.slice(startIndex, endIndex);
    
    // Usar template literal para crear los elementos HTML
    projectsToShow.forEach(project => {
      const projectElement = document.createElement('div');
      projectElement.className = `project-card ${currentView === 'grid' ? 'grid-view' : ''}`;
      projectElement.id = project.id;
      
      // Usar template literal para el contenido
      projectElement.innerHTML = `
        <div class="project-img">
          <img src="${project.image}" alt="${project.name}">
        </div>
        <div class="project-info">
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <div class="project-tags">
            ${project.technologies.slice(0, 3).map(tech => `<span>${tech}</span>`).join('')}
          </div>
          <button class="project-link view-details" data-id="${project.id}">
            View Details <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      `;
      
      projectsContainer.appendChild(projectElement);
    });
    
    // Añadir event listeners a los botones de detalle
    document.querySelectorAll('.view-details').forEach(button => {
      button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-id');
        showProjectDetails(projectId);
      });
    });
    
    // Actualizar estado de botones de paginación
    updatePaginationButtons();
  }
  
  // Función para mostrar detalles de proyecto en modal
  function showProjectDetails(projectId) {
    const project = projects.find(p => p.id === projectId);
    
    if (!project) return;
    
    // Crear contenido del modal con template literal
    modalContent.innerHTML = `
      <div class="modal-header">
        <h2>${project.name}</h2>
        <p class="project-category">${project.category}</p>
      </div>
      <div class="modal-body">
        <div class="project-image">
          <img src="${project.image}" alt="${project.name}">
        </div>
        <div class="project-details">
          <div class="detail-section">
            <h3>Descripción</h3>
            <p>${project.description}</p>
          </div>
          <div class="detail-section">
            <h3>Tecnologías</h3>
            <ul class="tech-list">
              ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
            </ul>
          </div>
          <div class="detail-section">
            <h3>Características</h3>
            <ul class="features-list">
              ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          </div>
          <div class="detail-section">
            <h3>Premios</h3>
            <ul class="awards-list">
              ${project.awards.map(award => `<li>${award}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a href="${project.url}" class="btn primary-btn" target="_blank">Visitar Sitio <i class="fas fa-external-link-alt"></i></a>
      </div>
    `;
    
    // Mostrar modal
    modal.classList.remove('hidden');
    
    // Prevenir scroll en el body mientras el modal está abierto
    document.body.style.overflow = 'hidden';
  }
  
  // Cerrar modal
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });
  
  // Cerrar modal con Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  });
  
  // Cerrar modal al hacer clic fuera del contenido
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  });
  
  // Configurar paginación
  function setupPagination() {
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        currentPageEl.textContent = currentPage;
        renderProjects(currentPage);
      }
    });
    
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        currentPageEl.textContent = currentPage;
        renderProjects(currentPage);
      }
    });
  }
  
  // Actualizar estado de botones de paginación
  function updatePaginationButtons() {
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
  }
  
  // Configurar filtros de categoría - MODIFICADO
  function setupCategoryFilters(categories) {
    // Creamos un contenedor con mejor estructura y diseño
    const filterContainer = document.createElement('div');
    filterContainer.className = 'projects-filter-container';
    
    // Estructura interna de los filtros con mejor semántica
    filterContainer.innerHTML = `
      <div class="filters-header">
        <h3>Filter Projects</h3>
      </div>
      <div class="filter-buttons">
        <button class="filter-btn active" data-filter="all">All Projects</button>
        ${categories.map(cat => `<button class="filter-btn" data-filter="${cat}">${cat}</button>`).join('')}
      </div>
    `;
    
    // Ubicamos los filtros después del header de la página
    // Esto asegura que estén en una posición más lógica
    const projectsSection = document.querySelector('#projects-container').parentElement;
    
    // Si existe la sección de opciones de vista, insertamos antes
    const viewOptions = document.querySelector('.view-options');
    if (viewOptions) {
      projectsSection.insertBefore(filterContainer, viewOptions);
    } else {
      // Si no, insertamos antes del contenedor de proyectos
      projectsSection.insertBefore(filterContainer, projectsContainer.parentElement);
    }
    
    // Añadir event listeners a los botones de filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Actualizar clase activa
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Actualizar filtro y renderizar
        currentFilter = btn.getAttribute('data-filter');
        currentPage = 1;
        currentPageEl.textContent = currentPage;
        renderProjects(currentPage);
      });
    });
  }
  
  // Configurar botones de vista si existen
  if (viewButtons && viewButtons.length > 0) {
    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Actualizar clase activa
        viewButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Actualizar vista
        currentView = btn.getAttribute('data-view');
        renderProjects(currentPage);
      });
    });
  }
  
  // Cargar proyectos al inicializar
  loadProjects();
}