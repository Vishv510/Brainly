import mongoose from "mongoose";

function success(){
    console.log( "Mongo connected successfully")
}

async function connectToMongo() : Promise<void> {

    await mongoose.connect(process.env.MONGO_URI as string)
        .then(success)
        .catch(e => {
            console.log("MongoDB connection Error: ", e);
            process.exit(1);
        });
}

export default connectToMongo;