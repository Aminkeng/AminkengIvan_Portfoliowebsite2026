import './about.css';
import ivan from '../assets/ivan.jpg';
import {Link} from 'react-router-dom';

function About(){
    return (
        <>
         <section className="about">
            <div className="about-container">
                <div className="main">
                    <div className="image-wrapper">
                        <img src={ivan} alt="Ivan - Graphic Designer & Video Editor"/>
                        <div className="image-overlay"></div>
                    </div>
                </div>
                <div className="about-text">
                    <div className="text-content">
                        <h1>About Us</h1>
                        <h5>Graphic Designer<span> & Web Developer</span></h5>
                        <div className="divider"></div>
                        <p>We offer graphic designing and web development services at affordable prices in relative to everyone's satisfaction. We are out to provide online courses to every destination world wide. We provide services to every customer in need.</p>
                        <div className="stats">
                            <div className="stat-item">
                                <span className="stat-number">50+</span>
                                <span className="stat-label">Projects</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">20+</span>
                                <span className="stat-label">Clients</span>
                            </div>
                        </div>
                        <Link to="/Contact"><button type="button" className="butn">
                            <span>Let's Talk</span>
                            <div className="button-bg"></div>
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
         </section>
        </>
    )
}
export default About;