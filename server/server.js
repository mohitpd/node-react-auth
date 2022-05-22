const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/full-mern-stack');

app.post('/api/register', async (req, res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
            phone: req.body.phone,
            plan: 'Silver',
        });
        res.json({status: 'ok'});
    } catch (err) {
        res.json({status: 'error', error: 'Duplicate email'});
    }
});

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    });

    if (!user) {
        return res.json({status: 'error', error: 'User Does Not Exist'});
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            'secret123'
        );

        return res.json({status: 'ok', user: token});
    } else {
        return res.json({status: 'error', error: 'Error Occured while Logging in.'});
    }
});

app.get('/api/plan', async (req, res) => {
    const token = req.headers['x-access-token'];

    try {
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        const user = await User.findOne({email: email});

        return res.json({status: 'ok', plan: user.plan});
    } catch (error) {
        console.log(error);
        res.json({status: 'error', error: 'invalid token'});
    }
});

app.post('/api/plan', async (req, res) => {
    const token = req.headers['x-access-token'];

    try {
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        const user = await User.updateOne({email: email}, {$set: {plan: req.body.plan}});
        console.log(user);
        return res.json({status: 'ok'});
    } catch (error) {
        console.log(error);
        res.json({status: 'error', error: 'invalid token'});
    }
});

app.listen(3001, () => {
    console.log('Server started on 3001');
});
