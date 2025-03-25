import express from 'express';  // import express from the express package
import dotenv from 'dotenv';  // import dotenv from the dotenv package
import {connectdb} from './lib/db.js';  // import the connectdb function from the db.js file
import authRoutes from './routes/auth.route.js';  // import the authRoutes from the auth.route.js file
import messageRoutes from './routes/message.route.js';  // import the messageRoutes from the message.route.js file
import cookieParser from 'cookie-parser';  // import the cookie-parser package
import cors from 'cors';  // import the cors package
import { app, server } from './lib/socket.js';



dotenv.config();  // configure the dotenv package

const PORT = process.env.PORT || 5001;  // set the PORT to the port number in the .env file or 5001





// middleware 

app.use(cookieParser());  // use the cookie-parser middleware
app.use(express.json());  // parse the incoming request with JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
    
    origin: "http://localhost:5173",
    credentials:true,
}));

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

server.listen(PORT, () => {
    console.log(`Server is running on Port:${PORT}`);
    connectdb();  // call the connectDB function
});