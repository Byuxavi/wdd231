/**
 * Recent Projects Module
 * Loads and displays featured projects on the homepage
 */

// Sample project data - in a real application, this would come from an API or CMS
const projectsData = [
    {
      id: 'proj01',
      title: 'Portfolio Personal',
      description: 'Sitio web moderno para presentar un portafolio profesional.',
      image: 'images/portfolio.jpg',
      tags: ['HTML', 'CSS', 'JavaScript'],
      featured: true
    },
    {
      id: 'proj02',
      title: 'E-commerce React',
      description: 'Plataforma de e-commerce con React y Firebase.',
      image: 'images/ecommerce.jpg',
      tags: ['React', 'Firebase', 'CSS'],
      featured: true
    },
    {
      id: 'proj03',
      title: 'Dashboard Admin',
      description: 'Panel de administración con estadísticas y gráficos interactivos.',
      image: 'images/dashboard.jpg',
      tags: ['Vue.js', 'Chart.js', 'SCSS'],
      featured: true
    },
    {
      id: 'proj04',
      title: 'App de Gestión',
      description: 'Aplicación web para gestión de proyectos y tareas.',
      image: 'images/app.jpg',
      tags: ['JavaScript', 'Node.js', 'MongoDB'],
      featured: false
    }
  ];
  
  /**
   * Loads recent featured projects into the homepage
   */
  export function loadRecentProjects() {
    const featuredContainer = document.querySelector('.project-grid');
    
    if (!featuredContainer) return;
    
    // Clear existing content if needed (we might already have hardcoded projects in HTML)
    // featuredContainer.innerHTML = '';
    
    // Get featured projects only
    const featuredProjects = projectsData.filter(project => project.featured);
    
    // Check if we already have projects in the HTML (if so, we'll skip rendering)
    const existingProjects = featuredContainer.querySelectorAll('.project-card');
    
    // Only load projects if we don't already have them in the HTML
    if (existingProjects.length === 0) {
      featuredProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        featuredContainer.appendChild(projectCard);
      });
    } else {
      // If we already have project cards, we can update their content if needed
      // This is useful if the data might change dynamically
      updateExistingProjects(existingProjects);
    }
  }
  
  /**
   * Creates a project card element
   * @param {Object} project - Project data
   * @returns {HTMLElement} - Project card element
   */
  function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card featured';
    card.id = project.id;
    
    card.innerHTML = `
      <div class="project-img">
        <img src="${project.image}" alt="${project.title}">
      </div>
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
        </div>
        <a href="catalog.html#${project.id}" class="project-link">View Details <i class="fas fa-arrow-right"></i></a>
      </div>
    `;
    
    return card;
  }
  
  /**
   * Updates existing project cards with current data
   * @param {NodeList} existingProjects - Existing project cards
   */
  function updateExistingProjects(existingProjects) {
    existingProjects.forEach((card, index) => {
      // Find corresponding project data
      const projectId = card.id;
      const projectData = projectsData.find(p => p.id === projectId);
      
      if (!projectData) return;
      
      // Update content if needed
      const titleEl = card.querySelector('h3');
      const descEl = card.querySelector('p');
      const imgEl = card.querySelector('img');
      
      if (titleEl && titleEl.textContent !== projectData.title) {
        titleEl.textContent = projectData.title;
      }
      
      if (descEl && descEl.textContent !== projectData.description) {
        descEl.textContent = projectData.description;
      }
      
      if (imgEl && imgEl.src !== projectData.image) {
        imgEl.src = projectData.image;
        imgEl.alt = projectData.title;
      }
    });
  }
  
  /**
   * Get projects by category
   * @param {string} category - Project category
   * @returns {Array} Filtered projects
   */
  export function getProjectsByCategory(category) {
    if (!category || category === 'all') {
      return projectsData;
    }
    
    return projectsData.filter(project => 
      project.tags.some(tag => tag.toLowerCase() === category.toLowerCase())
    );
  }
  
  /**
   * Get project by ID
   * @param {string} id - Project ID
   * @returns {Object|null} Project data or null if not found
   */
  export function getProjectById(id) {
    return projectsData.find(project => project.id === id) || null;
  }