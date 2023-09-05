import jwt from "jsonwebtoken";
import UserDao from "../persistence/daos/mongodb/dao/user.dao.js";
import config from "../config.js";

const userDao = new UserDao();

export const generateToken = (user) => {

    const payload = {
        userID: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        cart: user.cart,
        role: user.role    
    }

    const token = jwt.sign(payload, config.privateKeyJWT, {
        expiresIn: '1h',
    });
    return token;
};

export const checkAuth = async (req, res, next) => {
    try{
        const authHeader = req.headers['authorization'];
        if(!authHeader) return res.status(401).json({msg:'Unauthorized'});
        const token = authHeader.split('')[1];
        const decode = jwt.verify(token, privateKeyJWT);
        const user = await userDao.getUserByID(decode.userID);
        if(!user) return res.status(401).json({msg:'Unauthorized'});
        req.user = user;
        next()
    } catch (error) {
        console.log(error)
    }
};