const response = require('../../../utils/response.js')
const publications = require('../../schemas/Publications.js')
const mongoose = require('mongoose')

module.exports = async (req, res) => {
  const { id } = req.params
  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id)
    if (!isValidObjectId) {
      return response(res, 400, { msg: 'Invalid Id' })
    }
    let existPublication = await publications.findById(id)
    if (!existPublication) {
      return response(res, 404, { msg: 'Publication not found' })
    }

    await publications.deleteOne({ _id: id })
    response(res, 200, 'Publication deleted successfully')
  } catch (error) {
    console.log(error)
  }
}
