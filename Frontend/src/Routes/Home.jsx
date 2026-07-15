import Hero from '../components/Hero'
import Slider from '../components/Slider'
import Figure from '../components/Figure'
import { useEffect } from 'react';


export default function Home(){
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []); 

    return(
        <>
        <Hero/>
        <Slider/>
        <Figure/>
        </>
    )
}