

import style from "./List.module.css";
const url="";



export default function List(props) {


      return(
          <>
                <ul className={[style.navigation__list  ] } key="navigation__list" > 
                        <li className={style.navigation__item}>
                            <a href={url} className={style.navigation__link}>Home</a>
                        </li>
                        <li className={style.navigation__item}>
                            <a href={url} className={style.navigation__link}>About</a>
                        </li>
                        <li className={style.navigation__item}>
                            <a href={url} className={style.navigation__link}>Contact</a>
                        </li>          
                </ul>   
          </>
      );
    
}
