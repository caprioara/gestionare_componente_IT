const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: 'https://i.imgur.com/elSLGyw.jpg'
        },
        price: {
            type: Number,
            default: 0
        },
        stock: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

module.exports = Product = model('product', ProductSchema);
