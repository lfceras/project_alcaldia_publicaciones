const response = require('../../../utils/response.js')
const publications = require('../../schemas/Publications.js')

module.exports = async (req, res) => {
  const { name, link, responsible, dispatch, publicationType } = req.body
  try {
    if (!name || !link || !responsible || !dispatch || !publicationType) {
      return response(res, 400, { msg: 'Te falta llenar algunos campos' })
    }

    const existingPublication = await publications.findOne({
      name,
      link,
      responsible
    })
    if (existingPublication) {
      return response(res, 409, { msg: 'La publicacion ya ha sido creada' })
    }

    let created = await publications.create({
      dispatch,
      name,
      publicationType,
      link,
      responsible
    })

    response(res, 201, created)
  } catch (error) {
    console.log(error)
  }
}
