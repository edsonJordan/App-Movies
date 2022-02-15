/* import logo from './logo.svg'; */
import './App.css';
import React from 'react';
import Navigation from './components/parts/navigation/Navigation';
import SearchMovie from './components/search/Search';
import Movies from './components/movies/Movies';
import Footer from './components/parts/footer/Footer';

function App() {
  return (
    <>
      <Navigation />
      <div className="App Container">      
        <SearchMovie/>      
        <Movies/>
      </div>
      <Footer/>
    </>
    
  );
}

export default App;
