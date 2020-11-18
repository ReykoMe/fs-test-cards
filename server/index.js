
const express = require( 'express' );
require('dotenv').config()
const cors = require( 'cors' )
const pino = require( 'express-pino-logger' )();
const mongo = require( 'mongodb' ).MongoClient
const fetch = require( 'node-fetch' )
const cookieParser = require( 'cookie-parser' );
const { ObjectId } = require( 'mongodb' );

const dburl = process.env.DB_URL
const app_secret = process.env.FB_APP_SECRET

const dbOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
}
const app = express();
app.use( cors( corsOptions ) )
app.use( express.json() )
app.use( cookieParser() )
app.use( pino );

let db;

//Устанавливаем соединение с БД
mongo.connect( dburl, dbOptions,
    ( err, client ) => {
        if ( err ) {
            console.log( 'Connection error: ', err )
            throw err
        }
        console.log( 'Connected' )
        db = client.db( 'base' )
    } )

//Save card to board
app.post( '/api/cards/', async ( req, res ) => {
    const { userId, boardId, cardData, cardIndex } = req.body
    console.log(userId)
    const user = await db.collection( 'users' ).findOne( {"_id":ObjectId(userId)})
    console.log(user.boards)
    if ( !user.boards.some( board => board._id === boardId ) ) {
        user.boards.push( { _id: boardId, cards: [] } )
    }

    const board = user.boards.find( board => board._id === boardId )
    if ( !board.cards.some( card => cardData.id === card.id ) ) {
        board.cards.splice( cardIndex, 0, cardData )
        db.collection( 'users' ).updateOne( { "_id":ObjectId(userId) }, { $set: { boards: user.boards } } )
        res.status( 201 ).send( 'Card created successfully' )
    } else {
        res.status( 409 ).send( 'Already exists' )
    }
} )

//Remove card from board
app.delete( '/api/cards/', async ( req, res ) => {
    const { userId, boardId, cardId } = req.body
    const user = await db.collection( 'users' ).findOne( { "_id":ObjectId(userId)} )
    user.boards = user.boards.map( board => {
        if ( board._id === boardId ) {
            const cardIndex = board.cards.findIndex( card => card.id === cardId )
            if ( cardIndex !== -1 ) {
                board.cards.splice( cardIndex, 1 )
            } else {
                res.status( 404 ).send( `Card with ID: ${ cardId } in board: ${ boardId } no found` )
            }
        }
        return board
    } )
    db.collection( 'users' ).updateOne( { "_id":ObjectId(userId) }, { $set: { boards: user.boards } } )
    res.status( 200 ).send( `Card with ID: ${ cardId } from board: ${ boardId } was removed successful` )
} )

const fbGetUserData = async ( fb_token ) => {
    return await fetch( `https://graph.facebook.com/me?access_token=${ fb_token }&fields=id,first_name,last_name` ).then( res => res.json() )
}
const fbGetUserToken = async (app_secret, code) => {
    return await fetch( `https://graph.facebook.com/v9.0/oauth/access_token?client_id=1254056151632104&redirect_uri=http://localhost:3001/api/auth/facebook&client_secret=${ app_secret }&code=${ code }` ).then( res => res.json() )
}
//Authorise user in Facebook
app.get( '/api/auth/facebook', async ( req, res ) => {
    const code = req.query.code
    const fb_auth_response = await fbGetUserToken(app_secret, code)
    const fb_token = await fb_auth_response.access_token
    const fb_user = await fbGetUserData(fb_token)
    const user = await db.collection('users').findOne({fb_id: fb_user.id})
    if (!user) {
        const fb_user_photo = await fetch(`https://graph.facebook.com/371576077250044/picture?type=large&redirect=false&access_token=${fb_token}`).then(res => res.json())
        const {id, first_name, last_name} = fb_user
        db.collection('users').insertOne({
            fb_id: id,
            name: `${first_name} ${last_name}`,
            photo: fb_user_photo.data.url,
            boards: [{
                _id: 1,
                title: 'First board',
                cards: []
            }]
        })
        console.log(`User ${fb_user.id} was added to database`)
    }
    res.cookie( 'ftc_fb_user_token', fb_token, {
        maxAge: 90000000
    } )
    res.redirect( 301, 'http://localhost:3000' )
} )

//Get my profile with boards and cards
app.get( '/api/auth/me', async ( req, res ) => {
        const {ftc_fb_user_token} = req.cookies
        if (!ftc_fb_user_token) {
            res.status(304).send('Please, authorise first')
        } else {
            const fb_user_data = await fbGetUserData(ftc_fb_user_token)
            const user = await db.collection('users').findOne({fb_id: fb_user_data.id})
            res.send( user )
        }
} )

app.listen( 3001, () => {
    console.log( 'Express server is running on http://localhost:3001' )
    console.log( 'Project main is http://localhost:3000' )
}
);