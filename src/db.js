const mysql = require('promise-mysql');
const db = require('./dbinfo')

const config = {
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database,
    connectionLimit: db.connectionLimit
};

console.log(config)

const pool = mysql.createPool(config);

let query = async (query) => {
    let poolCon = await pool
    let result = await poolCon.query(query)
    //console.log(dbres)
    return result
}
//query("select * from matches")
// let res = async (val) => {
//     let res = await val
//     let dbres = await res.query("SELECT * FROM matches")
//     console.log(dbres)
// }
// res(pool)
//console.log(pool)
module.exports = query;
