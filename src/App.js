import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {initialState, reducer} from "./store/store";
import {CardsBoard} from "./Components/CardsBoard";
import {UserPostsPopUp} from "./Components/UserPostsPopUp";
import {BoardsWrapper} from "./Components/BoardsWrapper";
import {FB_url} from "./api/facebook"
import {typicode} from "./api/typicode";
import {fs_cards} from "./api/fs_cards";
import avatarImg from './assets/avatar_1.jpg'

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isPopUpShow, PopUpToggleShow] = useState(true)
    console.log(state)
    //Initial block
    useEffect(() => {
        //If have data on response - call set User Data
        fs_cards.getMe().then(data => data && setUserData(data))

        //Clear #=_=_ artefacts after facebook login
        window.location.href.includes('#_=_') && window.history.pushState('', document.title, window.location.pathname)
    }, [])

    const setTypiUsersList = useCallback(async () => {
        const usersCards = await typicode.getUsersList()
        dispatch({
            type: 'LOAD_USERS_CARDS',
            usersCards
        })
    }, [dispatch])
    useEffect(() => {
        setTypiUsersList()
    }, [setTypiUsersList])

    const setUserData = (profile) => {
        dispatch({
            type: 'SET_USER_PROFILE',
            payload: {
                _id: profile._id,
                fb_id: profile.fb_id,
                name: profile.name,
                photo: profile.photo
            }
        })
        dispatch({type: 'SET_USER_BOARDS', boards: profile.boards})
    }

    //LOGIN & LOGOUT blocks
    const logIn = () => {
        window.open(FB_url, '_self')
    }

    const logOut = () => {
        document.cookie = "ftc_fb_user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        dispatch({
            type: 'SET_USER_PROFILE',
            payload: null
        })
        dispatch({type: 'CLEAR_USER_BOARDS'})
    }

    //Get post for user in popup
    const getUserPosts = async (userId) => {
        const posts = await typicode.getUserPosts(userId)
        if (posts.length > 0) {
            PopUpToggleShow(true)
            dispatch({type: 'LOAD_USER_POSTS', posts})
        }
    }

    //Clear user posts when popup close
    const clearPosts = () => {
        if (state.userPosts.length > 0) {
            PopUpToggleShow(false)
            dispatch({type: 'LOAD_USER_POSTS', posts: []})
        }
    }

    //Save card to board (drag & drop)
    const saveCard = async (boardId, cardIndex, cardData) => {
        if (boardId === 'main_payload' || !boardId) {
            return
        } else {
            const resp = await fs_cards.saveCard(state.profileData._id, boardId, cardData, cardIndex)
            resp.status === 201 ? changeCardPlace(boardId, cardIndex, cardData) : console.log('Already exist in this board')
        }
    }
    const changeCardPlace = (boardId, cardIndex, cardData) => {
        dispatch({
            type: 'CHANGE_CARD_PLACE',
            boardId,
            cardIndex,
            cardData
        })
    }

    const removeCard = async (boardId, cardId) => {
        const res = await fs_cards.removeCard(state.profileData._id, boardId, cardId)
        res.status === 200 ? dispatch({
            type: 'REMOVE_CARD',
            boardId,
            cardId
        }) : console.log('Card not found')
    }
    const createBoard = async () => {
        const boardId = state.boards.length
        const res = await fs_cards.createBoard(state.profileData._id, boardId)
        res.status === 200 && dispatch({
            type: 'CREATE_NEW_BOARD',
            //FIXME можно отправлять с сервера доску, которая была создана там, дабы избежать дублирования кода на
            //FIXME клиенте и на сервере. Переделать по возможности
            board: {
                _id: boardId,
                title: 'New board',
                cards: []
            }
        })
    }
    const removeBoard = async (boardId) => {
        console.log(boardId)
        const res = await fs_cards.removeBoard(state.profileData._id, boardId)
        res.status === 200 && dispatch({
            type: 'REMOVE_BOARD',
            boardId
        })

    }
    return (
        <div className="container vh-100">
            {(state.userPosts.length > 0 && isPopUpShow) &&
            <UserPostsPopUp onClickHandler={clearPosts} userPosts={state.userPosts}/>}
            <div className="row">
                <div className="col">
                    <h1 className='text-center p-5 font-weight-bold'>{!state.profileData ? 'Guest user' : state.profileData.name}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col-md-3">
                            <img src={!state.profileData ? avatarImg : state.profileData.photo} alt={avatarImg}
                                 className='w-100 d-block mb-2 rounded'/>
                            {!state.profileData &&
                            <div className='text-secondary'>You not loginned, please, login to make changes</div>}
                            <div>
                                {!state.profileData ? <>
                                    <div className='text-secondary'>Login with:</div>
                                    <button className="btn btn-primary font-weight-bold" onClick={logIn}>Facebook
                                    </button>
                                </> : <div className='d-flex justify-content-between'>
                                    <button className='btn btn-danger font-weight-bold mr-1' onClick={logOut}>Logout
                                    </button>
                                    <button className='btn btn-outline-success font-weight-bold' onClick={createBoard}>Add
                                        board
                                    </button>
                                </div>}
                            </div>
                        </div>
                        <div className="col-md-9">
                            <BoardsWrapper changeCardPlace={changeCardPlace} saveCard={saveCard}>
                                {state.boards.map(board => <CardsBoard boardId={board._id}
                                                                       title={board.title}
                                                                       cards={board.cards}
                                                                       saveCard={saveCard}
                                                                       removeCard={removeCard}
                                                                       getUserPost={getUserPosts}
                                                                       key={board._id}
                                                                       removeBoard={removeBoard}
                                />)
                                }
                            </BoardsWrapper>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">Footer section</div>
            </div>
        </div>
    );
}

export default App;
