const swaggerui=require('swagger-ui-express');
const swaggerdocs=require('swagger-jsdoc');
const path=require('path');
const fs=require('fs');
const p=path.join(__dirname,'config.json');
let swaggeroption=fs.readFileSync(p);

  
let swaggerSpec=swaggerdocs(JSON.parse(swaggeroption));
module.exports=(app)=>{
    app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerSpec));
}
