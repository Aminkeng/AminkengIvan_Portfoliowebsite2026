import AdobePhotoshop from "../assets/AdobePhotoshop.jpg"
import nighttimeeditingworkspacestockcake from "../assets/nighttimeeditingworkspacestockcake.webp"
import part3 from "../assets/part3.jpg"
import './Styles/figure.css'
import {Link} from 'react-router-dom'
function Figure(){


    return(
        <>
        <div className="figure1">
            <figure className="fig1"> 
               <Link to="/graphic"> <img id="img" src={AdobePhotoshop} alt="Adobe Photoshop graphic design workspace"/></Link>
              <figcaption> 
                  <section className="body">
        <div className="body-link">            
                  <Link to="/graphic" id="link">Master Graphic Design Basics: Online Courses...
                    <br/><span>Are you interested in mastering the basics of graphic design? Look no...</span></Link>                         
           </div>
    </section>                 
              </figcaption>
            </figure>


            <figure className="fig1"> 
              <Link to="/video"> <img id="img" src={nighttimeeditingworkspacestockcake} alt="Nighttime video editing workspace"/> </Link>
             <figcaption> 

                 <section className="body">
       <div className="body-link">            
        <Link to="/video" id="link">Level Up Your Video Editing Skills with...
          <br/><span>Do you have a passion for graphic design and video editing? Are you looking to...</span></Link>                    
      </div>
   </section>   

             </figcaption>
           </figure>


           <figure className="fig1"> 
            <Link to="/book"> <img id="img" src={part3} alt="Creative birthday invitation ideas"/></Link>
           <figcaption>

               <section className="body">
     <div className="body-link">            
      <Link to="/book" id="link">Creative Ideas for Birthday Invitations and...
        <br/><span>Are you planning a birthday party and looking for some creative ideas for your...</span></Link>    
    </div>
 </section>  

           </figcaption>
         </figure>

</div>

        </>
    )
}
export default Figure;