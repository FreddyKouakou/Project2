const express = require("express")
const app = express()


app.get("/getUser", (req, res)=>{ 
console.log("The user")
});





app.set("port", (process.env.PORT || 8000))
app.listen(app.get("port"), ()=>{
    console.log("Connected on port ", app.get("port"))
})