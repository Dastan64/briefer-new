import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Archive.module.css';

//Components
import ArchiveThumb from '../../components/ArchiveThumb/ArchiveThumb';
import NotFoundThumb from '../../components/NotFoundThumb/NotFoundThumb';
import SearchPanel from '../../components/SearchPanel/SearchPanel';

import { fetchBriefs } from '../../features/briefsList/briefsListSlice';

const Archive = () => {
    // const categories = useSelector(state => state.data.data.categories);
    const categories = ['CE', 'IT', 'MDA', 'NE', 'SDA', 'TC'];
    const dispatch = useDispatch();

    //Briefs stuff
    const briefs = useSelector(state => state.briefsList.briefs);
    const totalCount = useSelector(state => state.briefsList.totalCount);
    const pageCount = useSelector(state => state.briefsList.pages);
    const [filters, setFilters] = useState({
        value: '',
        date: '',
        category: '',
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
            value: value,
        });
    }

    const handleSelect = ({ name, value }) => {
        setFilters({
            ...filters,
            [name]: value,
        })
    }

    const handleClose = (date) => {
        console.log(new Date(date[0]).toLocaleDateString())
        setFilters({
            ...filters,
            date: new Date(date[0]),
        })
    }

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    useEffect(() => {
        dispatch(fetchBriefs({ currentPage, itemsPerPage }));
    }, [currentPage, dispatch, itemsPerPage])

    return (
        <section>
            <h2 className={styles.title}>Архив</h2>
            <p className={styles.subtitle}>Здесь собраны все созданные брифы.</p>
            <SearchPanel filters={filters} categories={categories} onChange={handleChange} onSelect={handleSelect}
                         onClose={handleClose}/>

            {currentItems.length > 0 && (
                <ol className={styles.list}>
                    {currentItems.map(brief => (<ArchiveThumb data={brief} key={brief.uuid}/>))}
                </ol>
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
