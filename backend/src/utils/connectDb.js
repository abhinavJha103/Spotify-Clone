import mongoose from "mongoose"

const ConnectDb = async () => {
    try {
        await mongoose.connect(process.env.URI)
        console.log("Database Connected Successfully !")
    } catch (error) {
        console.error("Failed Connecting to the Database ", error)
    }
};

export default ConnectDb;
