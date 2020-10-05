import React from "react";
import CardItem from "./CardItem";

const CardsBoard = ({cardsList, saveCard, boardTitle}) => {
    if (cardsList.length < 1) {
        return <div>Please wait</div>
    }
    return <>
        <div className="col">{boardTitle}</div>
        {cardsList.map(card => {
            return <CardItem key={card.id} id={card.id} name={card.name} city={card.address.city}
                             username={card.username} website={card.website} onClickHandler={saveCard}
                             cardsList={cardsList}
            />
        })}
    </>
}
export default CardsBoard