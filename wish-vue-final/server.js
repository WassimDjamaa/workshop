const fastify = require('fastify')({ logger: { level: 'error'} });
const mongoose = require('mongoose');
const users = require('./models/users');
const products = require('./models/products');
const bcrypt = require('bcrypt');
const env = require('dotenv');
const jwt = require('jsonwebtoken');

env.config();

const uri = `${process.env.SERVEUR_MONGO_DB}db_wish`;
const port = process.env.PORT || 5000;

fastify.register(require('@fastify/cors'));

fastify.register(require('@fastify/formbody'));

fastify.get('/products', async (request, reply) => {
    try {
        const allProducts = await products.find();
        reply.code(200).send(allProducts);
    } catch (error) {
        reply.code(500).send({
            title: 'server error',
            error: error.message,
        });
    }
});

fastify.post('/signup', async (request, reply) => {
    try {
        const { email, password } = request.body;
        const newUser = new users({
            email,
            password,
            conf_password: password,
        });

        // check if password and conf_password are the same
        if (newUser.password !== newUser.conf_password) {
            reply.code(400).send({
                title: 'error',
                error: 'passwords do not match',
            });
            return;
        }

        // save model to database
        newUser.save();

        reply.code(200).send({
            title: 'signup success',
            message: 'Votre compte a été créé',
        });
    } catch (error) {
        if (error.code === 11000) {
            reply.code(400).send({
                title: 'error',
                error: 'email in use',
            });
        } else {
            reply.code(500).send({
                title: 'server error',
                error: error.message,
            });
        }
    }
});

fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body;

    try {
        const user = await users.findOne({ email });

        if (!user || password !== user.password) {
            reply.code(401).send({
                title: 'Utilisateur non trouvé',
                error: 'Informations d\'identification non valides',
            });
            return;
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

        reply.code(200).send({
            title: 'Authentification réussie',
            token: token,
            userId: user._id,
        });
    } catch (error) {
        reply.code(500).send({
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