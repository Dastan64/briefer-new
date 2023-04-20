import React from 'react';
import './ArchiveThumb.scss';

const ArchiveThumb = ({ data }) => {
    const { name, id } = data;
    return (
        <li>
            <article className="archbrief">
                <div className="archbrief__container">
                    <div className="archbrief__body">
                        <h3 className="archbrief__title">{name || 'Длинное название какого-то брифа'}</h3>
                        <div className="archbrief__info">
                            <span>Номер: <strong>{id || '100500'}</strong></span>
                            <span>Продолжительность: <strong>12.01.2023 - 13.03.2023</strong></span>
                            <span>Время на выполнение: <strong>16 часов</strong></span>
                        </div>
                    </div>
                    <a className="archbrief__link" href="https://www.google.com">Перейти</a>
                </div>
            </article>
        </li>
    );
};

export default ArchiveThumb;
