import Grid from './grid/Grid';
import style from './Movies.module.css';
import React, {useState, useEffect} from "react";

export default function Movies() {    
    const [movies, setMovies] = useState([]);
    const [Pagemovies, setPageMovies] = useState(1);

    const [series, setSeries] = useState([]);
    const [tendencias, setTendencias] = useState([]);

    const [visible, setVisible] = useState(false);
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    const URL_API = 'https://api.themoviedb.org/3/movie/popular?api_key=';
    const ApiKey = "7a09eb9887e18d1890ce1757dc8951b0";

    const Scroll = (e) => {
        console.log(e.target.innerWidth);
        console.log(e.target.scrollLeft);
    }
    useEffect(() => {

       /*  if(visible){
            setVisible(true)
         }else{
            setVisible(false)
         } */
        fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${ApiKey}`)
            .then(response => response.json())
            .then((data) => {               
                data.results.forEach((el) => {
                    let tendencia = {
                        id : el.id,
                        title : el.title,
                        poster : el.backdrop_path ? IMG_URL + el.backdrop_path : 'https://via.placeholder.com/500x750',
                        overview : el.overview,
                        release_date : el.release_date,
                        vote_average : el.vote_average,
                        media_type : el.media_type ? el.media_type : ''
                        }
                    setTendencias((tendencias)=>[...tendencias, tendencia]);                
                        });
       });
            
            fetch(`${URL_API+ApiKey}&language=en-US&page=1`)
            .then(response => response.json())
            .then((data) => {
                data.results.forEach((el) => {
                    let movie = {
                        id : el.id,
                        title : el.title,
                        poster : el.backdrop_path ? IMG_URL + el.backdrop_path : 'https://via.placeholder.com/500x750',
                        overview : el.overview,
                        release_date : el.release_date,
                        vote_average : el.vote_average,
                        }
                    setMovies((movies)=>[...movies, movie]);                
                        });
                    });
            fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${ApiKey}&language=en-US&page=1`)
                .then(response => response.json())
                .then((data) => {
                    data.results.forEach((el) => {
                        let serie = {
                            id : el.id,
                            title : el.name,
                            poster : el.backdrop_path ? IMG_URL + el.backdrop_path : 'https://via.placeholder.com/500x750',
                            overview : el.overview,
                            release_date : el.first_air_date,
                            vote_average : el.vote_average,
                            }
                        setSeries((series)=>[...series, serie]);                
                            });
                    });

                  /*   return ()=>{
                        setVisible(false)
                    } */
            }, []);
        return (
            <>     
                    <div onScroll={Scroll} className={style.Container__movies}>                  
                        <h2 className={style.TittleCategory} >Populares </h2>
                        <Grid DataMovies={movies} />                        
                    </div>
                    <div className={style.Container__movies}>
                        <h2 className={style.TittleCategory} >Series</h2>
                        <Grid  DataMovies={series}/>                        
                    </div>
                    <div className={style.Container__movies}>
                        <h2 className={style.TittleCategory} >Tendencias</h2>                        
                        <Grid  DataMovies={tendencias}/>                        
                    </div>
            </>
            
        );
}