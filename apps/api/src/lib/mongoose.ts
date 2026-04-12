import mongoose, {type Connection} from "mongoose"

const MONGO_URI = process.env.MONGO_URI!

if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables")
}

export const connectMongo = async (): Promise<Connection> => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("MongoDB connected")
        return mongoose.connection
    } catch (error) {
        console.error("MongoDB connection error:", error)
        process.exit(1)
    }
}

export default mongoose
