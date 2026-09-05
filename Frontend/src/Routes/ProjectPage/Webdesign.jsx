import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Webdesign.css';

const projects = [
  {
    title: 'Web Design Showcase',
    tag: 'Web Design',
    description:
      'A focused web design concept shaped around clear visual hierarchy, engaging interactions, and a polished digital experience.',
    highlights: ['User-focused layouts', 'Visual hierarchy', 'Responsive design'],
    video: 'https://www.youtube.com/embed/Uud1Umtxi10?si=5p6RpVl7KbWokiB1',
  },
];

const Webdesign = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="web-page">
      <section className="web-hero">
        <div className="web-hero__content">
          <p className="web-kicker">Digital Experiences • Web Design</p>
          <h1>Web Design Projects</h1>
          <p>
            A curated collection of web concepts shaped with thoughtful structure,
            engaging visuals, and a modern digital aesthetic.
          </p>
          <div className="web-actions">
            <Link to="/portfolio" className="web-btn web-btn--primary">
              Explore More Work
            </Link>
            <a href="#project-list" className="web-btn web-btn--ghost">
              View Projects
            </a>
          </div>
        </div>

        <div className="web-hero__stats">
          <div>
            <strong>01</strong>
            <span>Featured project</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>Custom concepts</span>
          </div>
          <div>
            <strong>UX</strong>
            <span>Experience focused</span>
          </div>
        </div>
      </section>

      <section id="project-list" className="web-container">
        {projects.map((project, index) => (
          <article
            className={`card-item ${index % 2 === 1 ? 'card-item--reverse' : ''}`}
            key={project.title}
          >
            <div className="card-media">
              <iframe
                src={project.video}
                title={`${project.title} showcase`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>

            <div className="card-copy">
              <span className="card-badge">{project.tag}</span>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <ul className="card-highlights">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Webdesign;
