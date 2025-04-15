'use client';

import React, { useState, useEffect } from 'react';
import FloatingBubbles from '../../effects/FloatingBubbles'
import BouncingBubbles from '../../effects/BouncingBubbles'
import experiences from '../../../data/experiencesData';
import './ExperienceSection.css'; 

export default function ExperienceSection() {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

return (

<section className="experiences-section" id="experience">
{isClient && (
    <>
      <BouncingBubbles />
      <FloatingBubbles />
      <BouncingBubbles count={8}/>
    </>
  )}
  <div className="container">
    <h2 className="section-title experience-title">My Timeline</h2>
    <div className="row">
      <div className="col-lg-8 mx-auto hero-title">
        {experiences.map((exp, index) => (
          <div
            className={`animate-on-scroll fade-in-up hero-sub-title ${exp.type}`}
            key={exp.id}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="timeline-item">
              <div className="timeline-emoji">{exp.emoji}</div>
              <h4 className="hero-title timeline-title">{exp.title}</h4>
              <h5 className='timeline-sub-title'>{exp.company}</h5>
              <p className="timeline-period hero-sub-title">
                <i className="bi bi-calendar-heart me-2 hero-sub-title"></i>{exp.period}
              </p>
              <p className='timeline-sub-title'>{exp.description}</p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  </section>    
  );
  }