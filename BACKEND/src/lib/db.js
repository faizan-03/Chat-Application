import mongoose from 'mongoose';


export const connectdb = async () => {
    try {
       let conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error: ", error.message);
        // process.exit(1);
    }
};
