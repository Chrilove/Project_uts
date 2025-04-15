'use client';

import React, { useState, useEffect } from 'react';
import FloatingBubbles from '../../effects/FloatingBubbles'
import BouncingBubbles from '../../effects/BouncingBubbles'
import './HeroSection.css'

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

return (
<section className="hero-section d-flex align-items-center position-relative" id="hero" style={{minHeight: '100vh'}}>
{isClient && (
    <>
      <BouncingBubbles count={100}/>
      <FloatingBubbles count={100}/>
      <BouncingBubbles count={8}/>
    </>
  )}
<div className="hero-overlay position-absolute top-0 start-0 w-100 h-100"></div>
<div className="container text-center">
  <div className="animate-on-scroll pulse">
    <h1 className="display-2 fw-bold hero-title">Christianty Nur Fhadilah</h1>
  </div>
  <div className="mt-5 animate-on-scroll" style={{animationDelay: '0.4s'}}>
    <a href="#contact" className="btn btn-candy btn-lg me-3 px-4 py-3 hero-sub-title">
      <i className="bi bi-chat-heart me-2"></i>Contact Me
    </a>
    <a href="#projects" className="btn btn-candy btn-lg me-3 px-4 py-3 hero-sub-title ">
      <i className="bi bi-stars me-2 "></i>See My Project
    </a>
  </div>
</div>
<div className="scroll-down hero-sub-title ">
  <span><b className='hero-sub-title'>Scroll Down</b></span>
  <div className="scroll-down-arrow ">
    <i className="bi bi-chevron-down"></i>
  </div>
</div>
</section>
 );
}