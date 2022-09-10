const sql = require('mssql')
const sqlConfig = {
  user: 'SA',
  password: 'Alexis123',
  database:'proyecto',
  server: '127.0.0.1',
  port:1433

}
async () => {
     // make sure that any items are correctly URL encoded in the connection string
     await sql.connect(sqlConfig)
    
   }
module.exports =sql;