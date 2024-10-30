const allowedOrigins=['http://localhost:5173', 'https://tasker-uc.vercel.app/']

const corsOptions={
    origin:(origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}  
module.exports=corsOptions;