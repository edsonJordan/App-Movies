import { useMediaQuery } from "media-query-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../parts/footer/Footer";
import Navigation from "../parts/navigation/Navigation";
import styleGrid from "../../components/movies/grid/Grid.module.css";
import Moment from 'react-moment';

import { useSideScrollActor } from "./useSideScroll";

import style from "./MoviePage.module.css";
const date = new Date();

export default function TvPage() {

    const isDesktop = useMediaQuery({ query: 'min-width: 1024px' });
    const isTablet = useMediaQuery({ query: 'min-width: 767px' });
    const isMobile = useMediaQuery({ query: 'min-width: 320px' });


    const keyApi ="7a09eb9887e18d1890ce1757dc8951b0";
    const [tv, setTvb] = useState([]);
    const [actors, setActors] = useState([]);
    const [trailers, setTrailers] = useState([]);

        let {idTv} = useParams();
        const IMG = "https://image.tmdb.org/t/p/w500";
        


        const redirect =(param)=> (e)=>{
            e.preventDefault();
        //window.location.href = param;
        window.open(`https://www.youtube.com/watch?v=${param}`, '_blank');
        }

        useEffect(() => {            
            fetch(`https://api.themoviedb.org/3/tv/${idTv}?api_key=${keyApi}&language=es-ES`)
            .then(response => response.json())
            .then((data) => {
                setTvb(data);
            });
        }, [setTvb]);


        useEffect(() => {
            fetch(`https://api.themoviedb.org/3/tv/${idTv}/videos?api_key=${keyApi}&language=es-ES`)
            .then(response => response.json())
            .then((data) => {
                setTrailers(data.results);
            });
        }, [setTrailers]);
        //https://api.themoviedb.org/3/tv/85552/videos?api_key=7a09eb9887e18d1890ce1757dc8951b0


        useEffect(() => {      
            //https://api.themoviedb.org/3/tv/1399?api_key=###&append_to_response=credits
      
            fetch(`https://api.themoviedb.org/3/tv/${idTv}/season/1?api_key=${keyApi}&append_to_response=credits`)
            .then(response => response.json())
            .then((data) => {
                setActors(data);
            });
        }, []);

        const styleContainer ={            
            backgroundImage: `url(${IMG}${ isTablet ? tv.backdrop_path : tv.poster_path})`,
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
                                    {tv.name}
                                </h1>
                                <div className={style.DateTittle} >
                                    <p>
                                        {tv.tagline}
                                    </p>
                                    <span>
                                    <Moment format='MMMM Do YYYY'>{tv.release_date}</Moment>                                       
                                    </span>
                                </div>
                                <div className={style.DateSpan} >
                                    <span>
                                        {tv.status}
                                    </span>
                                    <div className={style.CompaniesMovie} >
                                        {
                                            tv.production_companies !== undefined && tv.production_companies.map((company, index) => (
                                                <img  key={index+tv.id} className={style.LogoCompany}  
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
                                                <div key={index+tv.id} className={style.Trailer__item} >
                                                    
                                                        <img onClick={redirect(trailer.key)} className={style.trailer__image} src="https://res.cloudinary.com/sunqupacha/image/upload/v1645474271/portafolio/AppCine/icons/trailer_jndbta.svg" /* src={`https://img.youtube.com/vi/${trailer.key}/0.jpg`} */ alt=""/>
                                                    
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className={style.Trailers} >
                                    <div className={style.Trailer__tittle} >
                                        Temporadas
                                    </div>
                                    <div className={style.Trailer__content} >
                                        {
                                            tv.seasons !== undefined && tv.seasons.map((season, index) => (
                                                <a href={tv.homepage }  key={index+tv.id} className={style.Season__item} >
                                                           <h4>{season.name}</h4>                                        
                                               </a> 
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            
                        </div>    

                                
                                <div ref={ useSideScrollActor()}  className={`${style.Container__movies} Container__grid__actor`}>
                                
                                    
                                    <div className={styleGrid.Grid} >
                                        <div className={styleGrid.GridContent} >
                                            {
                                                actors.credits !== undefined && actors.credits.cast.map((actor, index) => (
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

                        <div className={style.InfoMovie} >
                            <span>
                                {tv.overview}
                            </span>
                        </div>
                    </div>        
          
        </>
        )
        
    
}