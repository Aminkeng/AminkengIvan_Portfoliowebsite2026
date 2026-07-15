import React from 'react'
import './graphic.css'
import nighttimeeditingworkspacestockcake from '../assets/nighttimeeditingworkspacestockcake.webp'
import {useEffect} from 'react';

function Video() {
   useEffect(() => {
      window.scrollTo(0, 0); 
    }, []); 
  
  return (

    <div className="main-graph">
    
    <h2>Level Up Your Video Editing Skills with BigJones.com</h2>
    <p>Do you have a passion for graphic design and video editing?
     Are you looking to take your skills to the next level? Look no further 
     than BigJones.com. This portfolio website offers a wealth of resources 
     and services to help you enhance your abilities in design and video production.</p>
     <div className="pic" >
    <img  src={nighttimeeditingworkspacestockcake}/>
    </div>
    <p>BigJones.com is the brainchild of a talented creator with experience in creating
         beautiful complementary cards, designing eye-catching birthday invitations online,
          and producing engaging YouTube videos. The website's standout feature is its wide
           range of design services and video content, catering to individuals seeking to 
           improve their editing skills.
        Whether you're a beginner looking to learn the basics or a seasoned professional 
        searching for advanced techniques, BigJones.com has something for everyone. The site 
        is designed to attract potential clients for freelance projects and also offers online
         courses in graphic design and video editing.
        By utilizing the resources available on BigJones.com, you can level up your video editing 
        skills and take your projects to new heights. From learning the fundamentals of design to 
        mastering the art of video production, this website is a valuable tool for anyone looking 
        to grow in the creative field.
        So why wait? Visit BigJones.com today and unlock your full potential in graphic design and
         video editing. Start your journey towards creating stunning visuals and captivating videos 
         that will impress clients and audiences alike.</p>
</div>
  )
}

export default Video