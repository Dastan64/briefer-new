import React from 'react';
import { useSelector } from 'react-redux';
import './Success.scss';
import { Link } from 'react-router-dom';

const Success = () => {
    const id = useSelector(state => state.data.brief_id);

    return (
        <main className="success">
            <div className="success__thumb thumb">
                <p className="thumb__id"><span className="thumb__id-orange-part">ID брифа:</span> {id}</p>
                <div className="thumb__container">
                    <img width={52} height={52} src="https://www.technodom.kz/under/briefer/success-tick.svg" alt=""/>
                    <div className="thumb__text-container">
                        <span className="thumb__title">Готово!</span>
                        <p className="thumb__text">Ваш бриф принят и когда нибудь, да когда нибудь будет
                            выполнен </p>
                    </div>
                </div>
            </div>
            <div className="success__nav-links">
                <Link className="link" to={`/briefs/${id}`}>Посмотреть бриф</Link>
                <Link className="link" to={'/briefsList'}>Перейти ко всем брифам</Link>
                <Link className="link" to={'/'}>Создать новый бриф</Link>
            </div>
        </main>
    );
};

export default Success;
