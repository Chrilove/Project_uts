'use client';

import { useState, useEffect } from 'react';
import projects from '../../../data/projectData';
import FloatingBubbles from '../../effects/FloatingBubbles'
import BouncingBubbles from '../../effects/BouncingBubbles'
import './ProjectsSection.css';

export default function ProjectsSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
return (

<section className="projects-section py-5" id="projects">
{isClient && (
    <>
      <BouncingBubbles count={8} />
      <FloatingBubbles count={50} />
      <BouncingBubbles count={8} />
    </>
  )}
  
<div className="container">
  <h2 className="section-title text-center mb-5 projects-title">My Projects</h2>
  <div className="row">
    {isClient && projects.map((project, index) => (
      <div className="col-md-4 mb-4 projects-sub-title" key={project.id}>
        <div
           className={`project-card card shadow-sm h-100 animate-on-scroll card-${index + 1}`}
           style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="position-relative">
            <img
              src={project.imageUrl}
              className="card-img-top"
              alt={project.title}
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div
              className="position-absolute top-0 start-0 p-2 fs-4 projects-sub-title"
              style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '0 0.5rem 0.5rem 0' }}
            >
              {project.emoji}
            </div>
          </div>
          <div className="card-body d-flex flex-column">
            <h5 className="card-title projects-title">{project.title}</h5>
            <p className="card-text flex-grow-1 projects-subtitle">{project.description}</p>
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-auto"
              >
                <i></i><h6  className="bi bi-magic me-2 projects-sub-title"> <b>View Project</b></h6>
              </a>
            ) : (
              <button className="btn btn-secondary mt-auto projects-subtitle" disabled>
                Coming Soon
              </button>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
</section>
 );
}