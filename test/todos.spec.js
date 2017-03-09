import test from 'ava'
import request from 'supertest-as-promised'
import {app} from '../server'
import {Todo} from '../routes/todos'

test.beforeEach(async t => {
  await Todo.remove()
  t.context.request = request(app.callback())
})

test.beforeEach(async t => {
  t.context.request = request(app.callback())//create a request client eache time, so clean state
})

test('listing is empty', async t => {
  const {body, status, type} = await t.context.request.get('/todos')//deconstructing the return from the get
  t.is(status, 200)//these are my asserts
  t.is(type, 'application/json')
  t.is(body.length, 0)
})

test('create new resource', async t => {
  const {status} = await t.context.request.post('/todos').send({
    title: 'Be awesome'
  })
  t.is(status, 201)
  t.is(await Todo.count(), 1)
})

