import React from 'react';
import './portfolio.css'
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

// Mock images for demonstration
const webdesign = "https://logicsbeyond.com/wp-content/uploads/2023/11/Multan-Web-Design-Agency-Portfolio-by-Logics-Beyond-1024x593.webp";
const graphicdesigntools = "https://www.unite.ai/wp-content/uploads/2023/05/AI-Graphic-design-tools.png.webp";
const webdevelopment = "https://www.simplilearn.com/ice9/free_resources_article_thumb/is_web_development_good_career.jpg";
const videoedit = "https://www.midiaresearch.com/storage/uploads/blog/featured/2244/cover_image-1721122691.jpg";
const mobileappdesign = "https://applandeo.com/app/uploads/2021/03/Application-Development-Life-Cycle-scaled-1.jpg";
const uxdesign = "https://mkryad.com/wp-content/uploads/2023/04/wyf-mobile-app-UI-random-screens.jpeg";

const portfolioItems = [
  {
    id: 1,
    image: webdesign,
    title: "Web Design",
    description: "Creating stunning, user-friendly websites that combine aesthetic appeal with functional design principles.",
    link: "/webdesign"
  },
  {
    id: 2,
    image: graphicdesigntools,
    title: "Graphic Design",
    description: "Crafting visual identities and compelling graphics that communicate your brand message effectively.",
    link: "/graphicdesignpro"
  },
  {
    id: 3,
    image: webdevelopment,
    title: "Web Development",
    description: "Building robust, scalable web applications using modern technologies and best practices."
  },
  {
    id: 4,
    image: videoedit,
    title: "Video Editing",
    description: "Professional video editing services to create engaging content for your audience.",
    link: "/videopro"
  },
  {
    id: 5,
    image: mobileappdesign,
    title: "Application Development",
    description: "Developing cross-platform mobile applications with intuitive user interfaces."
  },
  {
    id: 6,
    image: uxdesign,
    title: "UI/UX Design",
    description: "Designing user experiences that are both beautiful and highly functional."
  }
];

function Portfolio() {
  return (
    <div className="portfolio-container">
      <div className="portfolio-grid">
        {portfolioItems.map((item) => (
          <div key={item.id} className="portfolio-item">
            
            <div className="portfolio-image-wrapper">
              <img src={item.image} alt={item.title} className="portfolio-image" />
            </div>
           
            <div className="portfolio-overlay">
              <h4 className="portfolio-title">{item.title}</h4>
              <p className="portfolio-description">{item.description}</p>
              {item.link ? (
                <Link
                  to={item.link}
                  className="portfolio-link"
                  aria-label={`Visit ${item.title}`}>
                  <FaExternalLinkAlt />
                </Link>
              ) : null}
            
            </div>
          </div>
        ))}
      </div>
      
     
    </div>
  );
}

export default Portfolio;