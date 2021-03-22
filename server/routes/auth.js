const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const { errorMessage } = require('../lib/util');
const bcrypt = require('bcryptjs');

router.post(
    '/login',
    [check('username', 'Username is required').notEmpty(), check('password', 'Password is required').notEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });

            if (!user) {
                res.status(400).json(errorMessage('Invalid credentials'));
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json(errorMessage('Invalid credentials'));
            }

            res.json({
                success: true,
                user: {
                    username: user.username
                }
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(errorMessage('There was an unexpected error. Please try again later.'));
        }
    }
);

router.post(
    '/register',
    [check('username', 'Username is required').notEmpty(), check('password', 'Password is required').notEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { username, password } = req.body;

        try {
            let user = await User.findOne({ username });

            if (user) {
                return res.status(400).json(errorMessage('This username already exists'));
            }

            user = new User({
                username,
                password
            });

            user.password = await user.hashPassword(user.password);

            await user.save();

            res.json({
                success: true,
                user: {
                    username
                }
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(errorMessage('There was an unexpected error. Please try again later.'));
        }
    }
);

module.exports = router;
