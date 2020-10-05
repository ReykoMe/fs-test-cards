const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const mongo = require('mongodb').MongoClient
const dburl = 'mongodb://localhost:27017'
const dbOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors(corsOptions))
app.use(pino);

mongo.connect(dburl, dbOptions,
    (err, client) => {
        if (err) {
            console.log('Connection error: ', err)
            throw err
        }
        console.log('Connected')
        client.close()
    })

app.get('/api/savedcards', (req, res) => {
    mongo.connect(dburl, dbOptions, (err, client) => {
        const db = client.db('base')
        const collection = db.collection('savedcards')
        collection.find({}).toArray((err, savedcards) => {
            if (err) {
                res.send('Error, when try to saved cards access')
            } else {
                res.json({data: savedcards})
            }
            client.close()
        })
    })
});

app.post('/api/addcard',(req, res) => {
    console.log(req.body)
    const cardData = {
        id: req.body.id,
        name: req.body.name,
        username: req.body.username,
        website: req.body.website,
        address: req.body.address
    }
    mongo.connect(dburl, dbOptions, (err, client) => {
        client.db('base').collection('savedcards').insertOne(cardData, (err) => {
            if (err) {
                res.send({error: 'something wrong'})
            } else {
                res.send('New Card successfully added')
                client.close()
            }
        })
    })
})

app.delete('/api/remove', (req, res) => {
    const cardId = req.body.id
    mongo.connect(dburl, dbOptions, (err, client) => {
        client.db('base').collection('savedcards').deleteOne({id: cardId})
        if (err) {
            res.send('Card not found')
        } else {
            res.send('Card was deleted succesfully')
        }

    })
})

app.listen(3001, () => {
        console.log('Express server is running on http://localhost:3001')
        console.log('Project main is http://localhost:3000')
    }
);