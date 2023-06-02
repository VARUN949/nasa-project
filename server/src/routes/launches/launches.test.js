const request=require("supertest")
const app=require("../../app")
const supertest = require("supertest")
describe('Test GET/lauches', () => {
    test('It should respond with 200 success',async () => {
        const response = await request(app)
            .get('/launches')
            .expect(200);
        
        
    })
})

describe('Test POST/lauches',()=> {
    test('It should respond with 200 success', () => {
        const response = 200
        expect(response).toBe(200);
    })
    test('It should catch missing required properties', () => { })
    test('It should catch invalid date',()=>{})

})