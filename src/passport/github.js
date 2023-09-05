import UserDao from "../persistence/daos/mongodb/dao/user.dao.js";
import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";

const userDao = new UserDao();

const strategyOptions = {
    clientID: 'Iv1.acab7373d5f66898',
    clientSecret: 'b66233a6647909be4f7633bebcbab845e7f102c8',
    callbackURL: 'http://localhost:8080/api/users/profile-github'
};

const github = async(profile, done) =>{
    console.log('profile:::', profile);
    const email = profile._json.email !== null ? profile._json.email : profile._json.blog;
    const user = await userDao.getUserByEmail(email);
    
    if(user) return done(null, user);
    const newUser = await userDao.createUser({
        firstName: profile._json.name.split(' ')[0],
        lastName: profile._json.name.split(' ')[1] + ' ' + profile._json.name.split(' ')[2],
        email,
        password: ' ',
        githubUser: true
    });
    return done(null, newUser);
};

passport.use('github', new GithubStrategy(strategyOptions, github));