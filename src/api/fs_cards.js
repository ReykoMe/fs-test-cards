const url = 'http://localhost:3001/api/'
const fs_cards = {
    async saveCard(card) {
        return await fetch(url + 'addcard', {
            method: 'POST',
            body: JSON.stringify(card),
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => res)
    },
    async loadSavedCards() {
        const fetchedData = await fetch(url + 'savedcards')
        return fetchedData.json()
    },
    async removeCard(cardId) {
        return await fetch(url + 'remove', {
                method: 'DELETE',
                body: JSON.stringify({id: cardId}),
                headers: {
                    "Content-Type": "application/json"
                },
            }
        )
    },
}

export default fs_cards