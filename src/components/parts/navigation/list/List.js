

import style from "./List.module.css";



export default function List(props) {


      return(
          <>
                <ul className={style.navigation__list } key="navigation__list" > 
                                             
                            <li className={style.navigation__item}>
                                <a href={"/"} className={style.navigation__link}>Home</a>
                            </li>
                            <li className={style.navigation__item}>
                                <a href={"/about"} className={style.navigation__link}>About</a>
                            </li>
                            <li className={style.navigation__item}>
                                <a href={"/contact"} className={style.navigation__link}>Contact</a>                            
                            </li>
                </ul>   
                
          </>
      );
    
}
