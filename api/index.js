const express=require('express');
const cors = require('cors');
const routerApi=require('./routes');
const app=express();
//const port=3000;
const port= process.env.PORT || 4000;
//const port=4000;

const {logErrors, errorHandler, boomErrorHandler} = require('./middleweres/error.handler')

app.use(express.json());

const whitelist=['http://127.0.0.1:5500', 'http://localhost:8080', 'https://myapp.co'];
const options={
  origin:function (origin,callback){
    if(whitelist.includes(origin)
      !== -1){
      callback(null,true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
  app.use(cors(options));


app.get('/api',(req,res)=>{
  res.send('Hola mi server en express');
});
app.get('/api/nueva-ruta',(req,res)=>{
  res.send('Hola, soy una nueva ruta');
});
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port,()=>{
  console.log('Mi port'+port);
});
