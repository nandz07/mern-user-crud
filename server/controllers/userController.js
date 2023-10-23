const express = require('express');
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




module.exports = {
    userSignup: async (req, res) => {
        try {
            let userEmail = req.body.email
            const users = await UserModel.findOne({ email: userEmail })
            if (users) {
                res.json({ status: "userRegistered", error: "user already registered" })
            }
            else {

                const hashPassword = await bcrypt.hash(req.body.password, 10)
                const user = await UserModel.create({
                    name: req.body.userName,
                    email: req.body.email,
                    password: hashPassword,
                    phonenumber: req.body.phoneNumber
                })
                res.json({ status: "ok", _id: user._id, name: user.userName })
            }

        } catch (err) {
            console.log("err", err)
            res.json({ status: 'error', error: "Duplicae email" })
        }
    },

    userLogin: async (req, res) => {

        try {
            const user1 = await UserModel.findOne({ email: req.body.email })

            if (user1) {

                const passwordValid = await bcrypt.compare(req.body.password, user1.password)
                if (passwordValid) {

                    const token = jwt.sign({
                        name: user1.userName,
                        email: user1.email,
                        id: user1._id
                    },
                        process.env.SECRET,
                        {
                            expiresIn: "7d"
                        }
                    )

                    console.log("slodddoged in sucess")
                    res.json({ status: 'ok', message: "Login Sucess", user: token })
                } else {
                    console.log("user details invalid");
                    res.json({ status: 'error', error: 'password 🔑 is incorrect', user: false })

                }
            } else {
                res.json({ status: 'error', error: 'User Not found' })
            }

        } catch (err) {
            res.json({ status: 'error', error: "oops catch error" })
            console.log(err)
        }

    },
    verifyToken: async (req, res) => {
        try {

            const decodedToken = jwt.verify(req.body.token, process.env.SECRET)
            const userCheck = await UserModel.findOne({ email: decodedToken.email });

            if (userCheck.pic) {
                userCheck.pic = `http://localhost:4000/${userCheck.pic}`
            } else {
                userCheck.pic = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
            }

            return res.status(200).json({ message: "token valid", userCheck, token: true });



        } catch (err) {
            res.json({ status: 'error', error: "invalid token", token: false })
        }
    },
    userImageUpdate: async (req, res) => {
        try {
            let Token = req.params.id;
            let token2 = JSON.parse(Token)
            const decodedToken = jwt.verify(token2, process.env.SECRET);
            const user = await UserModel.findOne({ _id: decodedToken.id });
            if (user) {
                const update = await UserModel.updateOne({ _id: decodedToken.id }, {
                    $set: {
                        pic: req.files.image[0].filename
                    }
                })

                const image = `http://localhost:4000/${req.files.image[0].filename}`

                return res.status(200).json({ message: "user found", image });
            }
            else {
                console.log("image Update error")
                return res.json({ status: "error", message: "photo couldn't update" })
            }

        } catch (err) {
            console.log(err, "this one is image catch err")
            res.json({ status: "error", message: "photo catch error" })

        }
    },
}