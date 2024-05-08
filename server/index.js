const express=  require("express");
const cors=require("cors");
const mongoose=require("mongoose");

const app=express();
app.use(cors());
app.use(express.json())
// mongoose.connect("")
// .then(()=>console.log("Connected to DB"))
// .catch((err)=>console.log(err))

const dbConnection = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017", {
        dbName: "crudapp"
    }).then(() =>{
        console.log("Database connected")
    }).catch(() =>{
        console.log("Error connecting database")
    })
}

dbConnection()



port=3000;

const schemaData=mongoose.Schema({
    name:String,
    email:String,
    mobile:String,
    dob:String
},{
    timestamps:true
})

const userModel1=mongoose.model("user",schemaData)

//read
// ​http://localhost:3000/
app.get('/',async(req,res)=>{
    const data = await userModel1.find({})
    res.json({success:true,data:data})
})
//create data/save data in mongoDB
//​http://localhost:3000/create
/*
name,
email,
mobile
*/
app.post("/create",async(req,res)=>{
    console.log(req.body);
    const data=new userModel1(req.body);
    await data.save();
    res.send({success:true,message:"Data save successfully",data:data})

})
//update the data
// ​http://localhost:3000/update
/*
{
    id:"",
    name:"",
    email:"",
    mobile:" "
}
*/
app.put("/update",async(req,res)=>{
    console.log(req.body);
    const {_id,...rest}=req.body
    console.log(rest)
    const data=await userModel1.updateOne({_id:_id},rest);
    res.send({success:true,message:"Data update successfully",data:data});
})

//delete
// ​http://localhost:3000/delete/id
app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    console.log(id);
    const data=await userModel1.deleteOne({_id:id})
    res.send({success:true,message:"Data deleted successfully",data:data});
})
app.listen(port,()=>{
console.log(`Server is running on ${port}`);
})
