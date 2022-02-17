import Grid from './grid/Grid';
import style from './Movies.module.css';
import React, {useState, useEffect, useRef} from "react";
import { useHorizontalScroll } from "./useSideScroll";

export default function Movies() {    

    const [movies, setMovies] = useState([]);
    const [Pagemovies, setPageMovies] = useState(1);
    const IncrePageMovies = (CountVariable) => setPageMovies(CountVariable + 1);


    const [UbicaLoad, setUbicaLoad] = useState({
        Y : 0,
        X : 0
    });
    const [Loading, setLoading] = useState(false);

    const [series, setSeries] = useState([]);
    const [PageSeries, setPageSeries] = useState(1);
    const IncrePageSeries = (CountVariable) => setPageSeries(CountVariable + 1);


    const [tendencias, setTendencias] = useState([]);
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    const URL_API = 'https://api.themoviedb.org/3/movie/popular?api_key=';
    const ApiKey = "7a09eb9887e18d1890ce1757dc8951b0";


    

    const ScrollYactive = (e) => {
        console.log("Entraste");
        document.body.style.overflow = 'hidden';
        const node =e.target
        window.onscroll = null;
        node.addEventListener("wheel", (evt) => {  
          //   if(evt.deltaY > 0){
           //     node.scrollLeft += 250;
           // }else{
          //      node.scrollLeft -= 250;
           // } 
        });
    }
    const Scroll = (e) => {
        let ContentWidth  =e.target.children[1].children[0].clientWidth;
        
        let ScrollLeft =Math.trunc(e.target.scrollLeft);         
            if(ScrollLeft + e.target.clientWidth >= ContentWidth){          
                setUbicaLoad({
                    Y : (e.target.offsetTop+ 130),
                    X : (e.target.children[1].clientWidth - 50)
                });
                setLoading(true);
                let NodeName = e.target.getAttribute('att__cont');
                switch (NodeName) {
                    case "movie":
                        IncrePageMovies(Pagemovies);
                        break;                
                    case "serie":
                        IncrePageSeries(PageSeries);
                        break;
                    default:
                        break;
                }
                e.target.scrollLeft = ScrollLeft - 200;
            }
        }
   useEffect(() => {
      /*  console.log(Pagemovies); */
            fetch(`${URL_API+ApiKey}&language=en-US&page=${Pagemovies}`)
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
                setLoading(false);                 
            });
           
   }, [Pagemovies]);

   useEffect(() => {
       /* console.log(PageSeries); */
        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${ApiKey}&language=en-US&page=${PageSeries}`)
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
            setLoading(false);   
            });

    }, [PageSeries]);

    useEffect(() => {
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
            }, []);
        return (
            <>     
                     {
                        Loading && 
                            <div style={{top:UbicaLoad.Y+"px", left:UbicaLoad.X+"px"}} className={style.LoadingContainer}>                                
                                <div className={style.LoadingSpiner}>
                                    
                                </div>
                            </div>
                        }
                    <div onScroll={Scroll} ref={ useHorizontalScroll()}  /* onMouseOut={}  */  att__cont={"movie"} className={style.Container__movies}>                  
                        <h2 className={style.TittleCategory} >Populares </h2>
                        <Grid nameGrid={"Movie"} DataMovies={movies} />                        
                    </div>
                    <div onScroll={Scroll} ref={ useHorizontalScroll()} att__cont={"serie"} className={style.Container__movies}>
                        <h2 className={style.TittleCategory} >Series</h2>
                        <Grid nameGrid={"Serie"}  DataMovies={series}/>                        
                    </div>
                    <div className={style.Container__movies} ref={ useHorizontalScroll()} >
                        <h2 className={style.TittleCategory} >Tendencias</h2>                        
                        <Grid nameGrid={"tenden"}  DataMovies={tendencias}/>                        
                    </div>
            </>
            
        );
}