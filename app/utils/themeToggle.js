import { useEffect } from 'react';

export function setInitialTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-bs-theme', savedTheme);
}

export function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-bs-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

export default function ThemeToggle() {
  useEffect(() => {
    setInitialTheme(); // Memanggil setInitialTheme saat pertama kali komponen dimuat
  }, []);

  return (
    <button onClick={toggleTheme} className="theme-toggle-btn">
      <svg id="theme-svg" width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Icon yang akan diganti berdasarkan tema */}
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path id="moon-icon" d="M12 4V2M12 22V20M4.22 4.22L2.81 2.81M21.19 21.19L19.78 19.78M4 12H2M22 12H20M4.22 19.78L2.81 21.19M21.19 2.81L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
