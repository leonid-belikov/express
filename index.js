const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.port || config.get('port');

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => {
            console.log('Database connected ...')
        })
        .catch(e => {
            console.log('Database connect error:', e)
        });
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}...`)
        });
        app.use(bodyParser());
        app.use('/api/category', require('./routes/category.routes'));
    } catch(e) {
        console.log('Ошибка: ', e);
        process.exit(1)
    }
}

start();
