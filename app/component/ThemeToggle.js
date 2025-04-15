'use client';
import { useEffect, useState } from 'react';
import '../styles/themeToggle.css'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
  }, []);

  const toggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
    document.body.setAttribute('data-bs-theme', newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
  };

  return (
    <button
      className="theme-toggle-btn"
      onClick={toggle}
      aria-label="Toggle Theme"
    >
      {/* Menampilkan emoji berdasarkan tema */}
      {theme === 'dark' ? '🌙' : '🌞'}
    </button>
  );
}
