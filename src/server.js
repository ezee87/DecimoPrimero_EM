import express from 'express';
import { __dirname } from './utils/utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
import './db/database.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import productRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import usersRouter from './routes/users.router.js';
import productRouterFake from './routes/productRouterFake.js'
import config from './config.js'
import { loggerDev } from './utils/logger.js';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { info } from './docs/info.js';

dotenv.config();

const port = config.port || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(errorHandler);
app.use(cookieParser());

/* ROUTES */

app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/users', usersRouter);
app.use('/', viewsRouter);
app.use('/productsMock', productRouterFake);

/* SWAGGER */

const specs = swaggerJSDoc(info);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

/* HANDLEBARS */

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname +'/views');

/* MONGODB */

const storeOptions = {
    store: new MongoStore ({
        mongoUrl: 'mongodb+srv://bbastieri:Galito01@cluster0.fnqi1b0.mongodb.net/ecommerce?retryWrites=true&w=majority',
        crypto: {
            secret: 'secretPass'
        },
        ttl: 60,
        autoRemove: 'interval',
        autoRemoveInterval: 10,
    }),
    secret: 'secretPass2',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}; 

app.use(session(storeOptions));

/* PASSPORT */

app.use(passport.initialize());
app.use(passport.session());

/* PORT */

const httpServer = app.listen(port, () => {
    loggerDev.info(`Server listening at http://localhost:${port}`);
  });


/* WEBSOCKET */

const socketServer = new Server(httpServer);

socketServer.on('connection',  async (socket) =>{
    console.log(`Client connected: ${socket.id}`)

    socket.on('newProduct', async(product) =>{
        await productManager.addProduct(product)
        socketServer.emit('arrayProducts', await productManager.getProducts())
    });

    socketServer.emit("messages", await messagesManager.getAllMessages());

    socket.on("disconnect", () => {
        console.log("¡User disconnect!");
    });

    socket.on("newUser", (userName) => {
        console.log(`${userName} is logged in`);
    });

    socket.on("chat:message", async ({ userName, message }) => {
        await messagesManager.createMessage(userName, message);
        socketServer.emit("messages", await messagesManager.getAllMessages());
    });

    socket.on("newUser", (userName) => {
        socket.broadcast.emit("newUser", userName);
    });

    socket.on("chat:typing", (data) => {
        socket.broadcast.emit("chat:typing", data);
    });    
});

export default app;