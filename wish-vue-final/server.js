const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.post('/register', (req, res) => {
    console.log(req.body);
});

app.post('/login', (req, res) => {
    console.log(req.body);
});

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`Server running on port ${port}`)
});
