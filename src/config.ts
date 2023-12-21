import { config} from 'dotenv';

// Calling the 'config' function to load environment variables
config();

export default {
    mongodbURL: process.env.MONGODB_URI || 'mongodb+srv://lauralopezrios8:RHClhaognPMT2loF@cluster0.mtcmpvh.mongodb.net/',
}
