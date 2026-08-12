import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Graphicdesignpro.css';

const projects = [
  {
    title: 'Burger Poster',
    tag: 'Brand Campaign',
    description:
      'A bold promotional concept crafted to blend cinematic mood with modern typography, designed to instantly capture attention and communicate personality.',
    highlights: ['Visual storytelling', 'Mood-driven composition', 'Adobe Photoshop'],
    video: 'https://www.youtube.com/embed/tfDsfbT8AQ0?si=IluE57Qy_r9JYyel',
  },
  {
    title: 'Snack Poster',
    tag: 'Packaging Visuals',
    description:
      'A vibrant poster layout focused on product appeal, color contrast, and balance to create a polished commercial identity that feels fresh and memorable.',
    highlights: ['Color theory', 'Product emphasis', 'Editorial layout'],
    video: 'https://www.youtube.com/embed/iCbChKLm-LA?si=MXOKUce9bViTaYdD',
  },
  {
    title: 'Nails Poster',
    tag: 'Creative Promotion',
    description:
      'A refined design piece that combines elegance and energy, turning a simple concept into a striking visual experience with attention to detail and rhythm.',
    highlights: ['Stylized branding', 'Typography balance', 'High-impact composition'],
    video: 'https://www.youtube.com/embed/GuAnD8X9Rxc?si=cmxfeMpHiTNkOGby',
  },
];

const Graphicdesignpro = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="gra-page">
      <section className="gra-hero">
        <div className="gra-hero__content">
          <p className="gra-kicker">Creative Direction • Graphic Design</p>
          <h1>Graphic Design Projects</h1>
          <p>
            A curated collection of visual concepts shaped with bold composition,
            thoughtful storytelling, and a modern digital aesthetic.
          </p>
          <div className="gra-actions">
            <Link to="/portfolio" className="gra-btn gra-btn--primary">
              Explore More Work
            </Link>
            <a href="#project-list" className="gra-btn gra-btn--ghost">
              View Gallery
            </a>
          </div>
        </div>

        <div className="gra-hero__stats">
          <div>
            <strong>03</strong>
            <span>Featured visuals</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>Custom concepts</span>
          </div>
          <div>
            <strong>2K+</strong>
            <span>Creative touches</span>
          </div>
        </div>
      </section>

      <section id="project-list" className="gra-container">
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

export default Graphicdesignpro;