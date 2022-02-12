import Grid from './grid/Grid';
import style from './Movies.module.css';

export default function Movies() {
        return (
            <>
                    <div className={style.Container}>
                        <h2 className={style.TittleCategory} >Populares</h2>
                        <Grid/>                        
                    </div>
                    <div className={style.Container}>
                        <h2 className={style.TittleCategory} >Populares</h2>
                        <Grid/>                        
                    </div>
            </>
            
        );
}