import React, {useState, useEffect} from "react";
import style from './Grid.module.css';
/* import react, {Fragment} from 'react';
import reactDom from 'react-dom'; */
export default function Grid({DataMovies, nameGrid}) {

    

    const ApiKey = "7a09eb9887e18d1890ce1757dc8951b0";
    const [movies, setMovies] = useState([]);
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
        return (
            <>
            <div className={style.Grid}   >            
                <div className={style.GridContent} >                    
                    {                        
                        DataMovies?.map((el) => {
                            return (                                
                                <div className={style.GridItem} attr-date={  el.media_type ?  el.media_type : el.release_date.substr(0,4)} 
                                     key={`nameGrid${el.id}`} >
                                    <img className={style.GridImage} src={el.poster} />
                                    <div className={style.GridDetails}>         
                                        <div className={style.GridOptions}>
                                            <button>Comprar</button>
                                            <button>Ver Detalles</button>
                                        </div>                               
                                        <div className={style.MovieDate}>
                                            <h3>{el.title ? el.title: "No existe titulo"}</h3>                                            
                                                <div>                                                                                            
                                                    <div className={style.star} >
                                                    </div>
                                                    {el.vote_average}
                                                </div>
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