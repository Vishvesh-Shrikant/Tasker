const allowedOrigins=['http://localhost:5173', 'https://tasker-client-vishvesh.vercel.app']

const corsOptions={
    origin:allowedOrigins, 
    credentials: true,
}  
module.exports= corsOptions;