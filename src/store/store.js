export const initialState = {
    usersCards: [],
    savedCards: [],
    userPosts: []
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_USERS_CARDS': {
            return {...state, usersCards: action.usersCards}
        }
        case 'SAVE_CARD': {
            let n_state = {...state}
                n_state.savedCards = [...state.savedCards]
                n_state.savedCards.push(action.card)
            return n_state
        }
        case 'LOAD_SAVED_CARDS': {
            return {...state, savedCards: action.savedCards}
        }
        case 'REMOVE_CARD':
            return {...state, savedCards: [...state.savedCards.filter(el => el.id !== action.cardId)]}
        case 'LOAD_USER_POSTS':
            return {...state, userPosts: action.posts}
        default: return state
    }
}