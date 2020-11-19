const express = require('express');
require('dotenv').config()
const cors = require('cors')
const pino = require('express-pino-logger')();
const mongo = require('mongodb').MongoClient
const cookieParser = require('cookie-parser');
const cards = require('./routes/cards')
const auth = require('./routes/auth')
const boards = require('./routes/boards')

const dburl = process.env.DB_URL

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
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(pino);

//Устанавливаем соединение с БД
let db; //резервируем переменную для базы данных
mongo.connect(dburl, dbOptions, (err, client) => {
    if (err) {
        console.log('Connection error: ', err)
        throw err
    }
    console.log('Connected')
    db = client.db('fs_test_cards_test_base')
    app.db = db
})


app.use('/api/cards', cards)
app.use('/api/auth', auth)
app.use('/api/boards', boards)

app.listen(3001, () => {
        console.log('Express server is running on http://localhost:3001')
        console.log('Project main is http://localhost:3000')
    }
);