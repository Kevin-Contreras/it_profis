var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var jsonParser = bodyParser.json()
var sqlServer =  new (require("rest-mssql-nodejs"))({
    user:"SA",
    password:"Alexis123",
    server:"localhost",
    database:"proyecto"
})
var id =0;
const connectionString = "server=localhost; user:SA;password: Alexis123 ;Database=proyecto;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
router.get("/",function(req,res,next){
res.send("<h1>HOLA</h1>")
})
router.post("/login",jsonParser,async function(req,res,next){
    console.log(req.body)
    const resultados = await sqlServer.executeQuery('insert into viaje (tipo_carga,encargado,carro,inicio,final) values (@tipo_carga,@encargado,@carro,@inicio,@final)',
    [
    
    {name:"tipo_carga",type:"char",value:req.body.carga},
    {name:"encargado",type:"char",value:req.body.conductor},
    {name:"carro",type:"char",value: req.body.vehiculo},
    {name:"inicio",type:"char",value:req.body.inicio},
    {name:"final",type:"char",value: req.body.final}])
    console.log(resultados)
    console.log(req.body.pass)
    const resultados2 = await sqlServer.executeQuery("delete from vehiculo where id = "+"'"+parseInt( req.body.vehiculo)+"'")
    console.log(resultados2)
    const resultados3 = await sqlServer.executeQuery("delete from piloto where nombre = "+"'"+req.body.conductor+"'")
 

    
})



router.post("/actualizar/:ida",jsonParser, async function(req,res,next){
    console.log(req.params.ida.slice(1))
    console.log("hola")
    const resultados = await sqlServer.executeQuery("UPDATE piloto SET numero = "+"'"+req.body.telefono+"', viaticos = "+"'"+req.body.viaticos+"', gastos_adicionales = '"+ req.body.adicionales+"' WHERE id = '"+ req.params.ida.slice(1)+"'")
   
    console.log(resultados)
})
router.post("/actualizar2/:id",jsonParser, async function(req,res,next){
    console.log(req.params.id.slice(1))
    console.log("hola")
    const resultados4 = await sqlServer.executeQuery("UPDATE vehiculo SET capacidad = "+"'"+req.body.capacidad+"', combustible = "+"'"+req.body.combustible+"', recorrido = '"+ req.body.recorrido+"' WHERE id = '"+ req.params.id.slice(1)+"'")
   
    console.log(resultados4)
})
router.get("/mostar",jsonParser, async function(req,res,next){
      
      const  re = await sqlServer.executeQuery('select * from piloto')
      console.log(re.data)
        res.json(re.data[0])
            

        
   
})
router.get("/mostrarCarro",jsonParser, function(req,res,next){
      
    sqlServer.executeQuery('select * from vehiculo').then(function(dato){
          res.json(dato.data[0])
      });
      
      
})
router.get("/viaje",jsonParser, function(req,res,next){
      
    sqlServer.executeQuery('select * from viaje').then(function(dato){
          res.json(dato.data[0])
            console.log(dato.data[0])
      });
      
})


router.post("/carros",jsonParser,async function(req,res,next){
    console.log("hola")
    const resultados = await sqlServer.executeQuery('INSERT INTO vehiculo (capacidad,combustible,recorrido,inicio,final) values (@capacidad,@combustible,@recorrido,@inicio,@final)',
    [
    
    {name:"capacidad",type:"int",value:parseInt(req.body.capacidad)},
    {name:"combustible",type:"int",value:parseInt( req.body.combustible)},
    {name:"recorrido",type:"int",value:parseInt( req.body.recorrido)},
    {name:"inicio",type:"char",value:null},
    {name:"final",type:"char",value:null}])
    console.log(resultados)  

})
router.post("/piloto", jsonParser,async function(req,res,next){
    console.log( req.body.telefono)
    console.log("kkk")
    const resultado = await sqlServer.executeQuery('INSERT INTO piloto (nombre,numero,viaticos,gastos_adicionales,inicio,final) values (@nombre,@numero,@viaticos,@gastos_adicionales,@inicio,@final)',
    [
    {name:"nombre",type:"char", value:req.body.nombre},
    {name:"numero",type:"int", value:parseInt( req.body.telefono)},
    {name:"viaticos",type:"char",value:req.body.viaticos},
    {name:"gastos_adicionales",type:"char",value:req.body.adicionales},
    {name:"inicio",type:"char",value:null},
    {name:"final",type:"char",value:null}
]
    )
    })
module.exports = router;
