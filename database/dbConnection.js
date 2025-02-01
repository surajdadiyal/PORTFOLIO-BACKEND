import mongoose from "mongoose";

const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "PORTFOLIO",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log('MongoDB connected !');
    }).catch((error)=>{
        console.log(`Error while connecting to database : ${error} `);
    })
}

export default dbConnection