const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./workshopdev.db')

db.serialize(function() {

  // Criar tabela
  db.run(
    `CREATE TABLE IF NOT EXISTS ideas(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      title TEXT,
      category TEXT,
      description TEXT,
      link TEXT
    );
  `)

  // Inserir dados na tabela
  //const query = `
  //INSERT INTO ideas(
    //image,
    //title,
    //category,
    //description,
    //link
  //) VALUES (?,?,?,?,?);
//`
//const values = [
  //"https://image.flaticon.com/icons/svg/2729/2729007.svg",
  //"Cursos de Programação",
  //"Estudo",
  //"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus placeat enim eveniet quam esse, non corrupti fuga! Alias nisi accusantium omnis dolor, nulla ab dolorem blanditiis, quae, porro architecto voluptate.",
  //"https://google.com"
//]
  //db.run(query, values, function(err) {
    //if (err) return console.log(err)

    //console.log(this)
  //})

  // Deletar um dado da tabela
  //db.run(`DELETE FROM ideas WHERE id = ?`, [8], function(err){
    //if (err) return console.log(err)

    //console.log("DELETADO", this)
  //})

  // Consultar dados na tabela
  //db.all(`SELECT * FROM ideas`, function(err, rows){
    //if (err) return console.log(err)    

    //console.log(rows)
  //})

  
})

module.exports = db