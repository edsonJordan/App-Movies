import React, {useState, useEffect} from "react";
import style from './Grid.module.css';
import reactDom from 'react-dom';


export default function Grid() {
    const [movies, setMovies] = useState([]);
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${REACT_APP_INSTAGRAM_ACCESS_TOKEN}&language=en-US&page=1`)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
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
    }, []);
        return (
            <>
            
            <div className={style.Grid}>                
                <div className={style.GridContent} >                    
                    {
                        movies.map((el) => {
                            return (
                                <div className={style.GridItem}  key={el.id} >
                                    <img className={style.GridImage} src={el.poster} />
                                    <div className={style.GridDetails}>         
                                        <div className={style.GridOptions}>
                                            <button>Comprar</button>
                                            <button>Ver Detalles</button>
                                        </div>                               
                                        <div className={style.MovieDate}>
                                            <h3>{el.title}</h3>
                                            <p>                                                                                            
                                                <div className={style.star} >
                                                </div>
                                                {el.vote_average}
                                            </p>{/*  <p>{el.release_date}</p>*/}
                                        </div>                                        
                                        
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            </>
            
        );
}