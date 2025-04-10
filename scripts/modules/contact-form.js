/**
 * Contact Form Module
 * Handles form validation, submission, and feedback for the contact form
 */

export function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    
    if (!contactForm) return;
    
    // Form validation
    function validateField(field) {
      const value = field.value.trim();
      const feedbackEl = field.nextElementSibling;
      
      if (field.required && value === '') {
        field.classList.add('error');
        if (feedbackEl && feedbackEl.classList.contains('form-feedback')) {
          feedbackEl.textContent = 'This field is required';
        }
        return false;
      }
      
      // Email validation
      if (field.type === 'email' && value !== '') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          field.classList.add('error');
          if (feedbackEl && feedbackEl.classList.contains('form-feedback')) {
            feedbackEl.textContent = 'Please enter a valid email address';
          }
          return false;
        }
      }
      
      // Clear error state
      field.classList.remove('error');
      if (feedbackEl && feedbackEl.classList.contains('form-feedback')) {
        feedbackEl.textContent = '';
      }
      return true;
    }
    
    // Handle input events to validate in real-time
    contactForm.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('blur', () => {
        validateField(field);
      });
      
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
          validateField(field);
        }
      });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate all required fields
      let isValid = true;
      contactForm.querySelectorAll('input, textarea').forEach(field => {
        if (!validateField(field)) {
          isValid = false;
        }
      });
      
      if (!isValid) {
        return;
      }
      
      // Collect form data
      const formData = new FormData(contactForm);
      const formDataObj = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      
      // Simulate form submission with a timeout
      const submitButton = contactForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      // In a real application, this would be an API call
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
        
        // Show success modal
        if (successModal) {
          successModal.classList.remove('hidden');
        }
        
        // Reset form
        contactForm.reset();
        
        // Log form data (for development purposes)
        console.log('Form submitted with data:', formDataObj);
      }, 1500);
    });
    
    // Modal handling
    if (successModal) {
      const closeButtons = successModal.querySelectorAll('.close-btn, .modal-close');
      closeButtons.forEach(button => {
        button.addEventListener('click', () => {
          successModal.classList.add('hidden');
        });
      });
      
      // Close modal when clicking outside
      successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
          successModal.classList.add('hidden');
        }
      });
      
      // Close modal with escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !successModal.classList.contains('hidden')) {
          successModal.classList.add('hidden');
        }
      });
    }
  }