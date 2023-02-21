const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');


router.post('/register', async (req, res) => {
    const { email, password, age } = req.body;
    try {
        const takenEmail = await User.findOne({ email: email });
        if (takenEmail) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        //hashing the user password
        const hashedPassword = await bcrypt.hash(password, 10);
        const dbUser = await User.create({
            email: email.toLowerCase(),
            password: hashedPassword,
            age: age
        });
        // return new user
        res.status(201).json(dbUser);

    } catch (error) {
        console.error(error);
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user && (bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 3600 }
            );
            return res.json({
                message: 'success',
                token: 'Bearer' + token
            });
        } else {
            res.status(400).json({ message: 'Invalid email or password' })
        }
    } catch (error) {
        console.error(error);
    }
})
