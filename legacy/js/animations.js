// Motion.js animations for the website
// This file contains reusable animation configurations

// Wait for Motion library to be loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if Motion is available
  if (typeof Motion === 'undefined') {
    console.warn('Motion library not loaded');
    return;
  }

  // Animate elements on scroll (fade in and slide up)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Fade in and slide up animation
        Motion.animate(
          element,
          {
            opacity: [0, 1],
            transform: ['translateY(50px)', 'translateY(0px)']
          },
          {
            duration: 0.8,
            easing: 'ease-out'
          }
        );
        
        // Unobserve after animation
        animateOnScroll.unobserve(element);
      }
    });
  }, observerOptions);

  // Apply scroll animations to various elements
  const scrollAnimatedElements = document.querySelectorAll(
    'h1, .container, .list-blog > div, #social-media-box, .bg-white, main'
  );
  
  scrollAnimatedElements.forEach(element => {
    // Set initial state
    element.style.opacity = '0';
    animateOnScroll.observe(element);
  });

  // Animate navigation items with stagger effect
  const navItems = document.querySelectorAll('.nav-container ul li');
  navItems.forEach((item, index) => {
    Motion.animate(
      item,
      {
        opacity: [0, 1],
        transform: ['translateY(-20px)', 'translateY(0px)']
      },
      {
        duration: 0.5,
        delay: index * 0.1,
        easing: 'ease-out'
      }
    );
  });

  // Add hover animations to links in blog list
  const blogLinks = document.querySelectorAll('.list-blog > div');
  blogLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      Motion.animate(
        this,
        {
          scale: 1.02,
          boxShadow: ['0 4px 6px -1px rgba(0, 0, 0, 0.1)', '0 20px 25px -5px rgba(0, 0, 0, 0.2)']
        },
        {
          duration: 0.3,
          easing: 'ease-out'
        }
      );
    });

    link.addEventListener('mouseleave', function() {
      Motion.animate(
        this,
        {
          scale: 1,
          boxShadow: ['0 20px 25px -5px rgba(0, 0, 0, 0.2)', '0 4px 6px -1px rgba(0, 0, 0, 0.1)']
        },
        {
          duration: 0.3,
          easing: 'ease-in'
        }
      );
    });
  });

  // Add subtle bounce animation to navigation brand/title
  const navBrand = document.querySelector('.nav-container p');
  if (navBrand) {
    Motion.animate(
      navBrand,
      {
        transform: ['scale(1)', 'scale(1.05)', 'scale(1)']
      },
      {
        duration: 2,
        repeat: Infinity,
        easing: 'ease-in-out'
      }
    );
  }

  // Animate images with a scale effect on load
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.9)';
    
    // Wait for image to load
    if (img.complete) {
      animateImage(img, index);
    } else {
      img.addEventListener('load', () => animateImage(img, index));
    }
  });

  function animateImage(img, index) {
    Motion.animate(
      img,
      {
        opacity: [0, 1],
        transform: ['scale(0.9)', 'scale(1)']
      },
      {
        duration: 0.6,
        delay: index * 0.2,
        easing: 'ease-out'
      }
    );
  }

  // Add pulse animation to important text elements
  const importantTexts = document.querySelectorAll('.inline-quote, .text-lg.font-semibold');
  importantTexts.forEach((text, index) => {
    Motion.animate(
      text,
      {
        opacity: [0, 1],
        scale: [0.95, 1]
      },
      {
        duration: 0.5,
        delay: 0.3 + index * 0.1,
        easing: 'ease-out'
      }
    );
  });

  // Add smooth hover effect for navigation links
  const navLinks = document.querySelectorAll('.nav-container a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      Motion.animate(
        this.querySelector('span'),
        {
          transform: ['translateY(0px)', 'translateY(-3px)']
        },
        {
          duration: 0.3,
          easing: 'ease-out'
        }
      );
    });

    link.addEventListener('mouseleave', function() {
      Motion.animate(
        this.querySelector('span'),
        {
          transform: ['translateY(-3px)', 'translateY(0px)']
        },
        {
          duration: 0.3,
          easing: 'ease-in'
        }
      );
    });
  });

  console.log('Motion.js animations initialized successfully');
});
