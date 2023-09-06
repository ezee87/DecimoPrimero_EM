import { expect } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";

chai.use(chaiHttp);

describe("GET /products", () => {
  it("should return a list of products", async () => {
    const res = await chai.request(app).get("/products/");
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("status");
    expect(res.body).to.have.property("payload").to.be.an("array");
  });

  it("should return a specific product by ID", async () => {
    const productId = "64cbe6c164df042c64f72a00";
    const res = await chai.request(app).get(`/products/${productId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("title");
    expect(res.body).to.have.property("price");
  });
});