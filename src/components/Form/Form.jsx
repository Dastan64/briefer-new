import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Form.module.css';
import SelectWrapper from '../SelectWrapper/SelectWrapper';

//UI Components
import Input from '../UI/Input/Input';
import Textarea from '../UI/Textarea/Textarea';
import FileInput from '../UI/FileInput/FileInput';
import CustomDatepicker from '../UI/CustomDatepicker/CustomDatepicker';


const Form = ({ formData, onChange, onClose }) => {
    const orderers = useSelector(state => state.data.data.orderers);
    const categories = useSelector(state => state.data.data.categories);
    const subcategories = useSelector(state => state.data.data.subcategories);
    const vendors = useSelector(state => state.data.data.vendors);

    const handleChange = ({ target }) => {
        onChange(target.name, target.value);
    }

    return (
        <section className={styles.brief}>
            <div className={styles.container}>
                <h2 className={styles.title}>Собираем бриф</h2>
                <p className={styles.subtitle}>Будьте внимательны, ведь каждая деталь очень важна для нас.</p>
                <p className={styles.warning}>Обязательные поля помечены звёздочкой!</p>
            </div>

            <form className={styles.form}>
                {/*{info?.tasks?.length > 0 && info?.tasks.map(input => {*/}
                {/*    if (input.taskType === 'input') {*/}
                {/*        return <EnhancedInput name={input.taskTitle} label={input.taskTitle}*/}
                {/*                              isRequired={input.taskMandatory}*/}
                {/*                              placeholder="Напишите сюда что-нибудь..."*/}
                {/*                              key={input.id} id={input.id} subsectionId={info.id}/>*/}
                {/*    } else if (input.taskType === 'date') {*/}
                {/*        return <CustomDatepicker label={input.taskTitle} key={input.id} id={input.id}*/}
                {/*                                 isRequired={input.taskMandatory}*/}
                {/*                                 icon={'https://www.technodom.kz/under/briefer/calendar-black.svg'}*/}
                {/*                                 variant={'outlined'}*/}
                {/*                                 subsectionId={info.id} onClose={handleClose}/>*/}
                {/*    } else if (input.taskType.includes('select')) {*/}
                {/*        return <SelectWrapper slugData={input.taskType} caption={'Выберите из списка'}*/}
                {/*                              label={input.taskTitle} id={input.id} subsectionId={info.id}*/}
                {/*                              isRequired={input.taskMandatory}*/}
                {/*                              key={input.id}/>*/}
                {/*        // return <Select slugData={input.taskType} label={input.taskTitle}*/}
                {/*        //                defaultValue={'Выберите из списка'}*/}
                {/*        //                name={input.taskType} key={input.id} id={input.id} subsectionId={info.id}*/}
                {/*        //                isRequired={input.taskMandatory}/>*/}
                {/*    } else if (input.taskType === 'textarea') {*/}
                {/*        return <EnhancedTextarea name={input.taskTitle} label={input.taskTitle} key={input.id}*/}
                {/*                                 id={input.id} subsectionId={info.id} isRequired={input.taskMandatory}/>*/}
                {/*    }*/}
                {/*    return <FileInput name={input.taskTitle} label={input.taskTitle} key={input.id}*/}
                {/*                      id={input.id} subsectionId={info.id} isRequired={input.taskMandatory}/>*/}
                {/*})}*/}
                <Input name="title" value={formData.title} label={'Название акции'} onChange={handleChange}
                       placeholder={'Напишите сюда что-нибудь'} isRequired/>

                <Input name="client" value={formData.client} label={'Постановщик задачи'} onChange={handleChange}
                       placeholder={'Кто задачу ставит?'} isRequired/>

                <CustomDatepicker label={'Период'} icon={'https://www.technodom.kz/under/briefer/calendar-black.svg'}
                                  variant={'outlined'} onClose={onClose} placeholder={'Период акции'} isRequired/>

                <CustomDatepicker label={'Дедлайн'} icon={'https://www.technodom.kz/under/briefer/calendar-black.svg'}
                                  variant={'outlined'} onClose={onClose} placeholder={'Дедлайн'} mode="single"
                                  isRequired/>
                <SelectWrapper name="orderer" data={orderers} label={'Заказчик промо'} placeholder={'Кто заказчик?'}
                               isRequired onSelect={onChange}/>

                <SelectWrapper name="category" data={categories} label={'Категория товара'}
                               placeholder={'Какая категория?'} onSelect={onChange}/>

                <SelectWrapper name="subcategory" data={subcategories} label={'Подкатегория'}
                               placeholder={'Какая подкатегория'} onSelect={onChange}/>

                <SelectWrapper name="vendor" data={vendors} label={'Бренд'} placeholder={'Что за бренд?'} isRequired
                               onSelect={onChange}/>

                <Input name="budget" value={formData.budget} label={'Бюджет'} onChange={handleChange}
                       placeholder={'Что по деньгам?'}/>

                <Textarea name="description" value={formData.description} label={'Описание задачи'}
                          onChange={handleChange} isRequired/>

                <Input type="url" name="link" value={formData.link} label={'Ссылка на исходники'}
                       onChange={handleChange} placeholder={'Поделитесь, пожалуйста...'}/>

                <Input type="message" name="message" value={formData.message} label={'Ориентировочный посыл'}
                       onChange={handleChange}
                       placeholder={'Посыл есть? А если найду?'}/>
                <FileInput name={'files'} label={'Файлы'}/>
            </form>
        </section>
    );
}

export default Form;
