const mongoose = require('mongoose')

const dispatchs = {
  values: [
    'adulto mayor',
    'agropecuaria',
    'alcladia despacho',
    'comisaria de familia',
    'cultura',
    'familias en accion',
    'gestion social',
    'hacienda',
    'planeacion',
    'salud',
    'secreatria privada',
    'sisben',
    'victimas'
  ]
}

const publicationType = {
  values: [
    'actas de constitucion',
    'acuerdos',
    'codigos',
    'decretos',
    'edictos',
    'estatutos',
    'nomina',
    'petiManati',
    'pinarManati',
    'planaes',
    'politicas',
    'resoluciones',
    'convocatorias'
  ]
}

const publicationsSchema = mongoose.Schema({
  dispatch: {
    type: String,
    enum: dispatchs.values
  },
  name: String,
  publicationType: {
    type: String,
    enum: publicationType.values
  },
  publicationDate: {
    type: Date,
    default: Date.now
  },
  link: String,
  responsible: String
})

publicationsSchema.virtual('formattedPublicationDate').get(function () {
  return this.publicationDate.toISOString().split('T')[0]
})

publicationsSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    // delete ret._id // Eliminar el campo _id
    delete ret.id // Eliminar el campo id
    delete ret.publicationDate // Eliminar el campo publicationDate
  }
})

module.exports = mongoose.model('Publications', publicationsSchema)
