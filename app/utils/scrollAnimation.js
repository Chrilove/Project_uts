// app/utils/scrollAnimation.js
export function scrollAnimateElements() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const isInViewport =
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0;
  
      if (isInViewport) {
        setTimeout(() => {
          element.classList.add('animate');
        }, index * 100);
      } else if (element.classList.contains('reset-animation')) {
        element.classList.remove('animate');
      }
    });
  }
  