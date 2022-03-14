const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/user');


exports.signup = ((req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            console.log(user);
            if (user.length >= 1) {
                res.status(409).json({
                    error: 'email already exist'
                })
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            message: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'user created'
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })

            }
        })
})
exports.login = ((req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.status(409).json({
                    msg: 'auth failed'
                })
            }
            else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        res.status(409).json({
                            msg: "auth failed"
                        })
                    }
                    else if (result) {
                        const token = jwt.sign({
                            email: user[0].email,
                            id: user[0]._id
                        }, "secret",
                            {
                                expiresIn: '1h'
                            })
                        res.status(200).json({
                            msg: 'auth successful',
                            token: token
                        })
                    }
                    else {
                        res.status(409).json({
                            msg: "auth failed"
                        })
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})
exports.deleteUser = ((req, res, next) => {
    User.remove({ _id: req.params.userId }).exec()
        .then(result => {
            res.status(200).json({
                msg: "User Deleted"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})