const express = require('express')
const { createUser, userLogin } = require('../Controller/userController')

const Router = express.Router()

Router.post("/user",createUser)

Router.post("/login",userLogin)


module.exports = Router;