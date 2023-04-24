const express = require("express");
const mongoose = require('mongoose');
const app = express();
const port = 5550;

const uri = 'mongodb+srv://shivani:shivani@cluster0.x98lnsl.mongodb.net/?retryWrites=true&w=majority';

async function getConnection() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Connection to MongoDB failed', error);
  }
}

getConnection();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

 // middleware to parse JSON request body



  

  //----------------------------------------------
   const TaskSchema = new mongoose.Schema({
    title:{type: String},
    _is_Completed:{Boolean},
    id:{type:Number,unique:true}
  });
//   // Define a task model
const Task = mongoose.model('tasks', TaskSchema);

//---------------------------------------------------------------------------------
// app.post('/v1/tasks',async(req,res)=>{
   
//    id = id++
//     res.json({"id":`${id}`})
//     let newtask =  new Task({title:req.body.title, _is_Completed:"true"})
//     await newtask.save()

// })
let idx = 0;
let object = []


app.post("/v1/tasks",async(req,res)=>{
        try{
            let task = object.push(Task.insertMany({
                title:req.body.title,
                _is_Completed:"true",
                id:`${object.length + 1}`
            }))
            res.json({
                status:"success",
                id:`${object.length + 1}`
            })
        }
        catch(e){
            console.log(e.message);
            res.json({
                message:e.message,
                status:"Failure"
            })
        }
    })

    app.get("/v1/tasks", async(req,res)=>{
        try{
            const tasks = await Task.find();
            res.json({
                status:"success",
                tasks,
                _is_Completed:"true"
            });
        }
        catch(e){
            res.status(400).json({
                status:"Failure",
                message:e.message
            });
        }
    });
    app.get("/v1/tasks/:id", async(req,res)=>{
        try{
            const tasks = await Task.find({"id":req.params.id});
            res.json({
                status:"success",
                tasks,
                _is_Completed:"true"
            });
        }
        catch(e){
            res.status(400).json({
                status:"Failure",
                message:"there is no task at this id"
            });
        }
    });
    app.delete("/v1/tasks/:id",async(req,res)=>{
       try{ Task.deleteOne({"id": req.params.id})
       res.json({
        status:"success"
    });
    }
       catch(e){
        res.status(400).json({
            status:"Failure",
            message:"there is no task at this id"
        });
       }
    })
    app.put("/v1/tasks/:id",async(req,res)=>{
        try{
            // const tasks = await Task.find({"id":req.params.id});
            // const newUser = new User({ id, name, currentClass, division });
            // //       await newUser.save();
            // //       res.json(newUser);
            Task.findOneAndUpdate(    // <-- new method
      { "id": req.params.id },
      { $set: {
        title: req.body.title,
        _is_Completed: req.body._is_Completed
      }})
      res.json({status:"Success"})
    }
        catch(e){
            console.log(e.message);
            res.json({
                message:e.message,
                status:"Failure"
            })
        }
    })

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;

//-----------------------------------------------------------------
// const userSchema = new mongoose.Schema({
//     id: { type: Number, required: true },
//     name: { type: String, required: true },
//     currentClass: { type: Number, required: true },
//     division: { type: String, required: true },
//   });
  
//   // app.get("/users", (req, res) => {
//   //   res.json();
//   // });
  
//   app.get("/users", async (req, res)=>{
//       try{
//           const student = await User.find()
//           return res.status(200).json({students : student})
//       }catch(e){
//           return res.status(400).json({
//               message:e.message
//           });
//       }
//   })
//   app.post("/users", async (req, res) => {
//     const { id, name, currentClass, division } = req.body;
  
//     // Validate request body
//     if (!id || !name || !currentClass || !division) {
//       return res.status(400).json({ error: 'Invalid request body' });
//     }
  
//     try {
//       // Create a new User document
//       const newUser = new User({ id, name, currentClass, division });
//       await newUser.save();
//       res.json(newUser);
//     } catch (error) {
//       console.error('Error creating new user:', error);
//       res.status(500).json({ error: 'Error creating new user' });
//     }
//   });
  