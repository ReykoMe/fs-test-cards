import React from "react";
import CardItem from "./CardItem";

const CardsBoard = ({cards, isSaved, getUserPost, boardId, setBoardReplaceId, setCardData, sendCardTo, setReplaceCardIndex, removeCard, title, removeBoard}) => {

    const cardIdHandler = (cardId) => {
        removeCard(boardId, cardId)
    }
    return <div className='col v-100' onDragEnter={() => {
        console.log('Board: ', boardId)
        setBoardReplaceId(boardId)
    }}>
        <div className='d-flex justify-content-between'>
            <h4>{title}</h4>
            {boardId !== 'main_payload' &&
            <p className='text-danger' style={{cursor: 'pointer', textDecoration: 'underline'}} onClick={() => removeBoard(boardId)}>Delete</p>}
        </div>

        {cards.length < 1 && <div>Place your first user card here</div>}
        {cards.map((card, index) => {
            return <CardItem key={card.id}
                             card={card}
                             cardsList={cards}
                             isSaved={isSaved}
                             getUserPost={getUserPost}
                             boardId={boardId}
                             sendCardTo={sendCardTo}
                             setCardData={setCardData}
                             setReplaceCardIndex={setReplaceCardIndex}
                             cardIndex={index}
                             removeCard={cardIdHandler}
            />
        })}
    </div>
}
export {CardsBoard}