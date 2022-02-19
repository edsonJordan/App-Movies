import React, {useState, useEffect} from "react";
import style from './Search.module.css';

export default function SearchMovie(nameGrid) {

    const [dataSearchs, setSearchs] = useState([]);
    const [input, setInput] = useState("");


    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    const ApiKey = "7a09eb9887e18d1890ce1757dc8951b0";
    

    //console.log(data)
    const handleChange = (e) => {
        setInput(e.target.value);
            if(input.length > 0){
                fetch(`https://api.themoviedb.org/3/search/movie?api_key=${ApiKey}&language=en-US&query=${input}&page=1&include_adult=false`)
                .then(response => response.json())
                .then((data) => {
                    setSearchs(data.results);
                });
            }
        }


        const redirection  = (param)  => (e) =>{        
            //redirection vers la page de detail
            window.open(`/App-Movies/movie/${param}`, "_blank");
    }
        return (
            <div className={style.SearchContent}>    
                 
                <h1>¿Que veremos Hoy?</h1>
                <div className={style.Search__input}>
                    <input className={style.Input} type="text" onBlur={e => { const delayBlur=  setInterval(()=>{ setInput(""); clearInterval(delayBlur) }, 500) }}  onChange={handleChange}  placeholder="Encuentra pelicula o serie"  />
                </div>               
                {
                  input.length > 0 &&  <div className={style.SearchResult} >
                    <div className={style.SearchResult__content}>                    
                        <div className={style.SearchResult__content__movies}>
                            {  dataSearchs?.map((el) => {
                                    return (
                                        <div className={style.SearchResult__content__movies__item} key={el.id}  >
                                            <img   onClick={redirection(el.id)} src={el.poster_path ? IMG_URL+ el.poster_path : 'https://via.placeholder.com/500x750'  }   alt=""/>
                                            <div className={style.SearchResult__content__movies__item__text} >
                                                <h2>{el.title}</h2>
                                                <p attr-date= {el.release_date && el.release_date.substr(0,4)}  >{el.vote_average}</p>
                                            </div>
                                        </div>
                                    )
                                })} 
                                
                           </div>    
                       </div>
                   </div> 
                }
            </div>
        );
}