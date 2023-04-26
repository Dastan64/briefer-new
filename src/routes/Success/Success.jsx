import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Success.module.css';
import { Link } from 'react-router-dom';

const Success = () => {
    const id = useSelector(state => state.data.brief_id);

    return (
        <main>
            <div>
                <p className={styles.id}><span className={styles.idOrangePart}>ID брифа:</span> {id}</p>
                <div className={styles.container}>
                    <img width={52} height={52} src="https://www.technodom.kz/under/briefer/success-tick.svg" alt=""/>
                    <div>
                        <span className={styles.title}>Готово!</span>
                        <p className={styles.text}>Ваш бриф принят и когда нибудь, да когда нибудь будет
                            выполнен </p>
                    </div>
                </div>
            </div>
            <div className={styles.navLinks}>
                <Link className={styles.link} to={`/briefs/${id}`}>Посмотреть бриф</Link>
                <Link className={styles.link} to={'/briefs'}>Перейти ко всем брифам</Link>
                <Link className={styles.link} to={'/'}>Создать новый бриф</Link>
            </div>
        </main>
    );
};

export default Success;
