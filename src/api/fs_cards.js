const url = 'http://localhost:3001/api/'
const fs_cards = {
    async saveCard (card) {
        await fetch(url + 'addcard', {
            method: 'POST',
            body: JSON.stringify(card),
            headers: {
                "Content-Type": "application/json"
            },
    })},
    async loadSavedCards () {
        const fetchedData = await fetch(url + 'savedcards')
        return fetchedData.json()
    },
    async removeCard () {

    },
}

export default fs_cards