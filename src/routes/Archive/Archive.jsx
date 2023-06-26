import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Archive.module.css';

//Components
import ArchiveThumb from '../../components/ArchiveThumb/ArchiveThumb';
import NotFoundThumb from '../../components/NotFoundThumb/NotFoundThumb';
import SearchPanel from '../../components/SearchPanel/SearchPanel';

import { fetchBriefs, getFilteredBriefs } from '../../features/briefsList/briefsListSlice';

const Archive = () => {
    // const categories = useSelector(state => state.data.data.categories);
    const orderers = ['Alexandr'];
    const dispatch = useDispatch();
    const [queryString, setQueryString] = useState('');

    //Briefs stuff
    const briefs = useSelector(state => state.briefsList.briefs);
    const pageCount = useSelector(state => state.briefsList.pages);
    const [filters, setFilters] = useState({
        uuid_or_title: '',
        date_start: '',
        orderer: '',
    })

    //Pagination stuff
    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = briefs.slice(itemOffset, endOffset);

    const handleChange = ({ target: { value } }) => {
        setFilters({
            ...filters,
            uuid_or_title: value,
        });
    }

    const handleSelect = ({ name, value }) => {
        setFilters({
            ...filters,
            [name]: value,
        })
    }

    const handleClose = (date) => {
        setFilters({
            ...filters,
            date_start: new Date(date[0]).toISOString().replace('Z', ''),
        })
    }

    const handleSendSearchRequest = () => {
        if (queryString) {
            dispatch(getFilteredBriefs({ queryString, currentPage, itemsPerPage }))
        }
    }

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    useEffect(() => {
        const queryParams = Object.entries(filters).filter(([, value]) => value).map(([key, value]) => {
            if (key !== 'date_start' && !Date.parse(value)) {
                value = encodeURIComponent(value);
            }
            return `${key}=${value}`;
        }).join('&');

        const queryString = queryParams.length > 0 ? `?${queryParams}` : '';
        if (queryString) {
            setQueryString(queryString);
        }
    }, [filters])

    useEffect(() => {
        dispatch(fetchBriefs({ currentPage, itemsPerPage }));
    }, [currentPage, dispatch, itemsPerPage])

    return (
        <section>
            <h2 className={styles.title}>Архив</h2>
            <p className={styles.subtitle}>Здесь собраны все созданные брифы.</p>
            <SearchPanel filters={filters} orderers={orderers} onChange={handleChange} onSelect={handleSelect}
                         onClose={handleClose} onSearch={handleSendSearchRequest}/>

            {currentItems.length > 0 && (
                <ul className={styles.list}>
                    {currentItems.map(brief => (<ArchiveThumb data={brief} key={brief.uuid}/>))}
                </ul>
            )}

            {briefs.length === 0 && <NotFoundThumb title={'Не удалось найти запрошенный бриф'}
                                                   subtitle={'Попробуйте изменить настройки поиска'}
                                                   icon={'https://www.technodom.kz/under/briefer/not-found.svg'}/>}
            <ReactPaginate
                activeLinkClassName={styles.active}
                containerClassName={styles.pagination}
                breakLabel="..."
                nextLabel="След. стр"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="Пред. стр"
                renderOnZeroPageCount={null}
            />
        </section>
    );
};

export default Archive;
