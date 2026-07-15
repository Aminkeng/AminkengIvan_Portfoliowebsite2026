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
               <Link to="/Graphic"> <img id="img" src={AdobePhotoshop}/></Link>
              <figcaption> 
                  <section className="body">
        <div className="body-link">            
                  <Link to="/Graphic" id="link">Master Graphic Design Basics: Online Courses...
                    <br/><span>Are you interested in mastering the basics of graphic design? Look no...</span></Link>                         
           </div>
    </section>                 
              </figcaption>
            </figure>


            <figure className="fig1"> 
              <Link to="/Video"> <img id="img" src={nighttimeeditingworkspacestockcake}/> </Link>
             <figcaption> 

                 <section className="body">
       <div className="body-link">            
        <Link to="/Video" id="link">Level Up Your Video Editing Skills with...
          <br/><span>Do you have a passion for graphic design and video editing? Are you looking to...</span></Link>                    
      </div>
   </section>   

             </figcaption>
           </figure>


           <figure className="fig1"> 
            <Link to=""> <img id="img" src={part3}/></Link>
           <figcaption>

               <section className="body">
     <div className="body-link">            
      <Link to="" id="link">Creative Ideas for Birthday Invitations and...
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