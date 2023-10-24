const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({
    description: {
        type: String,
        required: true,
        unique: true
    },
    price: Number,
    img: String,
});

const products = mongoose.model('products', productSchema);

module.exports = products;