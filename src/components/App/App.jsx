import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';

import Form from '../Form/Form';
import TaskSection from '../TaskSection/TaskSection';
import Footer from '../Footer/Footer';

import { fetchData, selectSecondaryFormDataSubsection } from '../../features/data/dataSlice';
import SecondaryForm from '../SecondaryForm/SecondaryForm';

const App = () => {
    const data = useSelector(state => state.data.modifiedData);
    const secondaryFormDataSubsection = useSelector(selectSecondaryFormDataSubsection);
    const dispatch = useDispatch();

    const [requiredFormData, setRequiredFormData] = useState({
        title: '',
        director: '',
        date_start: '',
        date_end: '',
        date_deadline: '',
        orderer: '',
        vendor: '',
        description: '',
    })

    const updateValue = ({ name, value }) => {
        setRequiredFormData({
            ...requiredFormData,
            [name]: value
        })
    }

    const setDate = (dates) => {
        console.log(dates)
        if (dates.length > 1) {
            const date_start = new Date(dates[0]);
            const date_end = new Date(dates[1]);
            setRequiredFormData({
                ...requiredFormData,
                date_start,
                date_end,
            })
        } else {
            setRequiredFormData({
                ...requiredFormData,
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
                <Form requiredFormData={requiredFormData} onChange={updateValue} onClose={setDate}>
                    <SecondaryForm secondaryFormDataSubsection={secondaryFormDataSubsection}/>
                </Form>
                {data.sections?.length > 0 && data.sections.slice(2).map((section, index) =>
                    <TaskSection
                        section={section}
                        parentIndex={index}
                        key={section.id}/>)}
            </main>
            <Footer requiredFormData={requiredFormData}/>
        </>
    );
};

export default App;
