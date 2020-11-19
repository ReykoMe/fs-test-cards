const fetch = require('node-fetch')

module.exports = {
    async getUserToken(app_secret, code) {
        return await fetch(`https://graph.facebook.com/v9.0/oauth/access_token?client_id=1254056151632104&redirect_uri=http://localhost:3001/api/auth/facebook&client_secret=${app_secret}&code=${code}`).then(res => res.json())
    },
    async getUserData(token) {
        return await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,first_name,last_name`).then(res => res.json())
    },
    async getUserPhoto(token) {
        return await fetch(`https://graph.facebook.com/371576077250044/picture?type=large&redirect=false&access_token=${token}`).then(img => img.json())
    }
}