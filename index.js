const PORT=8000
const axios=require("axios").default
const express=require("express")
const cors=require("cors")
const app=express()
app.use(cors())
app.get('/word',(req,res)=>{
    const axios = require("axios");
    app.listen(PORT,()=>{
        console.log('Server running on port '+PORT);
    })
    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
        params: {count: '5', wordLength: '5'},
        headers: {
            'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
            'X-RapidAPI-Key': 'c4df6b35f8msh4539e6ec83dbc21p1f0b62jsnc2526e2e784e'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
})
