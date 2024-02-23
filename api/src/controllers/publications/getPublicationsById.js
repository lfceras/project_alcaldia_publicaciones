const publications = require('../../schemas/Publications.js')
const mongoose = require('mongoose')
const { response } = require('../../../utils')
module.exports = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response(res, 400, { msg: 'Invalid Id' })
  }

  let publicationById = await publications.findById(id)
  publicationById
    ? response(res, 200, publicationById)
    : response(res, 404, {msg: 'Publications not found'})
}
