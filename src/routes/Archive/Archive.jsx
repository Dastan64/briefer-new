import React from 'react';
import './Archive.scss';
import ArchiveThumb from '../../components/ArchiveThumb/ArchiveThumb';

const Archive = () => {
    return (
        <section className="archive">
            <h2 className="archive__title">Архив</h2>
            <p className="archive__subtitle">Здесь собраны все созданные брифы.</p>
            <ul className="archive__list">
                <ArchiveThumb/>
            </ul>
        </section>
    );
};

export default Archive;
