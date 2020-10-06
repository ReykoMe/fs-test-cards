import React from "react";

const CardItem = ({name, city, username, website, onClickHandler, id, isSaved, getUserPost, onDblClickHandler}) => {
    const clickHandler = () => {
        onClickHandler({
            id,
            name,
            username,
            website,
            address: {
                city: city
            }
        })
    }
    return (
        <div className='shadow-sm rounded p-3' draggable={true} onDoubleClick={() => {
            onDblClickHandler()
            getUserPost(id)
        }}>
            <h4><b>{username}</b></h4>
            <div><b>Full name:</b> {name}</div>
            <div><b>City:</b> {city}</div>
            <div><b>Website</b>: {website}</div>
            {!isSaved ? <button className='btn btn-success mr-2' onClick={clickHandler}>Save</button> :
                <button className='btn btn-danger' onClick={clickHandler}>Remove</button>}


        </div>
    )
}

export default CardItem