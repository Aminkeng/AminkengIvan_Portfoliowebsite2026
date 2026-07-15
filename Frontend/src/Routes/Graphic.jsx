import './graphic.css'
import React from 'react'
import AdobePhotoshop from '../assets/AdobePhotoshop.jpg'
import {useEffect} from 'react';
  

function Graphic() {

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []); 

  return (

    <div className="main-graph">
     
    <h2>Master Graphic Design Basics: Online Courses Available</h2>
     <p>Are you interested in mastering the basics of graphic design?
       Look no further as we delve into the world of online courses that can 
       help you hone your skills and unleash your creativity.</p>
       <div className="pic" >
       <img src={AdobePhotoshop}/>
       </div>
       <p>In today’s digital age, graphic design plays a pivotal role in captivating audiences
         and conveying messages effectively. Whether you aspire to create eye-catching complementary
          cards, design captivating birthday invitations, or produce engaging YouTube videos, having 
          a strong foundation in graphic design basics is essential.
        Online courses have become a popular choice for individuals looking to enhance their skills
         from the comfort of their own homes. These courses offer flexibility, affordability, and the 
         opportunity to learn from industry experts.
        One of the key benefits of online graphic design courses is the ability to learn at your own pace. 
        Whether you are a novice or have some experience in graphic design, there are courses tailored to 
        various skill levels. From understanding color theory and typography to mastering design software,
         these courses cover a wide range of topics to help you build a solid foundation.
        By enrolling in an online course, you can explore different aspects of graphic design, such as
         layout techniques, image manipulation, and branding principles. You will also have the opportunity 
         to work on real-world projects and receive feedback from instructors to help you improve your skills.
        As a freelancer or someone looking to kickstart a career in graphic design, having a strong portfolio
         is crucial. Online courses can provide you with the knowledge and practical skills needed to create 
         a standout portfolio that showcases your creativity and expertise.
        If you are interested in taking your graphic design skills to the next level, consider enrolling in 
        an online course today. With the plethora of options available, you can choose a course that best suits 
        your learning style and goals.
        In conclusion, mastering the basics of graphic design through online courses is a valuable investment 
        in your creative journey. Whether you are looking to enhance your design skills for personal projects or 
        to attract potential clients for freelance work, online courses can provide you with the necessary tools 
        and knowledge to succeed in the competitive world of graphic design.
         </p>
  </div>

  )
}


export default Graphic;