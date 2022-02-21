

import style from "./List.module.css";
import { useNavigate   } from "react-router-dom";

export default function List(props) {
   




      return(
          <>
                <ul className={style.navigation__list } key="navigation__list" >                                              
                            <li className={style.navigation__item}>
                                <a href={"https://edsonjordan.github.io/App-Movies"} className={style.navigation__link}>Home</a>
                            </li> 
                </ul>   
                
          </>
      );
    
}
