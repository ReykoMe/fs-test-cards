const baseUrl = 'https://jsonplaceholder.typicode.com/'

const typicode = {
    async getUsersList () {
        const fetchedData = await fetch( baseUrl + 'users' )
        return fetchedData.json()
    },
    async getUserPosts ( userId ) {
        let fetchedPosts = await fetch( baseUrl + 'posts?userId=' + userId )
        return fetchedPosts.json()
    }
}

export { typicode }