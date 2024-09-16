const express = require("express");
const mongodb = require("mongodb");
const {MongoClient} = mongodb;
const app = express();
// const user = "suba69475";
// const password = "Gops1014";
const url = 'mongodb+srv://suba69475:Gops1014@cluster0.x11xtyi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(url);

async function connect() {
    try{
        await client.connect();
        console.log("connected to database");
        return client.db("users");
    }catch(error){
        console.log("could not connect to db");
    } 
}

app.post("/users",async (req, res)=>{
    const db = await connect(); //connecting to db
    const collection = db.collection("users");//to select the collection
    await collection.insertOne({
        name:"gops",email:"suba69475@gmail.com",password:"Gops1014"
    });
    res.send("user created");
})

app.get("/users", async (req, res) =>{
    const db = await connect(); //connecting to db
    const collection = db.collection("users");//to select the collection
    const data = await collection.find({}).toArray();
    res.send(data);
})

app.put("/users" , async(req, res)=>{
    const db = await connect(); //connecting to db
    const collection = db.collection("users");//to select the collection
    await collection.updateOne(
        { name:"gops"}, { $set: { name: "suba"}}
    );
    res.send("user updated");
})

app.delete("/users", async(req, res)=>{
    const db = await connect(); //connecting to db
    const collection = db.collection("users");//to select the collection
    await collection.deleteOne({ name: "suba"});
    res.send("user deleted");
})
// app.get("/" , (req,res)=>{
//     res.send("hello world");
// })

app.listen(4000 , () =>{
    console.log("project is running on the port 4000");
})