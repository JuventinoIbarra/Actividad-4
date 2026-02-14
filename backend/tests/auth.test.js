const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("Auth Routes", () => {

    it("Debe registrar un usuario correctamente", async () => {
        const res = await request(app)
        .post("/api/auth/register")
        .send({
            email: "test@test.com",
            password: "123456"
        });

        expect(res.statusCode).toBe(201);
    });

    it("Debe hacer login correctamente y devolver token", async () => {
        const res = await request(app)
        .post("/api/auth/login")
        .send({
            email: "test@test.com",
            password: "123456"
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    });

    it("Debe rechazar registro si el usuario ya existe", async () => {
    const res = await request(app)
        .post("/api/auth/register")
        .send({
        email: "test@test.com",
        password: "123456"
        });

    expect(res.statusCode).toBe(400);
    });

    it("Debe rechazar login con contraseña incorrecta", async () => {
    const res = await request(app)
        .post("/api/auth/login")
        .send({
        email: "test@test.com",
        password: "wrongpassword"
        });

    expect(res.statusCode).toBe(400);
    });

    


});
