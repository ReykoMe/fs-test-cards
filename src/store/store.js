export const initialState = {
    usersCards: [],
    savedCards: []
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
        default: return state
    }
}