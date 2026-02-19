import mongoose from "mongoose";

const connectDB = async() => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            tls: true,
            retryWrites: true,
            authSource: "admin"
        });
        console.log(`/n MONGO DB CONNECTT!!!!: ${connectionInstance.connection.host}`)
    }
    catch(err){
        console.log('ERROR', err);
        process.exit(1);
    }
}

export default connectDB;