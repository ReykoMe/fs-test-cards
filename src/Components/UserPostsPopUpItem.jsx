import React from "react";

const PopUpPostItem = ({postTitle, postMessage}) => {
    return (
        <div className='rounded shadow-sm'>
            <h3>{postTitle}</h3>
            <div>{postMessage}</div>
        </div>
    )
}

export default PopUpPostItem
