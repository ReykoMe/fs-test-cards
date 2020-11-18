import React from "react";

const CardItem = ({card, getUserPost, setCardData, setReplaceCardIndex, sendCardTo, cardIndex, boardId, removeCard}) => {
    return (
        <div className='shadow-sm rounded p-3' draggable={true} onDoubleClick={() => {
            getUserPost(card.id)
        }}
             onDragStart={() => {
                 setCardData(card)
             }}
             onDragEnter={() => {
                 console.log(`card index is ${cardIndex}`)
                 setReplaceCardIndex(cardIndex)
             }}
             onDragEnd={sendCardTo}
        >
            <h4><b>{card.username}</b></h4>
            <div><b>Full name:</b> {card.name}</div>
            <div><b>Index:</b> {cardIndex}</div>
            <div><b>City:</b> {card.address.city}</div>
            <div><b>Website</b>: {card.website}</div>
            {boardId !== 'main_payload' && <button className='btn btn-danger' onClick={() => {
                removeCard(card.id)
            }}>Remove</button>}
        </div>
    )
}

export default CardItem