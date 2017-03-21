import test from 'ava'
import request from 'supertest-as-promised'
import app from '../server'
import SequelizeMock from 'sequelize-mock';
import rewire from 'rewire'

var fakeRoutes = rewire('../routes/todos');

var DBConnectionMock = new SequelizeMock();

var UserMock = DBConnectionMock.define('users', {
        // 'email': 'email@example.com',
        'name': 'blink',
        'id': 'somethingUUID'
    }, {
        instanceMethods: {
            // myTestFunc: function () {
            //     return 'Test User';
            // },
        },
    });

fakeRoutes.__set__('Users', UserMock);

test.beforeEach(async t => {

  t.context.request = request(app.callback())
})

test('listing is empty', async t => {
  const {body, status, type} = await t.context.request.get('/users')//deconstructing the return from the get
  console.log('-----------', body)
  t.is(status, 200)//these are my asserts
  t.is(type, 'application/json')
  t.is(Object.keys(body).length, 0)
})

// test('create new resource', async t => {
//   const {status} = await t.context.request.post('/createUsers').send({
//     name: 'Aberham Lincoln Zombie Hunter'
//   })
//   t.is(status, 201)
//   // t.is(await Todo.count(), 1)
// })

