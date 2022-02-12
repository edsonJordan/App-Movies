import style from './Search.module.css';
export default function SearchMovie() {
        return (
            <div className={style.Search}>
                <h1>¿Que veremos Hoy?</h1>
                <div className={style.Search__input}>
                    <input className={style.Input} type="text" placeholder="Search for a movie or TV"  />
                </div>
            </div>
        );
}