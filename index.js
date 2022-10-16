const express = require('express');
const app = express();
const port = 3000;

//Parts store
const parts =[
    {id: 100,name:'Belt',colour:'brown'},
    {id: 101,name:'Clip',colour:'brown'},
    {id: 102,name:'Belt',colour:'red'},
    {id: 103,name:'Hat',colour:'purple'},
];

//setup seving front-end code
app.use('/', express.static('static'));

//get list of parts
app.get('/api/parts',(req,res)=>{
    console.log(`GET request for ${req.url}`);
    res.send(parts);
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});