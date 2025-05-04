const express = require('express')
const app = express()
const port = 3001
const fs = require('fs');
const cors = require('cors')
const database = require('./database')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

app.use(cors())
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./index.html', null, function(error, data) {
        if (error) {
            res.writeHead(404);
            res.write('Whoops! File not found!');
        } else {
            res.write(data);
        }
        res.end();
    })
})

app.post('/login', jsonParser, async (req, res) => {
    const member = await database.getMember(req.body)
    res.json(member)
})

app.get('/getMembers', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const members = await database.getMembers()
    res.json(members)
})