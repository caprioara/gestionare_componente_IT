const express = require('express');
const { check, validationResult } = require('express-validator');
const Product = require('../models/Product');
const router = express.Router();
const { errorMessage } = require('../lib/util');

router.post(
    '/product',
    [
        check('name', 'Name of the product is required').notEmpty(),
        check('category', 'The product must have a category specified').notEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        try {
            const product = new Product({
                name: req.body.name,
                category: req.body.category
            });

            if (req.body?.image) product.image = req?.body?.image;
            if (req.body?.price) product.price = req?.body?.price;
            if (req.body?.stock) product.stock = req?.body?.stock;
            if (req.body?.details) product.details = req?.body?.details;

            await product.save();

            res.json({
                success: true,
                data: product
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(errorMessage('There was an unexpected error. Please try again later.'));
        }
    }
);

router.get('/product/:id', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json(errorMessage('Could not find the specified product'));
        }

        res.json({
            success: true,
            data: product
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(errorMessage('There was an unexpected error. Please try again later.'));
    }
});

router.get('/products', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    try {
        const products = await Product.find();

        if (!products) {
            return res.status(404).json(errorMessage('Could not find any products'));
        }

        res.json({
            success: true,
            data: products
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(errorMessage('There was an unexpected error. Please try again later.'));
    }
});

module.exports = router;
