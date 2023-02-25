import mongoose from 'mongoose';

export const dbInit = async () => {
    mongoose.set('strictQuery', false);
    return mongoose.connect(process.env.MONGODB_URI);
};
