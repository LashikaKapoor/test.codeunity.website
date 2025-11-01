// Dark/Light Theme Toggle
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Preserve Theme on Reload
document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('theme') === 'dark'){
    document.body.classList.add('dark');
    toggle.textContent = '☀️';
  }});

// Optional: IntersectionObserver for fade-in animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('fade-in');
    }
  });
},{ threshold: 0.1 });

document.querySelectorAll('section').forEach(section => observer.observe(section));
