const {ObjectId} = require('mongodb')

const saveCard = async ( req, res ) => {
    const { userId, boardId, cardData, cardIndex } = req.body
    const user = await req.app.db.collection( 'users' ).findOne( {"_id":ObjectId(userId)})
    const board = user.boards.find( board => board._id === boardId)

    console.log(board._id)
    if ( !board.cards.some( card => cardData.id === card.id ) ) {
        board.cards.splice( cardIndex, 0, cardData )
        req.app.db.collection( 'users' ).updateOne( { "_id":ObjectId(userId) }, { $set: { boards: user.boards } } )
        return res.status( 201 ).send( 'Card created successfully' )
    } else {
        return res.status( 409 ).send( 'Already exists' )
    }
}

const removeCard = async ( req, res ) => {
    const { userId, boardId, cardId } = req.body
    const user = await req.app.db.collection( 'users' ).findOne( { "_id":ObjectId(userId)} )
    user.boards = user.boards.map( board => {
        if ( board._id === boardId ) {
            const cardIndex = board.cards.findIndex( card => card.id === cardId )
            if ( cardIndex !== -1 ) {
                board.cards.splice( cardIndex, 1 )
            } else {
                return res.status( 404 ).send( `Card with ID: ${ cardId } in board: ${ boardId } no found` )
            }
        }
        return board
    } )
    req.app.db.collection( 'users' ).updateOne( { "_id":ObjectId(userId) }, { $set: { boards: user.boards } } )
    return res.status( 200 ).send( `Card with ID: ${ cardId } from board: ${ boardId } was removed successful` )
}

module.exports = {
    saveCard,
    removeCard
}