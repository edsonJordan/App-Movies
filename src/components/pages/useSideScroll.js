import { useRef, useEffect } from "react";
export function useSideScrollActor() {
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (!el) {
      return;
    }
    if (el) {
      const onWheel = e => {
        /* if (e.deltaY == 0) return;   */  
        e.preventDefault();   
        if(e.deltaY > 0){
          el.scrollLeft += 350;
           }else{
            el.scrollLeft -= 350;
           }  
         /* el.scrollTo({
          left: el.scrollLeft + e.deltaY,          
          behavior: "smooth"
          });   */   
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}