export const initialState = {
    profileData: null,
    usersCards: [],
    userPosts: [],
    boards: [
        {
            _id: 'main_payload',
            title: 'Typicode',
            cards: []
        }
    ]
}

export const reducer = (state, action) => {

    switch (action.type) {
        // case 'LOAD_USERS_CARDS': {
        //     return {...state, usersCards: action.usersCards}
        // }
        case 'LOAD_USERS_CARDS': {
            return {
                ...state,
                boards: [...state.boards].map(el => {
                    if (el._id === 'main_payload') {
                        el.cards = action.usersCards
                    }
                    return el
                })
            }
        }
        case 'LOAD_USER_POSTS':
            return {...state, userPosts: action.posts}

        case 'CHANGE_CARD_PLACE': {
            const n_state = {...state}
            n_state.boards = [...state.boards].map(board => {
                const n_board = {...board}
                n_board.cards = [...board.cards]
                if (board._id === action.boardId) {
                    n_board.cards.splice(action.cardIndex, 0, action.cardData)
                }
                return n_board
            })
            return n_state
        }
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profileData: action.payload
            }
        }
        case 'SET_USER_BOARDS': {
            return {...state, boards: [...state.boards, ...action.boards]}
        }
        case 'CLEAR_USER_BOARDS': {
            return {...state, boards: [...state.boards].slice(0, 1)}
        }
        case 'REMOVE_CARD': {
            const n_state = {...state}
            n_state.boards = [...state.boards].map(board => {
                const n_board = {...board}
                n_board.cards = [...board.cards]
                if (board._id === action.boardId) {
                    const findCard = board.cards.findIndex(el => el.id === action.cardId)
                    n_board.cards.splice(findCard, 1)
                }
                return n_board
            })
            return n_state
        }
        case 'CREATE_NEW_BOARD': {
            return {
                ...state, boards: [...state.boards, action.board]
            }
        }
        case 'REMOVE_BOARD': {
            const boardIndex = state.boards.findIndex(board => board.id === action.boardId)
            const n_state = {...state}
                  n_state.boards = [...state.boards]
                  n_state.boards.splice(boardIndex, 1)
            return n_state
        }
        default:
            return state
    }
}