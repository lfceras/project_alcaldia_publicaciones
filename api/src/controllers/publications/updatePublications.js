const response = require('../../../utils/response.js')
const publications = require('../../schemas/Publications.js')
const mongoose = require('mongoose')

module.exports = async (req, res) => {
  const { id } = req.params
  const { name, link, responsible, dispatch, publicationType } = req.body
  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id)
    if (!isValidObjectId) {
      return response(res, 400, { msg: 'Invalid Id' })
    }

    let existPublication = await publications.findById(id)
    if (!existPublication) {
      return response(res, 404, { msg: 'Publication not found' })
    }

    if (Object.keys(req.body).length === 0) {
      return response(res, 400, {
        msg: 'La publicacion no puede ser un objeto vacio'
      })
    }

    const updated = await publications.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { name, link, responsible, dispatch, publicationType },
      { new: true }
    )
    response(res, 200, updated)
  } catch (error) {
    console.log(error)
  }
}
