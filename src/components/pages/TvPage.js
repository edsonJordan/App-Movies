import { useMediaQuery } from "media-query-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../parts/footer/Footer";
import Navigation from "../parts/navigation/Navigation";
import Moment from 'react-moment';



import style from "./MoviePage.module.css";
const date = new Date();

export default function TvPage() {

    const isDesktop = useMediaQuery({ query: 'min-width: 1024px' });
    const isTablet = useMediaQuery({ query: 'min-width: 767px' });
    const isMobile = useMediaQuery({ query: 'min-width: 320px' });
    const [tv, setTvb] = useState([]);
        let {idTv} = useParams();
        const IMG = "https://image.tmdb.org/t/p/w500";
        //https://api.themoviedb.org/3/tv/{tv_id}?api_key=<<api_key>>&language=en-US
        useEffect(() => {            
            fetch(`https://api.themoviedb.org/3/tv/${idTv}?api_key=7a09eb9887e18d1890ce1757dc8951b0&language=es-ES`)
            .then(response => response.json())
            .then((data) => {
                setTvb(data);
            });
        }, [setTvb]);


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
                                    {tv.title}
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