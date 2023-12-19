const express = require("express");
const connectDB = require("./db/db");
const cors = require('cors');
const app = express();
const posts = require("./routes/postRoutes");
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser')

const {notFound,errorHandler} = require('./middleware/errorMiddleware')

require("dotenv").config();


app.use(cors());

app.get("/", (req, res) => {
  res.send("this the blog website");
});

/*The express.json() middleware in Express.js is used to parse incoming requests with JSON payloads. 
When a client sends data to the server using the HTTP request body, the data is often sent in JSON format. 
The express.json() middleware is responsible for parsing this JSON data and populating the req.body object 
with the parsed data.*/
app.use(express.json()); 
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use("/api/users",userRoutes)
app.use(notFound)
app.use(errorHandler)
app.use("/api/v1/posts", posts);//used to mount the routes to the specified path

const port = process.env.port || 3000;

if(process.env.NODE_ENV == "production"){
  app.use(express.static("react/dist"));
  
}

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("server is listening on ", port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();


