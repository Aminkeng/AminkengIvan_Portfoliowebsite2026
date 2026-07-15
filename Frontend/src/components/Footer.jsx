import { Link } from 'react-router-dom';

import './Styles/footer.css';
import {FaGithub} from "react-icons/fa"
import { FaFacebook } from "react-icons/fa";
import { LiaInstagram } from "react-icons/lia";
import { PiYoutubeLogoFill } from "react-icons/pi";
// Import Font Awesome CSS (add this to your public/index.html)
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

function Footer() {
    
    return (
        <>
            <footer>
                <div className="footer-section about-section">
                    <h1>ABOUT BIG JONES</h1>
                    <p>As a graphic designer and video editor, you blend visual 
                      artistry with technical precision to craft compelling narratives
                      across mediums. Your eye for composition and color harmonizes with
                      your rhythmic sense of timing and motion, allowing you to seamlessly
                      transition between static designs and dynamic storytelling. Whether 
                      refining brand identities or editing immersive video experiences, your
                      creative versatility and attention to detail transform concepts into 
                      polished visual communications that capture audience attention and convey
                      powerful messages.</p>
                    <h1>SOCIALS</h1>
                    <div className="social-icons">


                        <a 
                          href="https://github.com/AminkengIvan"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="github"
                        >
                       <FaGithub />
                        </a>


                        
                        <a 
                          href="https://www.facebook.com/aminkeng.ivan.3"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon"
                        >
                          <FaFacebook />
                        </a>


                        <a 
                          href="https://www.instagram.com/aminkengivan/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon"
                        >
                          <LiaInstagram />
                        </a>

                        <a 
                          href="https://www.youtube.com/@aminkengivan4703"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon"
                        >
                          <PiYoutubeLogoFill />
                        </a>
                        
                       
                    </div>
                </div>

                <div className="footer-section subscribe-section">
                    <h1>SUBSCRIBE</h1>
                    <p>For more updates, subscribe to our newsletter.</p>
                    <div className="subscribe-form">
                        <input type="email" id="input" placeholder="Enter your email here*"/>
                        <button id="subscribenow">Subscribe Now</button>
                    </div>
                </div>

                <div className="copyright">
                    &copy; 2025 BigJones. All Rights Reserved.
                </div>
            </footer>
        </>
    )
}
export default Footer;