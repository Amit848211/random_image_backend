const http =require("http")
const express =require("express")
const axios =require("axios")
const sharp =require("sharp")
const fs =require("fs")

const app =express()
app.use(express.json())

 const category = "nature";
const PORT = 4000;


app.get("/api/random/image/:category",async (req,res)=>{
    try {
        //  const {category} =req.params;
        //   console.log(category);

        const result =await axios.get("https://api.api-ninjas.com/v1/randomimage?category="+category,{
            Headers:{
                'X-Api-Key':"fXXsWE08i979zEEnOwNCWg==S6e064pUdgrTp8Nh",
                'Accept':'image/jpg'
            },
            responseType:'arraybuffer'
        })
        console.log(result.data);
    
        const resizedImageBuffer = await sharp(result.data).resize({width:350,height:300}).toBuffer();
    
        res.setHeader('Content-Type','image/jpg');
        res.send(resizedImageBuffer)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }


})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})