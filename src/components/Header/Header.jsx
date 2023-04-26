import React from 'react';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <figure className={styles.logoContainer}>
                <img
                    src="https://www.technodom.kz/under/briefer/brief-logo.svg"
                    alt="TechnoBrief | Брифуем с любовью"
                />
            </figure>
        </header>
    );
};

export default Header;
