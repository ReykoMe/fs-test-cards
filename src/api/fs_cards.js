import fetch from "node-fetch"


const url = 'http://localhost:3001/api'
const fsCards = {
    async getMe () {
        if ( document.cookie.includes( 'ftc_fb_user_token' ) ) {
            const res = await fetch( `${ url }/auth/me`, {
                method: 'GET',
                credentials: 'include',
            } )
            if ( res.status === 200 ) {
                return await res.json()
            }
        }
    },
    
    async saveCard ( userId, boardId, cardData, cardIndex ) {
        return await fetch( url + '/cards', {
            method: 'POST',
            body: JSON.stringify( {
                userId,
                boardId,
                cardData,
                cardIndex
            } ),
            headers: {
                "Content-Type": "application/json"
            }
        } )
    },

    async removeCard ( userId, boardId, cardId ) {
        return await fetch( url + '/cards', {
            method: 'DELETE',
            body: JSON.stringify( {
                userId,
                boardId,
                cardId
            } ),
            headers: {
                "Content-Type": "application/json"
            }
        } )
        
    },

    async createBoard ( userId, boardId ) {
        return await fetch( url + '/boards', {
            method: 'POST',
            body: JSON.stringify(
                {
                    userId,
                    boardId
                }
            ),
            headers: {
                "Content-Type": "application/json"
            }
        } )
    },
    removeBoard ( userId, boardId ) {
        return fetch( url + '/boards', {
            method: 'DELETE',
            body: JSON.stringify( {
                userId,
                boardId
            } ),
            headers: {
                "Content-Type": "application/json"
            }
        } )
    }
}

export { fsCards }