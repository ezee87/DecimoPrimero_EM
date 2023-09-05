import UserDao from "../persistence/daos/mongodb/dao/user.dao.js";
import { loggerDev } from "../utils/logger.js";

const usersDao = new UserDao();

export const createUserService = async (userData) => {
    try {
        const newUser = await usersDao.createUser(userData);            
        return newUser
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error(error)
    }
};

export const loginUserService = async (userData) => {
    try {
        const login = await usersDao.loginUser(userData);
        return login
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error(error)
    }
};

export const getByIDService = async (id) => {
    try {
        const getByID = await usersDao.getUserByID(id);
        return getByID
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error(error)
    }
};

export const getByEmailService = async (email) => {
    try { 
        const getByEmail = await usersDao.getUserByEmail(email);
        return getByEmail
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error(error)
    }
};

export const getUserDto = async (id) => {
    try {
      const data = await usersDaoMongo.getByIdDTO(id);
      if(!data) return false
     return data
  } catch (error) {
        loggerDev.error(error.message)
        throw new Error(error)           
  }
};