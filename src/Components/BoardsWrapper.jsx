import React, {useState, Children, cloneElement} from 'react'

export const BoardsWrapper = ({children, saveCard}) => {
    const [boardReplaceId, setBoardReplaceId] = useState(null)
    const [cardReplaceIndex, setReplaceCardIndex] = useState(null)
    const [cardData, setCardData] = useState(null)

    const sendCardTo = () => {
            saveCard(boardReplaceId, cardReplaceIndex, cardData)
    }

    return (<>
        <div><h1>Boards</h1></div>
        <div className='col-md-12 d-flex'>
            {Children.map(children, child => cloneElement(child, {
                setBoardReplaceId,
                setReplaceCardIndex,
                sendCardTo, 
                setCardData
                }))}
        </div>
        </>
    )
}