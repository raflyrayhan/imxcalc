document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.explore-button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const path = button.getAttribute('data-path');
      if (path) {
        window.location.href = path;
      }
    });
  });
});
