import UserDao from "../persistence/daos/mongodb/dao/user.dao.js";
import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";

const userDao = new UserDao()

const strategyOptions = {
    userNameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

const register = async (req, email, password, done) => {
    try {
        const user = await userDao.getUserByEmail(email);
        if (user) return done(null, false);
        const newUser = await userDao.createUser(req.body);
        return done(null, newUser)            
    } catch (error) {
        console.log(error)
    }
};

const login = async (req, email, password, done) => {
    try {
        const user = { email, password};
        const userLogin = await userDao.loginUser(user);
        if(!userLogin) return done(null, false);
        return done(null, userLogin)
    } catch {
        console.log(error)
    }
};

const registerStrategy = new LocalStrategy(strategyOptions, register);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use('register', registerStrategy);
passport.use('login', loginStrategy);

passport.serializeUser((user, done) => {
    return done(null, user._id)
});

passport.deserializeUser(async (id, done) => {
    const user = await UserDao.getUserByID(id);
    return done(null, user)
});