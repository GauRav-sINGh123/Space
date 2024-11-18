import mongoose from 'mongoose';

 type ConnectionObject={
    isConnected?:number
 }

 const connection:ConnectionObject={}
 

 export async function connect() {
     try {
         mongoose.connect(process.env.MONGO_URI!);
         const connection = mongoose.connection;
 
         connection.on('connected', () => {
             console.log('MongoDB connected successfully');
         })
 
         connection.on('error', (err) => {
             console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
             process.exit();
         })
 
     } catch (error) {
         console.log('Something goes wrong!');
         console.log(error);
         
     }
 
 
 }
 async function connectDB():Promise<void>{
    if(connection.isConnected){
        console.log("Already Connected")
        return
    }
     try {
        const db=await mongoose.connect(process.env.MONGO_DB_URL!)
        connection.isConnected=db.connections[0].readyState
        console.log("DB Connected Successfully")
     } catch (error:any) {
        console.log(error.message)
        process.exit()
     }
 }