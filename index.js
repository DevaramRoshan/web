const express=require("express");




const users=require("./MOCK_DATA.json");

const fs=require("fs");

const PORT=8081;

const app=express();

app.use(express.urlencoded({extended:false}));


app.get("/users",(req,res)=>{
 res.status(200).json({
    success:true,
    data : users
 })
})


app.get("/users/:id",(req,res)=>{
   const id=Number(req.params.id);
   const user=users.find((each)=>each.id===id);
   if(!user){
      res.status(404).json({
         success:false,
         msg :"there is no such user with this id "
      })
   }
   res.status(200).json({
      success:true,
      data:user
   })
})

app.post("/users",(req,res)=>{
   const body=req.body;
   // if(!body){
   //    res.status(400).json({
   //       success:false,
   //       msg:"please enter the details in the body"
   //    })
   
   // }
   users.push({id:users.length+1,...body});
   fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,res)=>{
      res.status(201).json({
         success:true,
         data:users[users.length-1]
      })
   })
})
app.listen(PORT,()=>console.log(`app is running on port ${PORT}`));