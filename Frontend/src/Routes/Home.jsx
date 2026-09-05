import Hero from '../components/Hero'
import Slider from '../components/Slider'
import Figure from '../components/Figure'
import { useEffect } from 'react';
import '../components/Styles/home.css';


export default function Home(){
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []); 

    return(
      <main className="home-page">
        <Hero/>
        <Slider/>
        <Figure/>
      </main>
    )
}