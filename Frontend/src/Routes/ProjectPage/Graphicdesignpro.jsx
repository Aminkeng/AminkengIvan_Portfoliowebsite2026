    import React from 'react';
    import {useEffect} from 'react';
    import './Graphicdesignpro.css';

    

    const Graphicdesignpro = () => {
      useEffect(() => {
          window.scrollTo(0, 0); 
        }, []);
      return (
        <div>
          <div className="gra-header">
          <h1>Graphic Design Project</h1>
          <p>A curated showcase of products built from idea to deployment.</p>
          </div>

<div className="gra-container">
       <div className="card-item">
        <li><iframe width="500" height="300" src="https://www.youtube.com/embed/tfDsfbT8AQ0?si=IluE57Qy_r9JYyel" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></li>
        <li><h2>BURGER POSTER</h2><p>In this project, I created a visually captivating poster for the movie "The Batman" using Adobe Photoshop.
           The design features a striking composition that highlights the iconic silhouette of Batman against a moody Gotham City backdrop.
            I utilized a dark color palette with contrasting red accents to evoke a sense of mystery and intensity, capturing the essence of the film's noir aesthetic. 
            The typography is bold and dynamic, complementing the overall design while maintaining readability. This poster effectively conveys the dark and gritty tone of "The Batman,"
             making it an eye-catching promotional piece.</p></li>
      </div>

        <div className="card-item">
         <li><iframe width="500" height="315" src="https://www.youtube.com/embed/iCbChKLm-LA?si=MXOKUce9bViTaYdD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></li>       
         <li><h2>SNACK POSTER</h2><p>In this project, I designed a visually captivating poster for the movie "The Batman" using Adobe Photoshop. The design features a striking composition that highlights the iconic silhouette of Batman against a moody Gotham City backdrop. I utilized a dark color palette with contrasting red accents to evoke a sense of mystery and intensity, capturing the essence of the film's noir aesthetic. The typography is bold and dynamic, complementing the overall design while maintaining readability. This poster effectively conveys the dark and gritty tone of "The Batman," making it an eye-catching promotional piece.</p></li> 
        </div>

        <div className="card-item">
          <li><iframe width="500" height="315" src="https://www.youtube.com/embed/GuAnD8X9Rxc?si=cmxfeMpHiTNkOGby" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></li>
          <li><h2>NAILS POSTER</h2><p>In this project, I created a visually captivating poster for the movie "The Batman" using Adobe Photoshop. The design features a striking composition that highlights the iconic silhouette of Batman against a moody Gotham City backdrop. I utilized a dark color palette with contrasting red accents to evoke a sense of mystery and intensity, capturing the essence of the film's noir aesthetic. The typography is bold and dynamic, complementing the overall design while maintaining readability. This poster effectively conveys the dark and gritty tone of "The Batman," making it an eye-catching promotional piece.</p></li>
        </div>

        </div>
        </div>
      );
    };

  
    export default Graphicdesignpro;