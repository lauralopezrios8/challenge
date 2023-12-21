import config from './config'

const mongoose = require('mongoose')

const url = `mongodb+srv://lauralopezrios8:RHClhaognPMT2loF@cluster0.mtcmpvh.mongodb.net/`;
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Database connection succeeded! ')
    })
    .catch((err: any) => {
        console.error(`Error connecting to the database: ${err}`);
    })
