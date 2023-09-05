import winston from "winston";

const logLvls = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
};

export const loggerDev = winston.createLogger({
    lvl: "debug",
    lvls: logLvls,
    transports: [new winston.transports.Console()]
});

export const loggerProd = winston.createLogger({
    lvl: "info",
    lvls: logLvls,
    transports: [new winston.transports.File({ filename: "./error.log" }),
    new winston.transports.Console()]
});