const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken')

module.exports = {
    adminLogin: async (req, res) => {
        try {
            let adminData = req.body
            let adminEmail = "admin@gmail.com"
            let adminPassword = "123123"
            const token = jwt.sign({
                adminEmail: "admin@gmail.com"
            },
                process.env.SECRET,
                {
                    expiresIn: "7d"
                }
            )
            if (adminData.email == adminEmail && adminData.password == adminPassword) {
                res.json({ status: true, admin: true ,admin:token})
            } else {
                res.json({ status: false, message: "invalid Email or Password" });
            }
        } catch (error) {
            res.json({ status: "login Catch error" })
            console.log("adminLogin catch error" + error);
        }
    },
    verifyAdminToken:async (req,res)=>{
        try {
            const decodeToken=jwt.verify(req.body.token,process.env.SECRET)
            if(decodeToken.adminEmail==='admin@gmail.com'){
                return res.status(200).json({message:"token valid",token:true})
            }else{
                return res.status(500).json({message:"token not valid",token:false})
            }
        } catch (error) {
            console.log(error);
        }
    },
    getAllUsers: async (req, res) => {
        try {
            let users = await UserModel.find();
            if (users) {
                res.json({ status: true, users })
            } else {
                res.json({ status: false, users: "Users Not Found" })
            }
        } catch (error) {
            res.json({ status: "getAllusers catch error" })
            console.log("getAllusers catch error" + error);
        }
    },

    ////////////////
    deleteUser: async (req, res) => {
        try {
            const deleteUser = await UserModel.deleteOne({ _id: req.params.id });
            res.json({ status: true, message: "user has been deleted" })
        } catch (error) {
            res.json({ status: false, message: "Something Wrong" })
            console.log("deleteUser catch error" + error);
        }
    },

    ////////////////////
    getUserDetails: async (req, res) => {
        try {
            const user = await UserModel.findOne({ _id: req.params.id })
            if (!user) {
                res.json({ status: false, message: "User Not Found" })
            } else {
                if (user.pic) {
                    user.pic = `http://localhost:4000/${user.pic}`
                } else {
                    user.pic = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
                }
                res.json({ status: true, message: "User Found", userData: user })
            }
        } catch (error) {
            res.json({ status: "getUserDetail catch error" })
            console.log("getUserDetail catch error" + error);
        }
    },

    ////////////////////////
    updateUser: async (req, res) => {
        try {
            const { userName, email, id } = req.body;
            
            let user = await UserModel.findOne({ _id: id })
            let enterdEmail = await UserModel.findOne({ email: email })
            if (enterdEmail) {
                if (enterdEmail._id.toString() === id) {
                    const update = await UserModel.findOneAndUpdate({ _id: id },
                        {
                            $set: {
                                name:userName,
                                email
                            }
                        })
                   return res.json({ status: "ok", message: "user updated successfully", userExists: false })
                } else {
                    return   res.json({ status: "error", message: "This email already taken", userExists: true })
                }
            }else{
                const update = await UserModel.findOneAndUpdate({ _id: id },
                    {
                        $set: {
                            name:userName,
                            email
                        }
                    })
                    return  res.json({ status: "ok", message: "user updated successfully", userExists: false })
            }

            if (user == null) {
                const update = await UserModel.findOneAndUpdate({ _id: req.params.id },
                    {
                        $set: {
                            userName,
                            email,
                            phone
                        }
                    })
            } else {
                console.log("user is null here line-77 adminController")
                res.json({ status: "error", message: "user already registered", userExists: true })
            }
        } catch (error) {
            
            console.log("updateUser catch error" + error);
        }
    },

    /////////////////////////
    adminSearchUser: async (req, res) => {
        try {
            const username = req.params.userkey;
            const users = await UserModel.find({
                "$or": [
                    {
                        userName: { $regex: username }
                    },
                    {
                        email: { $regex: username }
                    }
                ]
            })

            res.json({ status: "ok", message: "user found", users })


        } catch (error) {
            res.json({ status: "adminSearchUser catch error" })
            console.log("adminSearchUser catch error" + error);
        }
    }
}