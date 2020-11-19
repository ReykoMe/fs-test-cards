const app_secret = process.env.FB_APP_SECRET
const FB = require('../api/facebook.js')
const {ObjectId} = require('mongodb')

const getFbData = async (req, res) => {
    const code = req.query.code
    const fb_user_data = await FB._getUserToken(app_secret, code)
    const access_token = await fb_user_data.access_token
    res.cookie('ftc_fb_user_token', access_token, {
        maxAge: 90000000
    })
    const fb_user = await FB._getUserData(access_token)
    const user = await req.app.db.collection('users').findOne({fb_id: fb_user.id})
    if (!user) {
        const fb_user_photo = await FB._getUserPhoto(access_token)
        const {id, first_name, last_name} = fb_user
        req.app.db.collection('users').insertOne({
            fb_id: id,
            name: `${first_name} ${last_name}`,
            photo: fb_user_photo.data.url,
            boards: [{
                _id: 1,
                title: 'First board',
                cards: []
            }]
        })
    }

    res.redirect(301, 'http://localhost:3000')
}

const sendUserData = async (req, res) => {
    const {ftc_fb_user_token} = req.cookies
    if (!ftc_fb_user_token) {
        return res.status(304).send('Please, authorise first')
    } else {
        const fb_user_data = await FB._getUserData(ftc_fb_user_token)
        const user = await req.app.db.collection('users').findOne({fb_id: fb_user_data.id})
        return res.send(user)
    }
}

module.exports = {
    getFbData,
    sendUserData
}