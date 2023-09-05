import {
  getAllCartsService,
  getCartByIdService,
  createCartService,
  addToCartService,
  deleteFromCartService,
  updateProdQuantityService
} from '../services/carts.services.js'
import HttpResponse from '../utils/http.response.js';
import { loggerDev } from '../utils/logger.js';

const httpResponse = new HttpResponse();

export const getAllController = async (req, res, next) => {
  try {
      const docs = await getAllCartsService();
      res.json(docs)
  } catch (error) {
      loggerDev.error(error.message)
      return httpResponse.NotFound(res, error)
  }
};

export const getByIDController = async (req, res, next) => {
  try {
      const { cid } = req.params;
      const docs = await getCartByIdService((cid));
      res.json(docs)
  } catch (error) {
      loggerDev.error(error.message)
      return httpResponse.NotFound(res, error)
  }
};

export const createCartController = async (req, res, next) => {
  try {
      const docs = await createCartService();
      res.json(docs)
  } catch (error) {
      loggerDev.error(error.message)
      return httpResponse.ServerError(res, error)
  }
};

export const addToCartController = async (req, res, next) => {
  try {
      const { cid, pid } = req.params;
      const product = await addToCartService(cid,pid);
      res.json(product)
  } catch (error) {
      loggerDev.error(error.message)
      return httpResponse.ServerError(res, error)
  }
};

export const deleteFromCartController = async (req, res, next) => {
  try {
      const { cid, pid} = req.params;
      const productDeleted = await deleteFromCartService(cid, pid);
      res.json(productDeleted)    
  } catch (error) {
      loggerDev.error(error.message)
      return httpResponse.ServerError(res, error)
  }
};

export const updateProdQuantityController = async (req, res, next) => {
  try {
     const {cid, pid} = req.params
     const { quantity } = req.body
     const product = await updateProdQuantityService(cid, pid , quantity)
     res.json(product)
  } catch (error) {
      loggerDev.error(error.message)
      return httpResponse.ServerError(res, error)
  }
};