import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({
    path: './.env'
});

const startServer = async () =>{
    try{
        console.log('STARTING....')
        await connectDB();

        app.on("error", (error) => {
            console.log("ERROR");
            throw error;
        });

        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`Server is running on port: ${process.env.PORT}`);
        })
    }
    catch(err){
        console.log('MONGO ERROR');
    }
}

startServer();