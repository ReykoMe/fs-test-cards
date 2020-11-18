import fetch from "node-fetch"

const url = 'http://localhost:3001/api'
const fs_cards = {
    async getMe () {
        if (document.cookie.includes('ftc_fb_user_token')) {
            return await fetch(`${url}/auth/me`, {
                method: 'GET',
                credentials: 'include',
            }).then(res => res.status===200 && res.json())
        }
    },
   
    async saveCard(userId, boardId, cardData, cardIndex) {
        return await fetch(url + '/cards', {
            method: 'POST',
            body: JSON.stringify({
                userId,
                boardId,
                cardData,
                cardIndex
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res)
    },
    async removeCard(userId, boardId, cardId) {
        return await fetch (url + '/cards', {
            method: 'DELETE',
            body: JSON.stringify({
                userId,
                boardId,
                cardId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res)
    }
}

export {fs_cards}