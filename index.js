const PORT = 8000;
const axios=require("axios").default;
const express=require("express");
const cors=require("cors");
const app=express();
require('dotenv').config()
app.use(cors())
app.get('/word',(req,res)=>{
    const axios = require("axios");
    const options = {
    method: 'GET',
    url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
    params: {count: '5', wordLength: '5'},
    headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
    }
    };

    axios.request(options).then(function (response) {
        res.json(response.data[0]);
    }).catch(function (error) {
        console.error(error);
    });
})

app.listen(PORT, () => console.log(`Server running on port = ` + PORT));