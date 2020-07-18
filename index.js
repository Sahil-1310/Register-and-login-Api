const express = require('express');
const app =express();
const mongoose =require('mongoose');
const dotenv = require('dotenv');
const cors =require('cors');
app.use(cors());


//Import Routes
const authRoute=require('./routes/auth');





dotenv.config();
//connect mongobd
mongoose.connect(
     process.env.DB_CONNECT,

{ useNewUrlParser: true ,useUnifiedTopology:true},
()=>console.log('connected to db'));  



/*//Connect to DB
mongoose.connect('mongodb+srv://sohal:sahil@cluster0-krkux.mongodb.net/<dbname>?retryWrites=true',
{ useNewUrlParser: true,useUnifiedTopology:true },
()=>console.log('connected to db')
);*/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

app.get('/',(req,res)=>{
    res.send("KIDA FER")
});
app.use(express.json());

//Routes Middleware
app.use('/api/user',authRoute);



app.listen(4500,()=> console.log('Server up and running'));