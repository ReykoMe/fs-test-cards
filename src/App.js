import React, {useEffect, useReducer} from 'react';
import avatarImg from './assets/avatar_1.jpg'
import './App.css';
import typicode from "./api/typicode";
import {initialState, reducer} from "./store/store";
import CardsBoard from "./Components/CardsBoard";
import fs_cards from "./api/fs_cards";

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
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
    useEffect(()=> {
        loadSavedCards()
    }, [])

    const saveCard = (card) => {
        dispatch({type: 'SAVE_CARD', card})
        fs_cards.saveCard(card)
    }

    const removeCard = (cardId) => {
        console.log(cardId)
    }
    return (
        <div className="container vh-100">
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
                                    <CardsBoard cardsList={state.usersCards} saveCard={saveCard} removeCard={removeCard}
                                                boardTitle='Users Card' s/>
                                </div>
                                <div className="col-6">
                                    <CardsBoard cardsList={state.savedCards} saveCard={saveCard} removeCard={removeCard}
                                                boardTitle='Saved Cards'/>
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
