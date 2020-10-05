const baseUrl = 'https://jsonplaceholder.typicode.com/'
const typicode = {
    async getUsersList () {
        const fetchedData = await fetch(baseUrl + 'users')
        return fetchedData.json()
    },
    getUserPosts(userId) {

    }
}

export default typicode