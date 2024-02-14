const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require ('mongoose')
const cors = require ('cors')

const {Restaurant,Users} = require('./schema.cjs')

const app = express()
app.use(bodyparser.json())
app.use(cors())

//connect to database
async function connecttoDb(){
    try{
        await mongoose.connect('mongodb+srv://Ragunadevi:ragunadevir_1310@cluster0.q5mmgmc.mongodb.net/Restaurant?retryWrites=true&w=majority')
        const port =process.env.PORT || 8000
        app.listen(port,function(){
            console.log(`Listening to ${port}`)
        })
        console.log("connected")
    }
    catch(error){
          console.log("can't connect")
    }
}
connecttoDb()


// to add the data
app.post('/addRestaurant',async function(request,response){
    try{
          await Restaurant.create({ 
            "area" : request.body.area,
            "avgRating" : request.body.avgRating,
            "costfortwo" : request.body.costfortwo,
            "cuisines" : request.body.cuisines,
            "name" : request.body.name
          })
          console.log('added')
          response.json({
            "status" : "added"
          })
    }
    catch(error){
         console.log('not added')
         response.json({
            "status" : "not added"
          })
    }
})

//fetch the data
app.get('/fetchData',async function(request,response){
    try {
     const user=await Restaurant.find()
     console.log(user)
     response.json(user)
    }
    catch(error){
        response.json({
            "status" :"Unable to fetch"
        })
    }
})


//delete the data
app.delete('deleteData/:id',async function(request,response){
    try{
       const deleted = await Restaurant.findById(request.params.id)
        if(deleted){
            await Restaurant.findOneAndReplace(request.params.id)
            response.status(200).json({
                "status" :"Deletion success"
            })
        }
        else{
            response.status(404).json({
                "status" : "failure"
            })
        }
    }
    catch(error){
        response.status(500).json({
            "status" : "The file is not deleted"
        })  
    }
})

// sign in (or) to create new user
app.post('/sign-up',async function(request,response){
    try{
          await Users.create({
            "userName" : request.body.username,
            "email"  :  request.body.email,
            "password" : request.body.password,
            "contact" : request.body.contact
          })
          console.log("user created")
          response.status(201).json({
            "status" :"succesfully entered"
          })
        }
        catch(error){
            response.status(500).json({
                "status" :"user not created",
                "error" :error
            })
        }
})

//login the existing user
app.post('/login',async function(request,response){
    try{
        const user = await Users.findOne({
            "email" : request.body.email,
            "password" :request.body.password
        })  
        if(user){
            response.json({
                "status" :"valid"
            })
            console.log("ok ")
        }
        else{
            console.log("Please enter the fields ")
            response.json({
                "status" :"In valid"
            })
        }
    }
    catch(error){
         response.status(200).json({
            "status" : "user not created"
         })
         console.log('user not created')
    }
})
