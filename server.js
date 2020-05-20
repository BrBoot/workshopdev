//Usando o express para criar e configurar o servidor
const express = require("express")
const server = express()

const db = require("./db")

//configurar arquivos estáticos (css, scrips, imagens)
server.use(express.static("public"))

// Habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

//configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
  express: server,
  noCache: true,
})

//configurando as rotas
server.get("/", function(req, res) {

  db.all(`SELECT * FROM ideas`, function(err, rows){
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }    

    const reversedIdeas = [...rows].reverse()

    let lastIdeas = []
    for (let idea of reversedIdeas) {
      if(lastIdeas.length < 2) {
        lastIdeas.push(idea)
      }
    }  
      return res.render("index.html", { ideas: lastIdeas })
  })

})

server.get("/ideias", function(req, res){
  db.all(`SELECT * FROM ideas`, function(err, rows){
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    } 
    const reversedIdeas = [...rows].reverse()

    return res.render("ideias.html", { ideas: reversedIdeas })

  })
  
})

// Recebendo os dados do formulário
server.post("/", function(req, res) {
  // Inserir dados na tabela
  const query = `
    INSERT INTO ideas(
      image,
      title,
      category,
      description,
      link
    ) VALUES (?,?,?,?,?);
`
const values = [
  req.body.image,
  req.body.title,
  req.body.category,
  req.body.description,
  req.body.link,
]
  db.run(query, values, function(err) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }
    return res.redirect("/ideias")
  })
})

server.get('/deletar/:id', function(req, res){
  db.run(`DELETE FROM ideas WHERE id = ?`, [req.params.id], function(err) {
    if (err) return console.log(err)    
  })
  return res.redirect("/ideias")
})


//A porta onde o servidor irá ouvir, poderia ser qualquer outra
server.listen(3000)