require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware')
var cors = require('cors')



const app = express()

const PORT = process.env.PORT || 4000
const MONGO_URL = process.env.MONGO_URL
const FRONTEND = process.env.FRONTEND

var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended: false}))



//routes
app.use('/api/products', productRoute);

app.get('/api/resource', async (req, res, next) => {
    try {
      const product = await someAsyncFunction();
      res.json(data);
    } catch (error) {
      next(error);
    }
  });


app.post('/product',async(req,res) =>{
  try {
    const product = await Product.create(req.body)
  res.status(200).jason(product);
    
  } catch (error) {
      console.log(error.message);
      res.status(500).json({message:error.message})
  } 
  
})


app.get('/', (req, res) =>{
    res.send('Hie Node API')
})
app.get('/blog', (req, res) =>{
    res.send('Hie blog, My name is Nalenhle')
})

app.use(errorMiddleware);


mongoose.
connect(MONGO_URL)
.then(() => {
    console.log('connected to MongoDB')
    app.listen(PORT, ()=> {
        console.log(`Node API app is running on port ${PORT}`)
    });
}).catch((error) => {
    console.log(error)
})