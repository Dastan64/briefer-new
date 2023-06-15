import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Form.module.css';
import SelectWrapper from '../SelectWrapper/SelectWrapper';

//UI Components
import Input from '../UI/Input/Input';
import Textarea from '../UI/Textarea/Textarea';
import FileInput from '../UI/FileInput/FileInput';
import CustomDatepicker from '../UI/CustomDatepicker/CustomDatepicker';


const Form = ({ requiredFormData, onChange, onClose }) => {
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
                <Input name="title" value={requiredFormData.title} label={'Название акции'} onChange={handleChange}
                       placeholder={'Напишите сюда что-нибудь'} isRequired/>

                <Input name="director" value={requiredFormData.director} label={'Постановщик задачи'}
                       onChange={handleChange}
                       placeholder={'Кто задачу ставит?'} isRequired/>

                <CustomDatepicker label={'Период'} icon={'https://www.technodom.kz/under/briefer/calendar-black.svg'}
                                  variant={'outlined'} onClose={onClose} placeholder={'Период акции'} isRequired/>

                <CustomDatepicker label={'Дедлайн'} icon={'https://www.technodom.kz/under/briefer/calendar-black.svg'}
                                  variant={'outlined'} onClose={onClose} placeholder={'Дедлайн'} mode="single"
                                  isRequired/>
                <SelectWrapper name="orderer" data={orderers} label={'Заказчик промо'} placeholder={'Кто заказчик?'}
                               isRequired onSelect={onChange}/>

                {/*<SelectWrapper name="category" data={categories} label={'Категория товара'}*/}
                {/*               placeholder={'Какая категория?'} onSelect={onChange}/>*/}

                {/*<SelectWrapper name="subcategory" data={subcategories} label={'Подкатегория'}*/}
                {/*               placeholder={'Какая подкатегория'} onSelect={onChange}/>*/}

                <SelectWrapper name="vendor" data={vendors} label={'Бренд'} placeholder={'Что за бренд?'} isRequired
                               onSelect={onChange}/>

                {/*<Input name="budget" value={requiredFormData.budget} label={'Бюджет'} onChange={handleChange}*/}
                {/*       placeholder={'Что по деньгам?'}/>*/}

                <Textarea name="description" value={requiredFormData.description} label={'Описание задачи'}
                          onChange={handleChange} isRequired/>

                {/*<Input type="url" name="link" value={requiredFormData.link} label={'Ссылка на исходники'}*/}
                {/*       onChange={handleChange} placeholder={'Поделитесь, пожалуйста...'}/>*/}
                
                {/*<Input type="message" name="message" value={requiredFormData.message} label={'Ориентировочный посыл'}*/}
                {/*       onChange={handleChange}*/}
                {/*       placeholder={'Посыл есть? А если найду?'}/>*/}
                {/*<FileInput name={'files'} label={'Файлы'}/>*/}
            </form>
        </section>
    );
}

export default Form;
