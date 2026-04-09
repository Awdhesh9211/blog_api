import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

// Database connection
import { connectDB } from './db/connect.js';

// Route imports
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';

// middleware imports
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorHandler from './middleware/error.js';


const app = express();
const PORT =process.env.PORT || 3000;


// Useful middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse cookies (for authentication)
app.use(cookieParser());
// Enable CORS for all routes (you can configure this further for production)
app.use(cors({
    origin: '*', // Allow all origins (you can specify your frontend URL here)
    credentials: true, // Allow cookies to be sent with requests
}));


app.get('/', (req, res) => {
    res.send('Welcome to the Express Blog API!');
});

// Modular route handling
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);



// Error handling middleware (for unexpected errors)
app.use(errorHandler);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} \n Visit http://localhost:${PORT} to see the API in action.`);
    });
}).catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
});



