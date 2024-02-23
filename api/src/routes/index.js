const { Router } = require('express')
const publications = require('../schemas/Publications.js')
const mongoose = require('mongoose')
const publicationsController = require('../controllers/publications')

const router = Router()

router.get('/', publicationsController.getAllPublications)

router.get('/:id', publicationsController.getPublicationsById)

router.post('/', publicationsController.createPublications)

router.patch('/:id', publicationsController.updatePublications)

router.delete('/:id', publicationsController.deletePublications)


module.exports = router
