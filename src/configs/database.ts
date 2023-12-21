import mongoose from 'mongoose'

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/mydatabase'

mongoose.connect(DATABASE_URL)
    .then(() => {
        console.log('Database connection succeeded! ')
    })
    .catch((err: any) => {
        console.error(`Error connecting to the database: ${err}`);
})
