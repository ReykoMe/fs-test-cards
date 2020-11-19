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
   
    saveCard(userId, boardId, cardData, cardIndex) {
        return fetch(url + '/cards', {
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
   removeCard(userId, boardId, cardId) {
        return fetch (url + '/cards', {
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
    },
     createBoard (userId, boardId) {
      return fetch(url + '/boards', {
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
      })
    },
    removeBoard (userId, boardId){
        return fetch(url + '/boards', {
            method: 'DELETE',
            body: JSON.stringify({
                userId,
                boardId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

export {fs_cards}