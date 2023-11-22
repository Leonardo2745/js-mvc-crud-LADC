const express = require('express');


const app = express()


const server = {
   on: ()=> { 
    
app.use(bodyParse.json());
app.use(bodyParse.urlecoded({extended: true}))    
app.use(express.static("/"));

const port = process.env.PORT || 7000;

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`)
    
    });
},
};

export {server}