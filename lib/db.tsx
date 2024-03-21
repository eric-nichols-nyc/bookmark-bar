// connect to mongodb   
import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!)
    return conn
  } catch (error:any) {
    console.error(`You are not connected: ${error.message}`)
    return {message: `You are not connected: ${error.message}`}
  }
}