const path    = require('path')
const expect  = require('chai').expect
const request = require('supertest')
const config  = require('./utils/config')
const storage = require('./utils/storage')
const error   = require('./utils/error')

const agent = request(config.baseURL)

describe('Manage Dashboard', () => {
  it('Ping', () => {
    return agent
      .get('/ping')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .on('error', error)
      .then((res) => {
        expect(res.body).to.include.keys('messages')
        expect(res.body.messages).to.be.eq('Pong')
      })
  })

  it('Login', () => {
    return agent
      .post('/auth/login')
      .set('Accept', 'application/json')
      .field('username', config.login.user)
      .field('password', config.login.pass)
      .expect('Content-Type', /json/)
      .expect(200)
      .on('error', error)
      .then((res) => {
        expect(res.body).have.all.keys('code', 'message', 'data')
        expect(res.body.data).include.keys('token')

        storage.set('token', res.body.data.token)
      })
  })

  it('Profile', () => {
    return agent
      .get('auth/profile')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${storage.get('token')}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .on('error', error)
      .then((res) => {
        expect(res.body).have.all.keys('code', 'message', 'data')
        expect(res.body.data).include.keys('user')
      })
  })

  it('Upload File', () => {
    return agent
      .post('/upload')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${storage.get('token')}`)
      .attach('doc', path.resolve(__dirname, './assets/README.md'))
      .expect('Content-Type', /json/)
      .expect(200)
      .on('error', error)
      .then((res) => {
        expect(res.body).have.all.keys('code', 'message', 'data')
      })
  })

  it('Post with JSON field', () => {
    return agent
      .post('/checkout')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer $\{storage.get('token')}`)
      .field('name', 'Username')
      .field('items', JSON.stringify([
        { id: 1, name: 'Lorem' },
        { id: 2, name: 'Ipsum' },
        { id: 4, name: 'Dolor' },
      ]))
      .expect('Content-Type', /json/)
      .expect(200)
      .on('error', error)
      .then((res) => {
        expect(res.body).have.all.keys('code', 'message', 'data')
      })
  })
})
