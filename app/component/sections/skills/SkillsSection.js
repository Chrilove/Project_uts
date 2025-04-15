'use client';

import React, { useState, useEffect } from 'react';
import FloatingBubbles from '../../effects/FloatingBubbles'
import BouncingBubbles from '../../effects/BouncingBubbles'
import skills from '../../../data/skillsData';
import './SkillsSection.css';

export default function SkillsSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

return (
 <section className="skills-section" id="skills">
 {isClient && (
    <>
      <BouncingBubbles />
      <FloatingBubbles />
      <BouncingBubbles />
    </>
  )}
  <div className="container">
    <h2 className="text-center skills-title">My Skills</h2>
    <div className="row">
        <div className="col-lg-6 mb-4 mb-lg-0">
        <div className="animate-on-scroll fade-in-right">
          <h3 className="mb-4 skills-sub-title">Kemampuan Unggulan<span className="fs-3">✨</span></h3>
          <p className='skills-subtitle'>Saya memiliki keterampilan dalam merancang dan membangun pengalaman digital yang menarik dan mudah digunakan. Fokus saya adalah menciptakan antarmuka yang fungsional, responsif, dan nyaman bagi pengguna.</p>
          <p className='skills-subtitle'>Dengan kombinasi antara kemampuan teknis dan kreativitas, saya berupaya memberikan hasil kerja terbaik di setiap proyek yang saya kerjakan. Bagi saya, teknologi adalah alat untuk mempermudah hidup dan menciptakan solusi yang bermanfaat.</p>
          <div className="mt-4 skills-sub-title">
            <a href="#projects" className="btn btn-candy me-2">
            <h6 className='skills-subtitle'>See My Enchanted Work</h6>
            </a>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="animate-on-scroll fade-in-left">
          {skills.map((skill, index) => (
            <div className="skill-item" key={index}>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div>
                  <span className="skill-emoji">{skill.emoji}</span>
                  <span className="fw-bold skills-sub-title">{skill.name}</span>
                </div>
                <p className="mb-0 badge bg-primary rounded-pill px-3">{skill.percentage}%</p>
              </div>
              <div className="progress skills-sub-title">
                <div 
                  className="progress-bar" 
                  role="progressbar" 
                  style={{ width: `${skill.percentage}%` }} 
                  aria-valuenow={skill.percentage} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  <div className="bouncing-elements-container"></div>
  </section>
 );
}