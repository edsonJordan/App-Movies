/* import logo from './logo.svg'; */
import './App.css';
import React from 'react';


import {HashRouter, Switch, Route, Routes} from "react-router-dom";
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';
import HomePage from './components/pages/HomePage';
import MoviePage from './components/pages/MoviePage';
import TvPage from './components/pages/TvPage';

export default function App() {
 
  return (
    <>
              <HashRouter >
                            <Routes>
                                <Route path="/" exact  element={<HomePage/>}  />
                                <Route path="about" exact  element={<AboutPage/>}  />
                                <Route path="contact" exact  element={<ContactPage/>}  />
                                <Route path="movie/:idMovie" exact  element={<MoviePage/>}  />
                                <Route path="tv/:idTv" exact  element={<TvPage/>}  />
                                <Route path="*" exact  element={<HomePage/>}  />
                            </Routes> 
              </HashRouter >  
          {/* <div className="All"  >     
            <Navigation />
            <div className="App Container">      
              <SearchMovie/>      
              <Movies/>
            </div>        
            </div>
          <Footer/> */}

          
    </>
    
  );
}
