/* import logo from './logo.svg'; */
import './App.css';
import React from 'react';


import {BrowserRouter, Switch, Route, Routes} from "react-router-dom";
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';
import HomePage from './components/pages/HomePage';
import MoviePage from './components/pages/MoviePage';
import TvPage from './components/pages/TvPage';

export default function App() {
 
  return (
    <>
              <BrowserRouter>
                            <Routes>
                                <Route path="App-Movies/" element={<HomePage/>}  />
                                <Route path="App-Movies/about" element={<AboutPage/>}  />
                                <Route path="App-Movies/contact" element={<ContactPage/>}  />
                                <Route path="App-Movies/movie/:idMovie" element={<MoviePage/>}  />
                                <Route path="App-Movies/tv/:idTv" element={<TvPage/>}  />
                                <Route path="*" element={<HomePage/>}  />
                            </Routes> 
              </BrowserRouter>  
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
