// module imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const env = require ('dotenv');
const jwt = require('jsonwebtoken');

// mongoose and models
const mongoose = require('mongoose');
const users = require('./models/users');
const products = require('./models/products');

env.config();

// server setup
const app = express();
const uri = `${process.env.SERVEUR_MONGO_DB}db_wish`;
const port = process.env.PORT || 5000;
const saltRounds = 10;

mongoose.connect(uri)
.then(() => {
    console.log("database connected");
})
.catch(err => {
    console.err("error connecting to database", err);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes

app.get('/products', async (req, res) => {
    try {
        const allProducts = await products.find();
        return res.status(200).json(allProducts);
    } catch (error) {
        return res.status(500).json({
            title: 'server error',
            error: error.message
        });
    }
});

app.post('/signup', async (req, res) => {
    try {
        const {email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new users({
            email,
            password: hashedPassword,
            conf_password: hashedPassword
        });

        await newUser.save();

        return res.status(200).json({
            title: 'signup success',
            message: 'Votre compte a été créé'
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
   
    try {
        // Recherchez l'utilisateur par email
        const user = await users.findOne({ email });

        if (!user.email) {
            return res.status(401).json({
                title: 'Utilisateur non trouvé',
                error: 'Informations d\'identification non valides'
            });
        }

        // Vérifiez le mot de passe
        if (password !== user.password) {
            return res.status(401).json({
                title: 'Mot de passe incorrect',
                error: 'Informations d\'identification non valides'
            });
        }

        // Générez un jeton JWT
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

        return res.status(200).json({
            title: 'Authentification réussie',
            token: token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            title: 'Erreur du serveur',
            error: 'Une erreur s\'est produite lors de l\'authentification'
        });
    }
});

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`Server running on port ${port}`)
});
