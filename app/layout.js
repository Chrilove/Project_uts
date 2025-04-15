'use client';

import "bootstrap/dist/css/bootstrap.min.css"; // Pastikan CSS sudah diimpor
import { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import "./styles/globals.css";
import Script from "next/script"; // Impor Script
import { ThemeProvider } from 'next-themes'; // Import ThemeProvider dari next-themes

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState('light');

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  // Update DOM and localStorage when theme changes
  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);

    const navbar = document.querySelector(".navbar");
    if (navbar) {
      navbar.setAttribute("data-bs-theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    document.body.classList.add("content-wrapper");
    const elementsToAnimate = document.querySelectorAll(".section-title, .card, .btn-primary");
    elementsToAnimate.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("zoom-in-out");
      }, index * 100);
    });
  }, []);

  return (
    <html lang="en">
      <head>
        <title>My Portfolio</title>
        <meta name="description" content="A creative portfolio website" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Navbar theme={theme} setTheme={setTheme} />
          <main>{children}</main>
        </ThemeProvider>
        <Script 
          strategy="afterInteractive" 
          src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.0/js/bootstrap.bundle.min.js" 
        />
      </body>
    </html>
  );
}
