const {ObjectId} = require('mongodb')
module.exports = {
    createBoard(req, res) {
        const userId = req.body.userId
        const boardId = req.body.boardId
        req.app.db.collection('users').updateOne({
            "_id": ObjectId(userId)
        }, {
            $push: {
                boards: {
                    _id: boardId,
                    title: 'New board',
                    cards: []
                }
            }
        })
        res.status(200).send('New board created')
    },
    removeBoard(req, res) {
        const userId = req.body.userId
        const boardId = req.body.boardId

        req.app.db.collection('users').updateOne({"_id": ObjectId(userId)}, {$pull: {boards: {_id: boardId}}
        })
        return res.status(200).send('Removed')
    }

}