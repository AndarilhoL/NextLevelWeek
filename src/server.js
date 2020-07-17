const express = require("express");
const server = express();

//Pegar o Banco de Dados
const db = require("./database/db.js")

//configurar pasta public
server.use(express.static("public"));

//Habilitar uso do red Body na aplicação
server.use(express.urlencoded({ extended: true }));


//Utilizando template engines
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

//configurar rotas da aplicação
//Página Inicial
//req: requisição
//res: resposta
server.get("/", (req, res) => {
    return res.render("index.html")
});

server.get("/create-point", (req, res) => {

    //req.query: Query Strings de uma URL
    console.log(req.query);



    return res.render("create-point.html")
});


server.post("/savepoint", (req, res) => {

    //Inserir Dados no banco de Dados
    //Inserir dados na Tabele
    const query = `
                INSERT INTO places (
                    image,
                    name,
                    address,
                    address2,
                    state,
                    city,
                    items
                ) VALUES (?,?,?,?,?,?,?);
            `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err);
        }

        console.log("cadastrado com sucesso");
        console.log(this);

        return res.render("create-point.html",{saved:true})
    }

    db.run(query, values, afterInsertData);
})



server.get("/search", (req, res) => {

    const search = req.query.search;

    if(search == ""){

        //Pesquisa Vazia
        return res.render("search-results.html", { total: 0 })
    }

    //Pegar os dados do banco
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err);
        }

        const total = rows.length;

        console.log("Aqui estão seus registros:")
        console.log(rows);

        //Mostrar Página HTML com dados do Banco
        return res.render("search-results.html", { places: rows, total: total })
    })
});


//Ligar Servidor
server.listen(3000);