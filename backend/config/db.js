import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://aayushpanwar5178:Xly9yhMrHcFmtZed@cluster0.0f9pfog.mongodb.net/gusto').then(()=>console.log('Connected'));
}