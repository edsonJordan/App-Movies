import { useMediaQuery } from "media-query-react";
import React, {useState, useEffect, useRef} from "react";
import { useParams } from "react-router-dom";
import Footer from "../parts/footer/Footer";
import Navigation from "../parts/navigation/Navigation";
import Moment from 'react-moment';
import { useSideScrollActor } from "./useSideScroll";



import style from "./MoviePage.module.css";
import styleGrid from "../../components/movies/grid/Grid.module.css";
const date = new Date();


export default function MoviePage() {

    const isDesktop = useMediaQuery({ query: 'min-width: 1024px' });
    const isTablet = useMediaQuery({ query: 'min-width: 767px' });
    const isMobile = useMediaQuery({ query: 'min-width: 320px' });

    // arrow function  scroll
    const elRef = useRef();
    const scroll = () => {
            const el = elRef.current;
            if (el) {
              const onWheel = e => {
                e.preventDefault();   
                if(e.deltaY > 0){
                  el.scrollLeft += 350;
                   }else{
                    el.scrollLeft -= 350;
                   }  

              };
              el.addEventListener("wheel", onWheel);
              return () => el.removeEventListener("wheel", onWheel);
            }
      
    }

  
  


    const [movie, setMovie] = useState([]);
    const [actors, setActors] = useState([]);
    const keyApi ="7a09eb9887e18d1890ce1757dc8951b0";
    let {idMovie} = useParams();
        const IMG = "https://image.tmdb.org/t/p/w500";
    
        //https://api.themoviedb.org/3/tv/{tv_id}?api_key=<<api_key>>&language=en-US
        useEffect(() => {
            fetch(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=${keyApi}&language=es-ES`)
            .then(response => response.json())
            .then((data) => {
                setMovie(data);
            });
        }, [setMovie]);

        useEffect(() => {
            fetch(`https://api.themoviedb.org/3/movie/${idMovie}/casts?api_key=${keyApi}`)
            .then(response => response.json())
            .then((data) => {
                setActors(data.cast);
            });
        }, [actors]);

        const styleContainer ={            
            backgroundImage: `url(${IMG}${ isTablet ? movie.backdrop_path : movie.poster_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "50%"
        }

    return (
        <> 
                    <div style={styleContainer}  className="App Container Full">      
                        <div className={style.ContentFull} >
                            <div className={style.TitleMovie} >
                                <h1 className={style.Htittle} >
                                    {movie.title}
                                </h1>
                                <div className={style.DateTittle} >
                                    <p>
                                        {movie.tagline}
                                    </p>
                                    <span>
                                    <Moment format='MMMM Do YYYY'>{movie.release_date}</Moment>                                       
                                    </span>
                                </div>
                                <div className={style.DateSpan} >
                                    <span>
                                        {movie.status}
                                    </span>
                                    <div className={style.CompaniesMovie} >
                                        {
                                            movie.production_companies !== undefined && movie.production_companies.map((company, index) => (                                                
                                                <img  key={index+movie.id} className={style.LogoCompany}  
                                                src={`${ !!company.logo_path ?IMG + company.logo_path : "https://via.placeholder.com/50x50"   }`} title={company.name}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            
                                <div ref={ useSideScrollActor()}  className={`${style.Container__movies} Container__grid__actor`}>
                                    <div className={styleGrid.Grid} >
                                        <div className={styleGrid.GridContent} >
                                            {
                                                actors.map((actor, index) => (                                                
                                                    <div attr-date={actor.character.split(' ').slice(0,2).join(' ') } className={`${styleGrid.GridItem} GridActor`} 
                                                        key={actor.id} >
                                                        <img className={styleGrid.GridImage} src={`${ actor.profile_path ? IMG + actor.profile_path : "https://via.placeholder.com/500x750" }`} />
                                                        <div className={styleGrid.GridDetails}>              
                                                            <div className={styleGrid.MovieDate}>
                                                                <h3>{actor.name.split(' ').slice(0,2).join(' ') }</h3>                                            
                                                                    <div>                                                                                            
                                                                        <div className={styleGrid.star} >
                                                                        </div>
                                                                        
                                                                    </div>
                                                            </div>                                      
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>  
                                </div>                              
                               

                        }
                        <div className={style.InfoMovie} >                           
                            <span>
                                {movie.overview}
                            </span>
                        </div>
                </div>        
        </>
        )
        
    
}