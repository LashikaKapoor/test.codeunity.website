// Dark/Light Mode Toggle
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('theme') === 'dark'){
    document.body.classList.add('dark');
    toggle.textContent = '☀️';
  }

  // Intersection Observer for fade-in sections
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add('fade-in');
    });
  }, { threshold: 0.2 });
  sections.forEach(sec => observer.observe(sec));
});
