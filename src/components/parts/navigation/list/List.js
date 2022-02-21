

import style from "./List.module.css";
import { useNavigate   } from "react-router-dom";

export default function List(props) {
   



    const handleClick =  (param) => (e) => {
        
    }
      return(
          <>
                <ul className={style.navigation__list } key="navigation__list" >                                              
                            <li className={style.navigation__item}>
                                <button onClick={handleClick("/App-Movies/")} className={style.navigation__link}>Home</button>
                            </li>
                            <li className={style.navigation__item}>
                                <button href={"/App-Movies/about"} className={style.navigation__link}>About</button>
                            </li>
                            <li className={style.navigation__item}>
                                <button href={"/App-Movies/contact"} className={style.navigation__link}>Contact</button>                            
                            </li>
                </ul>   
                
          </>
      );
    
}
