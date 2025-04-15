'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { scrollAnimateElements } from './utils/scrollAnimation';
import { setInitialTheme } from "./utils/themeToggle";
import './styles/globals.css';
import CommentSection from './utils/commentSection/commentSection';
import HeroSection from './component/sections/hero/HeroSection';
import AboutSection from './component/sections/about/AboutSection';
import ProjectsSection from './component/sections/projects/ProjectsSection';
import ExperienceSection from './component/sections/experience/ExperienceSection';
import SkillsSection from './component/sections/skills/SkillsSection';
import ContactSection from './component/sections/contact/ContactSection';
import ChatbotUI from './component/ChatbotUI';
import ThemeToggle from './component/ThemeToggle';

export default function PortfolioPage() {
  const [isClient, setIsClient] = useState(false);
  const [rating, setRating] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const ProjectsSection = dynamic(() => import('./component/sections/projects/ProjectsSection'), { ssr: false });
  const ChatbotUI = dynamic(() => import('./component/ChatbotUI'), { ssr: false });
  const ThemeToggle = dynamic(() => import('./component/ThemeToggle'), { ssr: false });


  // ✅ Tambahkan fungsi ini
  const handleAddComment = async (commentData) => {
    // Simpan ke server
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData),
    });

    const data = await res.json();
    // Tambahkan ke local state
    setCommentsList(prev => [...prev, data.comment]);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form[0].value;
    const email = form[1].value;
    const message = form[2].value; // ambil langsung textarea
    const subject = "Contact Form"; // optional default value
  
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    });
  
    if (res.ok) {
      alert("Pesan telah dikirim!");
      form.reset();
    } else {
      alert("Gagal mengirim pesan. Silakan coba lagi.");
    }
  };

  useEffect(() => {
    setIsClient(true);
    setInitialTheme(); 
    setTimeout(scrollAnimateElements, 100);
    window.addEventListener('scroll', scrollAnimateElements);
    return () => window.removeEventListener('scroll', scrollAnimateElements);
  }, []);
  

  return (
    <>
      <HeroSection />
      <AboutSection />
      {isClient && <ProjectsSection />}
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
      <ChatbotUI />
      <ThemeToggle />
  
     {/* Footer */}
     <footer className="py-4" style={{ background: 'linear-gradient(135deg, #ffa7e3a7, #ec99ffa7)' }}>
       <div className="container text-center text-white">
         <p className="mb-2 hero-title">✨ Made by Christianty ✨</p>
         <p className="mb-0 hero-sub-title">© {new Date().getFullYear()} | All rights reserved</p>
       </div>
     </footer>
              
     {/* Add Bootstrap Icons */}
     {isClient && (
       <link 
         rel="stylesheet" 
         href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css"
       />
     )}
     
     {/* Add Google Font */}
     {isClient && (
       <link
         href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap"
         rel="stylesheet"
       />
     )}
   </>
 );
}