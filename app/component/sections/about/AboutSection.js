'use client';

import React, { useState, useEffect } from 'react';
import './AboutSection.css'

export default function AboutSection() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="about-section" id="about">
        <div className="container">
          <h2 className="text-center about-title">About Me</h2>
          <div className="row align-items-center">
            <div className="col-lg-3 mb-4 mb-lg-0">
              <div className="animate-on-scroll fade-in-right">
                <img src="/images/foto.jpg" alt="Profile" className="profile-img img-fluid" />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="animate-on-scroll fade-in-left">
                <h3 className="mb-1 about-sub-title">Hi, Aku Christianty! 👋 <span className="fs-3">✨</span></h3>
                <p className="about-subtitle"> Seorang mahasiswa yang penuh semangat dan tertarik dengan 
                pengembangan web serta desain. Passionate dalam belajar hal baru dan berusaha 
                memberikan yang terbaik dalam setiap proyek yang dikerjakan. "Believe in 
                yourself, and you can achieve anything!" 🌟 </p>
                <div className="row mt-2">
                  <div className="col-md-6 about-subtitle">
                    <p><i className="bi bi-person-heart me-2 text-primary"></i><strong>Name:</strong> Christianty Nur Fhadilah</p>
                    <p><i className="bi bi-envelope-heart me-2 text-primary"></i><strong>Email:</strong> chrilove@gmail.com</p>
                    <p><i className="bi bi-geo-alt-fill me-2 text-primary"></i><strong>Location:</strong> Bandung, Indonesia</p>
                  </div>
                  <div className="col-md-6 about-subtitle">
                    <a href="/CV CHRISTIANTY FOR WEB MOBILE.pdf" className="btn btn-outline-primary about-subtitle" download>
                    <i className="bi bi-file-earmark-person me-2 about-subtitle"></i>Donwload CV
                  </a>
                  </div>
                </div>
                <div className="mt-4">
                </div>
              </div>
            </div>
          </div>
        </div>        <div className="bouncing-elements-container"></div>
    </section>
   );
}