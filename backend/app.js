import express from 'express';
import bodyParser from 'body-parser';
import generateURLDescriptionRoute from './routes/generateDescriptionWithUrl.js';
import generateUrlOcrRoute from './routes/generateOCRwithUrl.js';
import generateDescriptionWithFileRoute from './routes/generateDescriptionWithFile.js'; 
import generateUrlOcrWithFile from './routes/generateOCRWithFile.js';
import translateText from './routes/translateText.js'
import cors from 'cors';
import apiKeyAuth from './middleware/apiAuthKey.js';

const app = express();

const allowedOrigins = ['https://example.com', 'https://anotherdomain.com'];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            // Allow requests with no origin (e.g., mobile apps or curl requests)
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

const port = process.env.PORT || 3001;
// Apply API key authentication middleware
app.use('/api', apiKeyAuth);
// Apply CORS middleware with the configured options
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', generateURLDescriptionRoute);
app.use('/api', generateUrlOcrRoute);
app.use('/api', generateDescriptionWithFileRoute);
app.use('/api', generateUrlOcrWithFile); // Add the new route
app.use('/api', translateText); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
