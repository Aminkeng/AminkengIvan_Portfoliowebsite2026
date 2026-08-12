
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Home from './Routes/Home';
import Portfolio from './Routes/Portfolio';
import Book from "./Routes/Book";
import Video from "./Routes/Video";
import Graphic from "./Routes/Graphic";
import Graphicdesignpro from "./Routes/ProjectPage/Graphicdesignpro";
import Videopro from './Routes/ProjectPage/Videopro';
import Hero from './components/Hero';
import About from './Routes/About';
import Contact from './Routes/Contact';
import PortfolioDashboard from './Routes/PortfolioDashboard';
import Slider from './components/Slider';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Figure from './components/Figure';
import Login from "./Routes/Login";
import AdminDashboard from './Routes/Admindashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'

function App() {
const [isLogin, setIsLogin] = useState(() => Boolean(localStorage.getItem('authToken')));

useEffect(() => {
  if (localStorage.getItem('authToken')) {
    setIsLogin(true);
  }
}, []);


  return (
    <>
     <Router>
       <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
        <Routes>
          <Route path="/" element={isLogin?<Navigate to={"/home"}/>:<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/book" element={<Book />} />
            <Route path="/video" element={<Video />} />
            <Route path="/videopro" element={<Videopro />} />
            <Route path="/graphic" element={<Graphic />} />
            <Route path="/graphicdesignpro" element={<Graphicdesignpro />} />
            <Route path="/hero" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/slider" element={<Slider />} />
            <Route path="/figure" element={<Figure />} />
             <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
             <Route
               path="/portfoliodashboard"
               element={<ProtectedRoute><PortfolioDashboard /></ProtectedRoute>}
             />
             <Route
               path="/admindashboard"
               element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>}
             />
        </Routes>
        <Footer />
    </Router>
    </>
        
  )
}

export default App;
