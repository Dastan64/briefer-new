import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';

import Form from '../Form/Form';
import TaskSection from '../TaskSection/TaskSection';
import Footer from '../Footer/Footer';

import { fetchData } from '../../features/data/dataSlice';

const App = () => {
    const data = useSelector(state => state.data.modifiedData);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        title: '',
        client: '',
        date_start: '',
        date_end: '',
        date_deadline: '',
        orderer: '',
        category: '',
        subcategory: '',
        vendor: '',
        budget: '',
        description: '',
        link: '',
        message: '',
    })

    const updateValue = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const setDate = (dates) => {
        if (dates.length > 1) {
            const date_start = new Date(dates[0]);
            const date_end = new Date(dates[1]);
            setFormData({
                ...formData,
                date_start,
                date_end,
            })
        } else {
            setFormData({
                ...formData,
                date_deadline: new Date(dates[0]),
            })
        }
    }

    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

    return (
        <>
            <main className={styles.main}>
                <Form formData={formData} onChange={updateValue} onClose={setDate}/>
                {data.sections?.length > 0 && data.sections.slice(2).map((section, index) =>
                    <TaskSection
                        section={section}
                        parentIndex={index}
                        key={section.id}/>)}
            </main>
            <Footer formData={formData}/>
        </>
    );
};

export default App;
