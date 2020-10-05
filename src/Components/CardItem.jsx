import React from "react";
const CardItem = ({name, city, username, website, onClickHandler, id}) => {
    const clickHandler = () =>{
        onClickHandler({
                           id: id,
                           name: name,
                           username: username,
                           website: website,
                           address: {
                               city: city
                           }
                       })
    }
    return (
        <div className='shadow-sm rounded p-3'>
            <h4><b>{username}</b></h4>
            <div><b>Full name:</b> {name}</div>
            <div><b>City:</b> {city}</div>
            <div><b>Website</b>: {website}</div>
            <div>Remove</div> : <div onClick={clickHandler}>Save</div>
        </div>
    )
}

export default CardItem