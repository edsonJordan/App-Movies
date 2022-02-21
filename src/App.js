/* import logo from './logo.svg'; */
import './App.css';
import React from 'react';


import {BrowserRouter,  Link, Routes, Route} from "react-router-dom";
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';
import HomePage from './components/pages/HomePage';
import MoviePage from './components/pages/MoviePage';
import TvPage from './components/pages/TvPage';
import NotFoundPage from './components/pages/NotFoundPage';
import Footer from './components/parts/footer/Footer';
import Navigation from './components/parts/navigation/Navigation';

export default function App() {
 
  return (
    <>      
                <div className="All"  >     
                <Navigation />
                   
                    <BrowserRouter basename="/App-Movies">
                      <Routes>
                        <Route path="/" element={<HomePage/>}  />
                        <Route path="/about" element={<AboutPage/>}  />
                        <Route path="/contact" element={<ContactPage/>}  />
                        <Route path="/movie/:idMovie" element={<MoviePage/>}  />
                        <Route path="/tv/:idTv" element={<TvPage/>}  />
                        <Route path="*" element={<HomePage/>}  />
                      </Routes>
                    </BrowserRouter>   
                           
                </div>
                <Footer/>
    </>
    
  );
}
