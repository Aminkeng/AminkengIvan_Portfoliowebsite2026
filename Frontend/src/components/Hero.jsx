import Portfolio from "../assets/Portfolio.jpg"
import Mobilehero from "../assets/Mobilehero.jpg"
import './Styles/hero.css'
function Hero(){


    return(
        <>
          <section className="welcome">
        <div className="hero">
            <img 
                 src={Portfolio}
                 className="hero1" 
            />

            <div >
            <img 
                 src={Mobilehero}
                 className="hero2" />
            </div>
      
            <h3>HOW TO BE AN AMAZING DESIGNER</h3>
            <h1>INDUSTRY OF USER <br/>EXPERIENCE DESIGN</h1>
                
          </div>
        </section>
        </>
    )
}
export default Hero;