const fastify = require('fastify')({ logger: { level: 'error'} });
const fastifyCors = require('@fastify/cors');
const fastifyFormbody = require('@fastify/formbody');

// mongoose
const mongoose = require('mongoose');
const users = require('./models/users');
const products = require('./models/products');

const env = require('dotenv');
const jwt = require('jsonwebtoken');

env.config();

const uri = `${process.env.SERVEUR_MONGO_DB}db_wish`;
const port = process.env.PORT || 5000;

fastify.register(fastifyCors);
fastify.register(fastifyFormbody);


fastify.get('/products', async (req, res) => {
    try {
        const allProducts = await products.find();
        res.code(200).send(allProducts);
    } catch (error) {
        res.code(500).send({
            title: 'server error',
            error: error.message,
        });
    }
});

fastify.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = new users({
            email,
            password,
            conf_password: password,
        });

        // check if password and conf_password are the same
        if (newUser.password !== newUser.conf_password) {
            res.code(400).send({
                title: 'error',
                error: 'passwords do not match',
            });
            return;
        }

        // save model to database
        newUser.save();

        res.code(200).send({
            title: 'signup success',
            message: 'Votre compte a été créé',
        });
    } catch (error) {
        if (error.code === 11000) {
            res.code(400).send({
                title: 'error',
                error: 'email in use',
            });
        } else {
            res.code(500).send({
                title: 'server error',
                error: error.message,
            });
        }
    }
});

fastify.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await users.findOne({ email });

        if (!user || password !== user.password) {
            res.code(401).send({
                title: 'Utilisateur non trouvé',
                error: 'Informations d\'identification non valides',
            });
            return;
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

        res.code(200).send({
            title: 'Authentification réussie',
            token: token,
            userId: user._id,
        });
    } catch (error) {
        res.code(500).send({
            title: 'Erreur du serveur',
            error: 'Une erreur s\'est produite lors de l\'authentification',
        });
    }
});

const start = async () => {
    try {
        await mongoose.connect(uri);
        fastify.listen({ port: port }, (err) => {
            if (err) {
              fastify.log.error(err);
              process.exit(1);
            }
          });    
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();