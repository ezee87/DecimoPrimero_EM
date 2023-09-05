import ProductDao from "../persistence/daos/mongodb/dao/products.dao.js";
import { loggerDev } from "../utils/logger.js";

const prodDao = new ProductDao();

export const getAllService = async (page, limit, category) => {
    try {
        const allDocuments = await prodDao.getAllProducts(page, limit, category);
        return allDocuments;
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error (error)
    }
};

export const getByIDService = async (id) => {
    try{
        const documentByID = await prodDao.getProductByID(id);
        if(!documentByID) throw new Error ('Product not found')
        else return documentByID;
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error (error)
    }
};

export const addService = async (obj) => {
    try {
        const newProduct = await prodDao.addProduct(obj);
        if(!newProduct) throw new Error ('Validation failed')
        else return newProduct;
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error (error)
    }
};

export const updateService = async (id, obj) => {
    try {
        const documentByID = await prodDao.getProductByID(id);
        if(!documentByID) {
            throw new Error ('Product not found')
        }else {
            const productUpdated = await prodDao.updateProduct(id, obj)
            return productUpdated
        }
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error (error)
    }
};

export const deleteByIDService = async (id) =>{
    try {
        const productDeleted = await prodDao.deleteProductByID(id)
        return productDeleted
    } catch (error){
        loggerDev.error(error.message)
        throw new Error (error)
    }
};

export const getByKeyService = async (key, value) => {
    try {
        const productByKey = await prodDao.getProductByKey(key, value)
        return productByKey
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error (error)
    }
};