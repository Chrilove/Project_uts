// Set up scroll animations and active navigation highlighting
export function setupScrollAnimation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Add visible class to elements when they enter viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const animatedElements = entry.target.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
          animatedElements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('visible');
            }, index * 150);
          });
          
          // Apply zoom-in-out animation to section title
          const sectionTitle = entry.target.querySelector('.section-title');
          if (sectionTitle && !sectionTitle.classList.contains('animated')) {
            sectionTitle.classList.add('zoom-in-out', 'animated');
          }
          
          // Update active nav link
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active', 'active-section-indicator');
            if (link.getAttribute('href').includes(id)) {
              link.classList.add('active', 'active-section-indicator');
            }
          });
        }
      });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
      observer.observe(section);
    });
    
    // Handle scroll event for navbar appearance change
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Update active nav link based on scroll position
      let currentSection = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active', 'active-section-indicator');
        if (link.getAttribute('href').includes(currentSection)) {
          link.classList.add('active', 'active-section-indicator');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set active states
    handleScroll();
    
    // Smooth scroll for anchor links with enhanced animations
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const targetSection = document.querySelector(href);
          if (targetSection) {
            window.scrollTo({
              top: targetSection.offsetTop - 80,
              behavior: 'smooth'
            });
            
            // Apply section entry animation
            targetSection.classList.add('section-enter');
            
            // Animate elements inside the section
            const elementsToAnimate = targetSection.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
            elementsToAnimate.forEach((el, index) => {
              el.classList.remove('visible');
              setTimeout(() => {
                el.classList.add('visible');
              }, index * 150);
            });
            
            // Apply zoom animation to section title
            const sectionTitle = targetSection.querySelector('.section-title');
            if (sectionTitle) {
              sectionTitle.classList.remove('zoom-in-out');
              // Trigger reflow to restart animation
              void sectionTitle.offsetWidth;
              sectionTitle.classList.add('zoom-in-out');
            }
          }
        }
      });
    });
    
    // Return cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }
  
  // Create bubbles for background effect with blue color scheme
  export function createBubbles(container, count = 12) {
    if (!container) return;
    
    // Clear existing bubbles
    container.innerHTML = '';
    
    // Blue color scheme gradients
    const gradients = [
      'linear-gradient(45deg, #2196F3, #0d47a1)',
      'linear-gradient(135deg, #64B5F6, #1976D2)',
      'linear-gradient(225deg, #90CAF9, #42A5F5)',
      'linear-gradient(315deg, #BBDEFB, #2196F3)',
      'radial-gradient(circle, #E3F2FD, #1E88E5)'
    ];
    
    for (let i = 0; i < count; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      
      // Random properties
      const size = Math.floor(Math.random() * 100) + 40; // 40-140px
      const gradient = gradients[Math.floor(Math.random() * gradients.length)];
      const left = Math.floor(Math.random() * 100);
      const top = Math.floor(Math.random() * 100);
      const delay = Math.random() * 5;
      const duration = Math.random() * 5 + 5; // 5-10s
      
      // Apply styles
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.backgroundImage = gradient;
      bubble.style.left = `${left}%`;
      bubble.style.top = `${top}%`;
      bubble.style.animationDelay = `${delay}s`;
      bubble.style.animationDuration = `${duration}s`;
      
      container.appendChild(bubble);
    }
  }
  
  // Add zoom effect to elements with enhanced animation
  export function addZoomEffect(element, delay = 0) {
    if (!element) return;
    
    // Remove existing animation class if any
    element.classList.remove('zoom-in-out');
    
    // Force reflow to reset animation
    void element.offsetWidth;
    
    // Add animation class after delay
    setTimeout(() => {
      element.classList.add('zoom-in-out');
    }, delay);
  }