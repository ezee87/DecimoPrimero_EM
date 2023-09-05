import passport from "passport";
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt';
import UserDao from "../persistence/daos/mongodb/dao/user.dao.js";
const userDao = new UserDao();

const strategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: '1234'
};

const cookieExtractor = (req) => {
    const token = req.cookies.token
    return token
};

const strategyOptionsCookies = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: '1234'
};

const verifyToken = async (jwt_payload, done) => {
    const userData = await userDao.getById(jwt_payload.userID);
    console.log(userData);
    if(!userData) return done(null, false)
    return done(null, jwt_payload)
}

passport.use('current', new jwtStrategy(strategyOptions, verifyToken));
passport.use('jwtCookies', new jwtStrategy(strategyOptionsCookies, verifyToken));

passport.serializeUser((userData, done)=>{
   
    done(null, userData.userID)
});

passport.deserializeUser(async(id, done)=>{
    const user = await userDao.getById(id);
    return done(null, user);
})