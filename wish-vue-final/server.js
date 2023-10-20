const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const env = require ('dotenv');
env.config();


const app = express();
const uri = `${process.env.SERVEUR_MONGO_DB}auth-users`;

mongoose.connect(uri)
.then(() => {
    console.log("database connected");
})
.catch(err => {
    console.log("error connecting to database", err);
});

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
const saltRounds = 10; // Le nombre de tours pour le hachage

app.post('/signup', async (req, res) => {
    try {
        const {email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(200).json({
            title: 'signup success'
        });
    } catch (error) {
        if (error.code === 11000) { // Code d'erreur pour violation d'index unique (email en cours d'utilisation)
            return res.status(400).json({
                title: 'error',
                error: 'email in use'
            });
        } else {
            // Gérez d'autres erreurs ici
            return res.status(500).json({
                title: 'server error',
                error: error.message
            });
        }
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                title: 'user not found',
                error: 'invalid credentials'
            });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({
                title: 'login failed',
                error: 'invalid credentials'
            });
        }

        return res.status(200).json({
            title: 'login success'
        });
    } catch (err) {
        return res.status(500).json({
            title: 'server error',
            error: err
        });
    }
});

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`Server running on port ${port}`)
});
