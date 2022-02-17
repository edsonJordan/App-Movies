

import React, {useState, useEffect} from "react";
import { useMediaQuery } from 'media-query-react';


import List  from "./list/List";
import style from "./Navigation.module.css";


export default function Navigation() {
    const isDesktop = useMediaQuery({ query: 'min-width: 1024px' });
    const isTablet = useMediaQuery({ query: 'min-width: 767px' });
    const [visible, setVisible] = useState(false);


    useEffect(()=>{
        if(visible){
           setVisible(true)
        }else{
           setVisible(false)
        }
        return ()=>{
            setVisible(false)
        }
    }, [visible]);
        
    
    return(
            <>
                <nav className={style.navigation} >
                    <div className={style.logo}>            
                        <svg viewBox="0 0 24 24" className={style.svg__logo}  xmlns="http://www.w3.org/2000/svg" data-name="Layer 1">
                        <path d="M11,6a1,1,0,0,1-1,1A1,1,0,0,0,9,8,1,1,0,0,1,7,8a3,3,0,0,1,3-3A1,1,0,0,1,11,6Zm3,1a1,1,0,0,0,0,2,1,1,0,0,1,1,1,1,1,0,0,0,2,0A3,3,0,0,0,14,7Zm7.923,6.486-1.3,6.5A5.013,5.013,0,0,1,15.721,24H8.279a5.013,5.013,0,0,1-4.9-4.019l-1.3-6.5a4.007,4.007,0,0,1-.05-6.953A4.007,4.007,0,0,1,5.311,3.06a3.456,3.456,0,0,1,3.7-2.016A3.517,3.517,0,0,1,14.66,2a3.479,3.479,0,0,1,2.392,1.115,4.011,4.011,0,0,1,4.921,3.414A4.007,4.007,0,0,1,21.923,13.486ZM8.484,22,8,16.062A2.019,2.019,0,0,0,6,14H4.22l1.117,5.588A3.029,3.029,0,0,0,8.484,22Zm4.972,0L14,15.978A2,2,0,0,0,10,16l.487,6Zm6.324-8H18a2,2,0,0,0-2,2l-.537,6a3.038,3.038,0,0,0,3.2-2.412ZM22,10a2,2,0,0,0-1.335-1.874A1,1,0,0,1,20,7.184a2.012,2.012,0,0,0-2.872-1.972,1,1,0,0,1-1.318-.42A1.5,1.5,0,0,0,14.5,4a1.13,1.13,0,0,1-1.529-.762,1.5,1.5,0,0,0-2.739-.526C9.788,3.43,9.122,3.1,8.5,3A1.5,1.5,0,0,0,7.03,4.2,1,1,0,0,1,5.958,5,2,2,0,0,0,4,7a1.047,1.047,0,0,1-.665,1.126A2,2,0,0,0,4,12H6a3.975,3.975,0,0,1,3,1.382,3.994,3.994,0,0,1,5.994-.007A4.008,4.008,0,0,1,18,12h2A2,2,0,0,0,22,10Z"/>
                        {/* fill="url(#linear-gradient)" */}
                        </svg>
                        <span>
                        Cinemax 
                        </span>
                    </div>     
                     {visible && <List />}
                        <div className={ ` ${visible ? style.btn__navigation__active: style.btn__navigation}` }  onClick={visible ? ()=>setVisible(false): ()=>setVisible(true)}>
                            <div className={style.bar }> </div>
                            <div className={style.bar }> </div>
                            <div className={style.bar }> </div>
                        </div>
                    {
                        isTablet && <List status={false} />
                    }
                </nav>
            </>
        );
}