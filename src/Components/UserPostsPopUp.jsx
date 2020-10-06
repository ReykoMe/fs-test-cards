import React from "react";
import PopUpPostItem from "./UserPostsPopUpItem";

const UserPostsPopUp = ({ onClickHandler, userPosts }) => {
    const closePopupHandler = (e) => {
        if (e.target.id === 'wrapper') {
            onClickHandler()
        }
    }
    return (
        <div id="wrapper" className="col-12 position-fixed vh-100 d-flex flex-wrap flex-direction-column align-content-center" style={{ zIndex: '2000', left: '0', backgroundColor: 'rgba(255,255,255, 0.8)' }} onClick={(e)=> {closePopupHandler(e)}}>
            <div className="col-md-8 mx-auto bg-light rounded p-2" style={{ height: '60%' }}>
                <div className="col-md-12 d-flex justify-content-end mb-2 p-0">
                    <div className="col-md-8">
                        <h3>User Posts</h3>
                    </div>
                    <button className="btn btn-danger rounded" onClick={onClickHandler}>X</button>
                </div>
                <div className="col-md-12 mx-auto bg-light rounded mt-0" style={{ overflowY: 'scroll', height: '90%' }}>
                    {userPosts.map(el => {
                        return <PopUpPostItem key={el.id} postTitle={el.title} postMessage={el.body} />
                    })}
                </div>
            </div>
        </div>
    )
}
export default UserPostsPopUp