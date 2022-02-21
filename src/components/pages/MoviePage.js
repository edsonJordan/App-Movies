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

    const redirect =(param)=> (e)=>{
        e.preventDefault();
    //window.location.href = param;
    window.open(`https://www.youtube.com/watch?v=${param}`, '_blank');
    }
  


    const [movie, setMovie] = useState([]);
    const [actors, setActors] = useState([]);
    const [trailers, setTrailers] = useState([]);

    const keyApi ="7a09eb9887e18d1890ce1757dc8951b0";
    let {idMovie} = useParams();
        const IMG = "https://image.tmdb.org/t/p/w500/";

        useEffect(() => {
            fetch(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=${keyApi}&language=es-ES`)
            .then(response => response.json())
            .then((data) => {
                setMovie(data);              
                fetch(`http://api.themoviedb.org/3/movie/${data.id}/videos?api_key=${keyApi}`)
                .then(response => response.json())
                .then((data) => {
                    setTrailers(data.results);
                })

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
                                <div className={style.Trailers} >
                                    <div className={style.Trailer__tittle} >
                                        Trailers
                                    </div>
                                    <div className={style.Trailer__content} >
                                        {
                                            trailers !== undefined && trailers.map((trailer, index) => (
                                                <div key={index+movie.id} className={style.Trailer__item} >
                                                    
                                                        <img onClick={redirect(trailer.key)} className={style.trailer__image} src="https://res.cloudinary.com/sunqupacha/image/upload/v1645474271/portafolio/AppCine/icons/trailer_jndbta.svg" /* src={`https://img.youtube.com/vi/${trailer.key}/0.jpg`} */ alt=""/>
                                                    
                                                </div>
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
                                                    <div attr-date={actor.character.split(' ').slice(0,1).join(' ') } className={`${styleGrid.GridItem} GridActor`} 
                                                        key={actor.id} >
                                                        <img className={styleGrid.GridImage} src={`${ actor.profile_path ? IMG + actor.profile_path : "https://via.placeholder.com/500x750" }`} />
                                                        <div className={styleGrid.GridDetails}>              
                                                            <div className={styleGrid.MovieDate}>
                                                                <h3>{actor.name.split(' ').slice(0,2).join(' ') }</h3>                                            
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