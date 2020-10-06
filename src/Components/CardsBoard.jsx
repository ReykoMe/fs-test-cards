import React from "react";
import CardItem from "./CardItem";

const CardsBoard = ({cardsList, boardTitle, onClickHandler, isSaved, getUserPost, onDblClickHandler}) => {
    if (cardsList.length < 1) {
        return <div>Please wait</div>
    }
    return <>
        <div className="col">{boardTitle}</div>
        {cardsList.map(card => {
            return <CardItem key={card.id} id={card.id} name={card.name} city={card.address.city}
                             username={card.username} website={card.website} onClickHandler={onClickHandler}
                             cardsList={cardsList} isSaved={isSaved} getUserPost={getUserPost} onDblClickHandler={onDblClickHandler}
            />
        })}
    </>
}
export default CardsBoard