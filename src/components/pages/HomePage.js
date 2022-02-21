/* import logo from './logo.svg'; */

import React from 'react';
import Navigation from '../parts/navigation/Navigation';
import SearchMovie from '../search/Search';
import Movies from '../movies/Movies';
import Footer from '../parts/footer/Footer';


export default function HomePage() {
  return (
    <>
         

         <div className="App Container"> 
              <SearchMovie/>      
              <Movies/>
        </div>


           
    </>
    

    /* 
    <div className="All"  >     
            <Navigation />
            <div className="App Container">      
              <SearchMovie/>      
              <Movies/>
              </div>        
          </div>
          <Footer/>
    
    */
  );
}