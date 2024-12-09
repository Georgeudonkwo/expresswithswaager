const express=require('express')
const {_,dbconnection}=require('./models/mongoose-setup.js');
const Router=require('./routes/index.js')
const swagger=require('./routes/swagger/setup.js');
const PORT=process.env.PORT||3000;
const app=express();


app.use(express.json());
swagger(app);

dbconnection.then(()=>{
    console.log("successfully connected to the database!")
}).catch(()=>console.log('fail to connect to the database'));
app.use('/',Router);
app.listen(PORT,()=>{
    console.log(`server listening at port:${PORT}`)
})