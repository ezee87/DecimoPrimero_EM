import mongoose from "mongoose";

const connectionString = 'mongodb+srv://ezequielM:admin@cluster0.rbgchkc.mongodb.net/ecommerce?retryWrites=true&w=majority';

try {
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB');
} catch (error) {
    console.log(error);
}