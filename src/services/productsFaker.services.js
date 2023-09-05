import { ProductsModelFake } from "../persistence/daos/mongodb/models/products.faker.model.js";
import { generateProduct } from "../utils/productsFaker.utils.js";
import { loggerDev } from "../utils/logger.js"

export const createProduct = async (cant = 100) => {
    try {
        const prodArray = []
        for (let i = 0; i < cant; i++) {
        const prod = generateProduct();
        prodArray.push(prod);
    }
    const product = await ProductsModelFake.create(prodArray)
    return product;        

    } catch (error){
      loggerDev.error(error.message)
      throw new Error (error)
    }
};

export const getProducts = async() => {
    try {
      const products = await ProductsModelFake.find({});
      return products;
    } catch (error) {
      loggerDev.error(error.message)
      throw new Error(error)
    }
  };