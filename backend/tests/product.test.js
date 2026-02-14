const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");

let mongoServer;
let token;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    // Registrar usuario
    await request(app)
        .post("/api/auth/register")
        .send({
        email: "test@test.com",
        password: "123456"
        });

    // Login
    const res = await request(app)
        .post("/api/auth/login")
        .send({
        email: "test@test.com",
        password: "123456"
        });

    token = res.body.token;
    });

    afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    });

    describe("Product Routes", () => {

    it("Debe crear producto si está autenticado", async () => {
        const res = await request(app)
        .post("/api/products")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "Laptop",
            price: 1000
        });

        expect(res.statusCode).toBe(201);
    });

    it("Debe rechazar acceso sin token", async () => {
        const res = await request(app)
        .get("/api/products");

        expect(res.statusCode).toBe(401);
    });

    it("Debe obtener la lista de productos si está autenticado", async () => {
    const res = await request(app)
        .get("/api/products")
        .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    });

    it("Debe eliminar un producto si está autenticado", async () => {
    // Crear producto primero
    const product = await request(app)
        .post("/api/products")
        .set("Authorization", `Bearer ${token}`)
        .send({
        name: "Mouse",
        price: 50
        });

    const res = await request(app)
        .delete(`/api/products/${product.body._id}`)
        .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    });


});
