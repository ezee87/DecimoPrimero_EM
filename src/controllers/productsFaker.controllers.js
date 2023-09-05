import {
  createProduct,
  getProducts
} from '../services/productsFaker.services.js';
import HttpResponse from '../utils/http.response.js';
import { loggerDev } from '../utils/logger.js';

const httpResponse = new HttpResponse();

export const createController = async (req, res) => {
  const { quantity } = req.query;
  try{
      const docs = await createProduct(quantity);
      res.status(200).json({ productsfake: docs});
  } catch (error) {
      loggerDev.error(error.message)
      return httpResponse.ServerError(res, error)
  }
};

export const getController = async (req, res) => {
  try {  
      const docs = await getProducts();
      res.status(200).json({productsfake: docs})
  } catch (error) {
      loggerDev.error(error.message)
      return httpResponse.ServerError(res, error)
  }
};