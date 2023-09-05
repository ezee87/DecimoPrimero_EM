import app from '../../app.js';
import request from 'supertest';
import mongoose from 'mongoose';

const doc = {
    title: "T-shirt",
    description: "White cotton T-shirt",
    price: 100,
    code: "Shirt1",
    category: "clothes",
    stock: 50,
    status: true,
    thumbnails: "tshirt1.jpg"
};

describe ( 'Integral product test', () => {
    let authToken;

    beforeAll(async ()=>{
        const userCredentials = {
            email: 'p@mail.com',
            password: '123'
        }
    });

    const userResponse = await (request(app).post('/users/login').send(userCredentials));

    authToken = userResponse.header.authorization;

});

test('[POST] /products', async () => {
    const response = await request(app).post('/products').send(doc).set('Authorization', `Bearer ${authToken}`)

    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe(doc.title);
    expect(response.body.description).toBe(doc.description);
});

test('[GET] /products', async () => {
    const response = await request(app).get('/products')
    const statusCode = response.statusCode;

    expect(statusCode).toEqual(200);
    expect(typeof response.body).toBe('object');
    expect(statusCode).not.toBe(404)
});

test('[GET] /products/:pid', async () => {
    const responsePost = await request(app).post('/products').send(doc).set('Authorization', `Bearer ${authToken}`)
        const id = responsePost.body._id;
        expect(id).toBeDefined();
    const response = await request(app).get(`/products/${id}`)
      
    const statusCode = response.statusCode;

    expect(statusCode).toEqual(200);
    expect(typeof response.body).toBe('object');
    expect(statusCode).not.toBe(404)
});

test('[PUT] /products/:id', async()=>{
    const responsePost = await request(app).post('/products').send(doc).set('Authorization', `Bearer ${authToken}`)
    const id = responsePost.body._id;
    console.log("🚀 ~ file: app.test.js:65 ~ test ~ id:", id)
    expect(id).toBeDefined();
    const docUpdated = {
      title: "T-shirtACT",
      description: "White cotton T-shirtACT",
      price: 100,
      code: "Shirt1ACT",
      status: truw,
      stock: 123,
      category: "clothingACT",
      thumbnails: "tshirt1.jpgACT",
    }

    const responsePut = await request(app).put(`/products/${id}`).send(docUpdated).set('Authorization', `Bearer ${authToken}`)

    const statusCode = responsePut.status;
    expect(statusCode).toBe(200);
    const responsePutBody = responsePut.body.body;
    expect(responsePutBody).toBe(docUpdated.body);

});

describe('Cart integral test', () => {

    test('[POST] /carts', async () => {
      const response = await request(app).post('/carts')
      const statusCode = response.statusCode
      expect(response.body).toHaveProperty('products');
      expect(statusCode).toEqual(200);
      expect(typeof response.body).toBe('object');
      expect(statusCode).not.toBe(404)
    });

    test('[POST] /carts', async () => {
        const response = await request(app).post('/carts')
        const statusCode = response.statusCode
        expect(response.body).toHaveProperty('products');
        expect(statusCode).toEqual(200);
        expect(typeof response.body).toBe('object');
        expect(statusCode).not.toBe(404)
     
    })
    
      test('[GET] /carts/:cid', async () => {
        const responsePost = await request(app).post('/carts')
        const idPost = responsePost.body._id
        const responseGet = await request(app).get(`/carts/${idPost}`)
        const idGet = responseGet.body._id
        const statusCode = responseGet.statusCode;
        const idFake = '0123456789';
    
        const responseGetById = await request(app).get(`/carts/${idGet}`);
        expect(statusCode).toEqual(200);
        expect(typeof responseGetById.body).toBe('object');
        expect(statusCode).not.toBe(404)
        const responseGetByIdFake = await request(app).get(`/carts/${idFake}`);
            expect(responseGetByIdFake.statusCode).toBe(404);
            expect(responseGetByIdFake.body.message).toEqual(`Not Found`)
      })
});

describe('Sessions integral test', () => {
    const user = {
            firstName: "Pedro",
            lastName: "Perez",
            email: "pp@mail.com",
            password: "123",
            age: 2123,
            role: "admin"
    };
        
    
    test('[POST] /users/register', async () => {
        const response = await request(app).post('/users/register').send(user);
          
        const statusCode = response.statusCode
        expect(statusCode).toEqual(200);
        expect(typeof response.body).toBe('object');
        expect(statusCode).not.toBe(404)
       
    });
});