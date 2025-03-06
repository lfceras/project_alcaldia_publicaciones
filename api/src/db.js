require('dotenv').config() 
let MONGODB_URI  = process.env.MONGODB_URI
const mongoose = require('mongoose')
const initializeRoles = require("../utils/initializeRoles.js")


const conectDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    await initializeRoles()
    console.log('Database connection established')
  } catch (error) {
    console.log('Error connecting')
    console.log(error)
    process.exit(1)
  }
}

module.exports = conectDb
