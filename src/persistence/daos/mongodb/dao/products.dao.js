import { ProductsModel } from "../models/products.model.js";
import { UserModel } from "../models/user.model.js"
import { loggerDev } from "../../../../utils/logger.js";

export default class ProductDao {

    async getAllProducts (page=1, limit=10, category) {
        try{
            if (category){
                const response = await ProductsModel.paginate({category: category},{page, limit});
                return response;
            } else {
                const response = await ProductsModel.paginate({},{page, limit})
                return response
            }
        }catch (error) {
            loggerDev.error(error.message)
            throw new Error(error)
        }
    };

    async getProductByID (pid) {
        try{
            const response = await ProductsModel.findById(pid);
            return response;
        }catch (error) {
            loggerDev.error(error.message)
            throw new Error(error)
        }
    };

    async addProduct ({title, description, price, code, category, stock, status, thumbnails, userEmail}) {
        try{
            const user = await UserModel.findOne({email: userEmail});
            if (user.role === 'premium' || user.role === 'admin'){
                const response = await ProductsModel.create({
                    title,
                    description,
                    price,
                    code,
                    category,
                    stock,
                    status,
                    thumbnails,
                    owner: user.email                        
                })
                return response;
            } else {
                throw new Error ({message: 'Cannot create product'})
            }
        }catch (error) {
            loggerDev.error(error.message)
            throw new Error(error)
        }
    };

    async updateProduct (pid, obj) {
        try{
            await ProductsModel.updateOne({_id: pid, obj});
            return obj;
        }catch (error) {
            loggerDev.error(error.message)
            throw new Error(error)
        }
    };

    async deleteProductByID (pid) {
        try{
            const response = await ProductsModel.findByIdAndDelete(pid);
            return response;
        }catch (error) {
            loggerDev.error(error.message)
            throw new Error(error)
        }
    };

    async getProductByKey (key, value) {
        try {
            const query = {};
            query[key] = value;
            const response = await ProductsModel.find(query)
            return response
        }catch (error) {
            loggerDev.error(error.message)
            throw new Error(error)
        }
    };
};   