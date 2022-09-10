var express = require("express");
var app = express();
var router = require("./app/router/router.js")
//middleware
app.use(router)
app.use(express.static("./frontend/public"))

app.set("port",process.env.PORT||8080)
app.listen(app.get("port"),()=>{
    console.log("el servidor se esta ejecutando en el puerto " + app.get("port"))
})




