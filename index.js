const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();

//Parts store
const parts =[
    {id: 100,name:'Belt',colour:'brown', stock: 0},
    {id: 101,name:'Clip',colour:'brown',stock: 0},
    {id: 102,name:'Belt',colour:'red',stock: 0},
    {id: 103,name:'Hat',colour:'purple',stock: 0},
];

//setup seving front-end code
app.use('/', express.static('static'));

//setup middleware to do logging
app.use((req,res,next) =>{ //for all routes
    console.log(`${req.method} request for ${req.url}`);
    next();//keep going
});

//parse data in body as JSON
router.use(express.json());

//get list of parts
router.get('/',(req,res)=>{
    res.send(parts);
});

//get details for a given part
router.get('/:part_id',(req,res)=>{
    const id = req.params.part_id;
    const part = parts.find(p => p.id === parseInt(id));
    if(part){
        res.send(part);
    }
    else{
        res.status(404).send(`Part ${id} was not found!`);
    }
});

//create/replace part data for a given ID
router.put('/:id',(req,res) =>{
    const newpart = req.body;
    console.log("Part: ",newpart);
    
    //add id field
    newpart.id = parseInt(req.params.id);

    //replace part with new one
    const part = parts.findIndex(p => p.id === parseInt(newpart.id));
    if(part <0 ){
    console.log('Creating new part');
    parts.push(newpart);
    }
    else{
        console.log('Modifying part ',req.params.id);
        parts[part] = newpart;
    }
    res.send(newpart);
});


//update stock level
router.post('/:id',(req,res)=>{
    const newpart = req.body;
    console.log("Part: ",newpart);
    
    
    //find the part
    const part = parts.findIndex(p => p.id === parseInt(req.params.id));
    if(part <0 ){//not dound
    res.status(404).send(`Part ${req.params.id} not found`);
    }
    else{
        console.log('changing stock for ',req.params.id);
        parts[part].stock += parseInt(req.body.stock); //stock property must exist
        res.send(req.body);
    }
    
});

//install the router at /api/parts
app.use('/api/parts',router);

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});