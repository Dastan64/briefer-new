import React from "react";
import Radio from "../Radio/Radio";
import "./NegativeOption.scss";

const NegativeOption = ({ checkedOption, cb, variant }) => {
    console.log("render negative")
    const detectCardStatus = () => {
        if (checkedOption === "Не требуется") {
            return `card--${variant}`;
        } else {
            return "";
        }
    }
    return (
        <div className={`card negative-card ${detectCardStatus()}`}>
            <div className="card__container">
                <Radio variant={variant} value={"Не требуется"}
                       checkedOption={checkedOption}
                       cb={cb}/>
                <div className="card__info">
                    <h3 className="card__title">Не требуется</h3>
                    <p className="card__description">Данная задача не нужна</p>
                </div>
            </div>
        </div>
    );
};

export default NegativeOption;
