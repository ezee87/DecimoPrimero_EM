import { Router } from 'express';

const router = Router();

router.get('/login',(req,res)=>{res.render('login')});

router.get('/register',(req,res)=>{res.render('register')});

router.get('/login-error',(req,res)=>{res.render('loginError')});

router.get('/register-error',(req,res)=>{res.render('registerError')});

router.get('/updatePass', (req, res)=>{res.render(updatePass)});

export default router