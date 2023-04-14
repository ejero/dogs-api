const request = require('supertest');
// express app
const app = require('./index');

// db setup
const { sequelize, Dog } = require('./db');
const seed = require('./db/seedFn');
const { dogs } = require('./db/seedData');

// Supertest
const req = require('supertest');
const { response } = require('./index');

describe('Endpoints', () => {
    // to be used in POST test
    const testDogData = {
        breed: 'Poodle',
        name: 'Sasha',
        color: 'black',
        description: 'Sasha is a beautiful black pooodle mix.  She is a great companion for her family.'
    };

    beforeAll(async () => {
        // rebuild db before the test suite runs
        await seed();
    });

    describe('GET /dogs', () => {
        it('should return list of dogs with correct data', async () => {
            // make a request
            const response = await request(app).get('/dogs');
            // assert a response code
            expect(response.status).toBe(200);
            // expect a response
            expect(response.body).toBeDefined();
            // toEqual checks deep equality in objects
            expect(response.body[0]).toEqual(expect.objectContaining(dogs[0]));
        });
    });


    describe('POST /dogs', () => {
        let createdDog;
        it('should create a new dog', async () => {
            request(app)
                .post('/dogs')
                .send({ testDogData })
                .expect({
                    breed: 'Poodle',
                    name: 'Sasha',
                    color: 'black',
                    description: 'Sasha is a beautiful black pooodle mix.  She is a great companion for her family.',
                })
                createdDog = response.body;
                expect
        })
        it('find dog by id', async () => {
            const foundDog = response.body.id;
            request(app)
                .get(`/dogs/${foundDog}`)
                .expect(200)
        })
    })

});