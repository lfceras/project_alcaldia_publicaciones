const session = require('supertest-session')
const app = require('../../src/app.js')
const mongoose = require('mongoose')
const Publications = require('../../src/schemas/Publications.js')

const newPublication = {
  name: `tomaso${Date.now()}`,
  link: 'how i make this possibles',
  responsible: 'kratos2589',
  dispatch: 'agropecuaria',
  publicationType: 'estatutos'
}

const updatePublication = {
  name: `papayasss${Date.now()}`,
  link: 'how i make this possibles',
  responsible: 'kratos2589',
  dispatch: 'agropecuaria',
  publicationType: 'estatutos'
}

const incompletePublication = {
  name: 'tomaso',
  link: 'how i make this possibles',
  responsible: 'kratos2589',
  publicationType: 'estatutos'
}

const existingPublication = {
  name: 'tomaso',
  link: 'how i make this possibles',
  responsible: 'kratos2589',
  dispatch: 'agropecuaria',
  publicationType: 'estatutos'
}

const agent = session(app)

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/alcaldiaPublications', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

let publicationId
describe('POST /publications', () => {
  beforeEach(async () => {
    await Publications.deleteMany({})
  })
  test('it should respond with status code 400 if the publication data is incomplete', async () => {
    const response = await agent
      .post('/publications')
      .send(incompletePublication)
    expect(response.statusCode).toEqual(400)
  })

  test('it should respond with status code 400 if the publication exists', async () => {
    const response = await agent
      .post('/publications')
      .send(existingPublication.name)
    expect(response.statusCode).toEqual(400)
  })

  test('it shuould create a new publication', async () => {
    const response = await agent.post('/publications').send(newPublication)
    expect(response.statusCode).toEqual(201)
    expect(response.body).toHaveProperty('_id')
    expect(response.body.name).toEqual(newPublication.name)
    publicationId = response.body._id
  })
})

describe('GET /publications', () => {
  test('it should responds with statusCode 200', async () => {
    const response = await agent.get('/publications')
    expect(response.statusCode).toEqual(200)
  })
  test('it should return a JSON', async () => {
    const response = await agent.get('/publications')
    expect(response.headers['content-type']).toContain('application/json')
  })

  test('it should return an Array', async () => {
    const response = await agent.get('/publications')
    expect(response.body).toBeInstanceOf(Array)
  })

  test('it should return an Array of Objects', async () => {
    const response = await agent.get('/publications')
    expect(response.body).toBeInstanceOf(Array)
    response.body.forEach((item) => {
      expect(item).toBeInstanceOf(Object)
    })
  })

  test('it should an Array of Objects with specific properties', async () => {
    const response = await agent.get('/publications')
    expect(response.body).toBeInstanceOf(Array)
    response.body.forEach((item) => {
      expect(item).toBeInstanceOf(Object)
      expect(item).toHaveProperty('_id')
      expect(item).toHaveProperty('name')
      expect(item).toHaveProperty('dispatch')
    })
  })
})

describe('GET /publications/:id', () => {
  test('it should return a publication by id', async () => {
    const response = await agent.get(`/publications/${publicationId}`)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.statusCode).toEqual(200)
  })

  test('it should respond with status code 404 when the publication is not found', async () => {
    const nonExistingId = new mongoose.Types.ObjectId()
    const response = await agent.get(`/publications/${nonExistingId}`)
    expect(response.statusCode).toEqual(404)
  })

  test('it should respond with status code 400 if the publication Id is invalid', async () => {
    const invalidgId = '60999f4a3b17884d1c829c9dhh'
    const response = await agent.get(`/publications/${invalidgId}`)
    expect(response.statusCode).toEqual(400)
  })
})

describe('PUT /publications/:id', ()=>{
  test('it should respond with status code 404 if not found publication', async ()=>{
    const nonExistingPublication = new mongoose.Types.ObjectId()
    const response = await agent.patch(`/publications/${nonExistingPublication}`)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.statusCode).toEqual(404)
  })

  test('it should respond with status code 400 if the ID does not valid', async ()=>{
    const invalidgId = '60999f4a3b17884d1c829c9dhh'
    const response = await agent.patch(`/publications/${invalidgId}`)
    expect(response.statusCode).toEqual(400)
  })

  test('it should respond with status code 400 if the recipe object is empty', async ()=>{
    let emptyPublication = {}
    const response = await agent.patch(`/publications/${publicationId}`)
    .send(emptyPublication)
    expect(response.statusCode).toEqual(400)
  })

  test('it should update a publication', async ()=>{
    const response = await agent.patch(`/publications/${publicationId}`)
    .send(updatePublication)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.statusCode).toEqual(200)
  })
})

describe('DELETE /publications/:id', ()=>{
  test('it should respond with status code 400 if the ID is not valid',async ()=>{
    const invalidId = '60999f4a3b17884d1c829c9dhh'
    const response = await agent.patch(`/publications/${invalidId}`)
    expect(response.statusCode).toEqual(400)
  })

  test('it should respond with status code 404 if publication not existing', async ()=>{
    const nonExistingPublication = new mongoose.Types.ObjectId()
    const response = await agent.patch(`/publications/${nonExistingPublication}`)
    expect(response.statusCode).toEqual(404)
  })

  test('it should delete a publication', async()=>{
    const response = await agent.delete(`/publications/${publicationId}`)
    expect(response.statusCode).toEqual(200)
  })
})