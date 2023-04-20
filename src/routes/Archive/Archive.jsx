import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Archive.scss';

//Components
import ArchiveThumb from '../../components/ArchiveThumb/ArchiveThumb';
import IconInput from '../../components/UI/IconInput/IconInput';
import NotFoundThumb from '../../components/NotFoundThumb/NotFoundThumb';

const Archive = () => {
    const briefs = useSelector(state => state.briefsList.briefs);
    const [filteredBriefs, setFilteredBriefs] = useState(briefs);
    const [filters, setFilters] = useState({
        id: '',
        name: '',
        startDate: '',
        category: '',
        sortBy: '',
    })

    const handleChange = ({ target }) => {
        setFilters({
            ...filters,
            [target.name]: target.value,
        });
    }

    const filterBriefs = useCallback(() => {
        let filtered = briefs;
        if (filters.name) {
            filtered = filtered.filter(brief => brief.name.toLowerCase().includes(filters.name));
        }

        if (filters.id) {
            filtered = filtered.filter(brief => brief.id === +filters.id);
        }
        setFilteredBriefs(filtered);
    }, [briefs, filters])

    useEffect(() => {
        if (!filters.name && !filters.id) {
            setFilteredBriefs(briefs);
        } else {
            filterBriefs();
        }
    }, [filters, briefs]);

    return (
        <section className="archive">
            <h2 className="archive__title">Архив</h2>
            <p className="archive__subtitle">Здесь собраны все созданные брифы.</p>
            <div className="archive__filters-panel">
                <IconInput value={filters.id} name={'id'} icon={'https://www.technodom.kz/under/briefer/loupe.svg'}
                           placeholder={'Найти по ID...'}
                           onChange={handleChange}/>
                <IconInput value={filters.name} name={'name'} icon={'https://www.technodom.kz/under/briefer/loupe.svg'}
                           placeholder={'Найти по названию...'} onChange={handleChange}/>
            </div>
            {filteredBriefs.length > 0 && (
                <ul className="archive__list">
                    {filteredBriefs.map(brief => {
                        return <ArchiveThumb data={brief} key={brief.id}/>
                    })}
                </ul>
            )}
            {filteredBriefs.length === 0 &&
                <NotFoundThumb title={'Не удалось найти запрошенный бриф'}
                               subtitle={'Попробуйте изменить настройки поиска'}
                               icon={'https://www.technodom.kz/under/briefer/not-found.svg'}/>}
        </section>
    );
};

export default Archive;
