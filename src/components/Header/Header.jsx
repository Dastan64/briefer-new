import React from 'react';
import './Header.scss';

const Header = () => {
    return (
        <header className="header">
            <figure className="header__logo-container">
                <img
                    src="https://www.technodom.kz/under/briefer/brief-logo.svg"
                    alt="TechnoBrief | Брифуем с любовью"
                />
            </figure>
        </header>
    );
};

export default Header;
