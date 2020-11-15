import React from 'react';
import typeColors from '../../helpers/typeColors'
import './style.sass';
import { useTranslation } from "react-i18next";

function Card({ pokemon }) {
    const [t, i18n] = useTranslation("global");
    return (
        <div className="Card">
            <div className="Card__img">
                <img src={pokemon.sprites.front_default} alt="" />
            </div>
            <div className="Card__name">
                <h2>{pokemon.name}</h2>
            </div>
            <div className="Card__types">
                {
                    pokemon.types.map(type => {
                        return (
                            //Dependiendo el nombre del tipo del pokemon es un color u otro
                            <div className="Card__type" style={{ backgroundColor: typeColors[type.type.name] }}>
                                {type.type.name}
                            </div>
                        )
                    })
                }
            </div>
            <div className="Card__info">
                <h1>{t("card.description")}</h1>
                <div className="Card__data Card__data--weight">
            <p className="title">{t("card.weight")}</p>
                    <p>{pokemon.weight}Kg</p>
                </div>
                <div className="Card__data Card__data--weight">
                    <p className="title">{t("card.height")}</p>
                    <p>{pokemon.height}Mts</p>
                </div>
                <div className="Card__data Card__data--ability">
                    <p className="title">{t("card.ability")}</p>
                    <p>{pokemon.abilities[0].ability.name}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;
