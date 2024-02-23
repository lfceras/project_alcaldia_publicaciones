const { catchedAsync } = require('../../../utils');

module.exports = {
  getAllPublications: catchedAsync(require('./getAllPublications.js')),
  getPublicationsById: catchedAsync(require('./getPublicationsById.js')),
  createPublications: catchedAsync(require('./createPublications.js')),
  updatePublications: catchedAsync(require('./updatePublications.js')),
  deletePublications: catchedAsync(require('./deletePublications.js'))
}