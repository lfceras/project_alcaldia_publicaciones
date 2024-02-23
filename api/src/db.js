const {MONGODB_URI} = process.env
const mongoose = require('mongoose')

const conectDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Database connection established')
  } catch (error) {
    console.log('Error connecting')
    console.log(error)
    process.exit(1)
  }
}

module.exports = conectDb
