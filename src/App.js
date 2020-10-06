import React, {useCallback, useEffect, useReducer, useState} from 'react';
import avatarImg from './assets/avatar_1.jpg'
import './App.css';
import typicode from "./api/typicode";
import {initialState, reducer} from "./store/store";
import CardsBoard from "./Components/CardsBoard";
import fs_cards from "./api/fs_cards";
import UserPostsPopUp from "./Components/UserPostsPopUp";

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isPopUpShow, PopUpToggleShow] = useState(true)
    console.log(state)

    const setTypiUsersList = async () => {
        const usersCards = await typicode.getUsersList()
        dispatch({
            type: 'LOAD_USERS_CARDS',
            usersCards
        })
    }
    const loadSavedCards = async () => {
        const savedCards = await fs_cards.loadSavedCards().then(res => res.data)
        dispatch({type: 'LOAD_SAVED_CARDS', savedCards})
    }
    useEffect(() => {
        setTypiUsersList()
    }, [])

    useEffect(() => {
        loadSavedCards()
    }, [])
    const getUserPosts = async (userId) => {
        const posts = await typicode.getUserPosts(userId)
        if (posts.length > 0) {
            PopUpToggleShow(true)
            dispatch({type: 'LOAD_USER_POSTS', posts})

        }
    }
    const clearPosts = () => {
        if (state.userPosts.length > 0) {
            PopUpToggleShow(false)
            dispatch({type: 'LOAD_USER_POSTS', posts: []})

        }

    }
    const saveCard = async (card) => {
        const resp = await fs_cards.saveCard(card)
        resp.status === 201 && dispatch({type: 'SAVE_CARD', card})
    }

    const removeCard = async (card) => {
        const resp = await fs_cards.removeCard(card.id)
        resp.status === 200 && dispatch({type: 'REMOVE_CARD', cardId: card.id})
    }

    const checkUnique = useCallback((obj) => {
        for (let key of state.savedCards) {
            if (key.id === obj.id) return true
        }
    }, [state.savedCards])

    const fillteredArray = useCallback(() => {
        const array = []
        for (let obj of state.usersCards) {
            let result = checkUnique(obj)
            !result && array.push(obj)
        }
        return array
    }, [checkUnique, state.usersCards])

    useEffect(() => {
        if (state.savedCards.length > 0) {
            fillteredArray()
        }
    }, [fillteredArray, state.savedCards.length])

    return (
        <div className="container vh-100">
            {(state.userPosts.length > 0 && isPopUpShow) && <UserPostsPopUp onClickHandler={clearPosts} userPosts={state.userPosts}/>}
            
        
            <div className="row">
                <div className="col">
                    <h2 className='text-center'>Full-stack test</h2>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col-md-2">
                            <img src={avatarImg} alt={avatarImg} className='w-100'/>
                            <div className='text-secondary'>You not loginned, please, login to make changes</div>
                            <button className="btn btn-primary">Social login</button>
                        </div>
                        <div className="col-md-10">
                            <div className="row">
                                <div className="col-6">
                                    <CardsBoard cardsList={fillteredArray()} onClickHandler={saveCard}
                                                boardTitle='Users Cards' isSaved={false} getUserPost={getUserPosts} onDblClickHandler={getUserPosts}/>
                                </div>
                                <div className="col-6">
                                    <CardsBoard cardsList={state.savedCards} onClickHandler={removeCard}
                                                boardTitle='Saved Cards' isSaved={true} getUserPost={getUserPosts} onDblClickHandler={getUserPosts}/>
                                </div>
                            </div>
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
