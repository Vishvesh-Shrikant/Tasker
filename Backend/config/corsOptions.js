const allowedOrigins= require('./allowedOrigins.js')

const corsOptions = {
    origin: allowedOrigins, 
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    optionsSuccessStatus: 200
}
module.exports= corsOptions;