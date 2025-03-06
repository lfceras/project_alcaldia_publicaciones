const publications = require('../../schemas/Publications.js')
const { response } = require('../../../utils')
module.exports = async (req, res) => {
  const { name, responsible, dispatch, publicationType } = req.query
  try {
    const options = {
      sort: { name: 1 }
    }

    let query = {}
    
    if (name) query.name = { $regex: name, $options: 'i' }
    if (dispatch) query.dispatch = { $regex: dispatch, $options: 'i' }
    if (publicationType)
      query.publicationType = { $regex: publicationType, $options: 'i' }
    if (responsible) query.responsible = { $regex: responsible, $options: 'i' }

    let allOfThem = await publications.find(query, null, options)
    if (!allOfThem.length) {
      return response(res, 200, { msg: 'Not found publications' })
    }
    response(res, 200, allOfThem)
  } catch (error) {
    console.log(error)
    
  }
}
