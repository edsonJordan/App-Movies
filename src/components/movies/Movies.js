import Grid from './grid/Grid';
import style from './Movies.module.css';
import React, {useState, useEffect, useRef} from "react";
import { useHorizontalScroll } from "./useSideScroll";

export default function Movies() {    

    const [genres, setGenre] = useState([]);

    const [filterGenre, setFilterGenre] = useState([]);


    const [filterMovies, setFilterMovies] = useState([]);
    const [PagefilterMovies, setPageFilterMovies] = useState(1); 

    const IncrePageFilterMovies = (CountVariable) => setPageFilterMovies(CountVariable +1)

    const handleChange  = param  => (e) =>{        
            e.target.parentNode.classList.toggle(style.Listactive);
           if(filterGenre.indexOf(param) === -1){
                 return setFilterGenre([...filterGenre, param]); 
           }else{
                return setFilterGenre(filterGenre.filter(item => item !== param));
           }
    }
  

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
    const Scroll = (e) => {
        let ContentWidth  =e.target.children[1].children[0].clientWidth;
        
        let ScrollLeft =Math.trunc(e.target.scrollLeft);         
            if(ScrollLeft + e.target.clientWidth >= ContentWidth){          
                setUbicaLoad({
                    Y : (e.target.offsetTop+ 130),
                    X : (e.target.children[1].clientWidth - 80)
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
                    case "search":
                        IncrePageFilterMovies(PagefilterMovies);
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
                setSeries((filterMovie)=>[...filterMovie, serie]);                
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
                        vote_average : el.vote_average,
                        media_type : el.media_type ? el.media_type : ''
                        }
                    setTendencias((tendencias)=>[...tendencias, tendencia]);                
                        });
       });
            }, []);

     useEffect(() => {
            fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${ApiKey}&language=en-US`)
            .then(response => response.json())
            .then((data) => {
                //setGenre(data.genres);
                data.genres.forEach((el) => {
                    let genero = {
                        id : el.id,
                        name : el.name,
                        }
                    setGenre((genres)=>[...genres, genero]);                
                        });
            });
     },  []);       


     useEffect(() => {
         const url = "https://api.themoviedb.org/3/discover/movie?api_key=7a09eb9887e18d1890ce1757dc8951b0";
         const link  = filterGenre.length < 1 ? url + "&page=1" : url+"&with_genres="+filterGenre.join(',')+`&page=1`;       
           fetch(link)
            .then(response => response.json())
            .then((data) => {         
                let movies = data.results.map((el) => {
                    let movie = {
                        id : el.id,
                        title : el.title,
                        poster : el.backdrop_path ? IMG_URL + el.backdrop_path : 'https://via.placeholder.com/500x750',
                        overview : el.overview,
                        release_date : el.release_date,
                        vote_average : el.vote_average,
                        media_type : el.media_type ? el.media_type : ''
                        }
                    return movie;
                });
                setFilterMovies(movies);
            setLoading(false);  
            
            });
     }, [filterGenre]);

     useEffect(() => {
        console.log(filterMovies);
     }, [filterMovies]);


        useEffect(() => {
                //${PagefilterMovies}
                const url = "https://api.themoviedb.org/3/discover/movie?api_key=7a09eb9887e18d1890ce1757dc8951b0";
                const link = url + "&page="+PagefilterMovies+"&with_genres="+filterGenre.join(',')+`&page=${PagefilterMovies}`;
                fetch(link)
                    .then(response => response.json())
                    .then((data) => {  
                        let isWhithout = data.results.length === 0 ? true : false;
                        if(isWhithout){
                            return  setLoading(false);
                        }                            
                        let movies = data.results.map((el) => {
                            let movie = {
                                id : el.id,
                                title : el.title,
                                poster : el.backdrop_path ? IMG_URL + el.backdrop_path : 'https://via.placeholder.com/500x750',
                                overview : el.overview,
                                release_date : el.release_date,
                                vote_average : el.vote_average,
                                media_type : el.media_type ? el.media_type : ''
                                }
                            return movie;
                        });
                        setLoading(false);
                        if(PagefilterMovies === 1){
                            return setFilterMovies(movies);
                        }
                        setFilterMovies((filterMovies)=>[...filterMovies, ...movies]);
                    });
        }, [PagefilterMovies]);
                  
        return (
            <>     
                            {Loading && 
                             <div style={{top:UbicaLoad.Y+"px", left:UbicaLoad.X+"px"}} className={style.LoadingContainer}>                                
                                <div className={style.LoadingSpiner}>
                                    
                                </div>
                            </div>  }
                    <div onScroll={Scroll} ref={ useHorizontalScroll()}   att__cont={"search"} className={style.Container__movies}>                  
                        <div className={style.TittleCategory} > 
                            <h2>Búsqueda</h2> 
                            <ul className={style.OptionSearch} >
                                    {
                                        genres?.map((el, i) => {
                                            return (
                                                <li className={style.listGenre} key={i}  >
                                                    <button  onClick={handleChange(el.id)} className={style.linkOption} >{el.name}</button>
                                                </li>
                                            )
                                        })
                                    }                                
                                </ul> 
                        </div>                            
                        {<Grid nameGrid={"search"} DataMovies={filterMovies} />  }                      
                    </div>
                    <div onScroll={Scroll} ref={ useHorizontalScroll()}    att__cont={"movie"} className={style.Container__movies}>                  
                        <div className={style.TittleCategory} >
                        <h2>Populares</h2>
                         </div>
                        <Grid nameGrid={"Movie"} DataMovies={movies} />                        
                    </div>
                    <div onScroll={Scroll} ref={ useHorizontalScroll()} att__cont={"serie"} className={style.Container__movies}>
                        <div className={style.TittleCategory} >
                            <h2>Series</h2>
                        </div>
                        <Grid nameGrid={"Serie"}  DataMovies={series}/>                        
                    </div>
                    <div className={style.Container__movies} ref={ useHorizontalScroll()} >
                        <div className={style.TittleCategory} >
                            <h2>Tendencias</h2>
                        </div>                        
                        <Grid nameGrid={"tenden"}  DataMovies={tendencias}/>                        
                    </div>
            </>
            
        );
}