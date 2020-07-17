//importar a dependência do SQLITE3
const sqlite3 = require("sqlite3").verbose();

//iniciar o objeto de banco de dados
//reponsável por fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

//utilizar objeto de banco de dados
//db.serialize(() => {
//    //Criar Tabelas
//    db.run(`
//        CREATE TABLE IF NOT EXISTS places (
//            id          INTEGER PRIMARY KEY AUTOINCREMENT,
//            image       TEXT,
//            name        TEXT,
//            address     TEXT,
//            address2    TEXT, 
//            state       TEXT,
//            city        TEXT,
//            items       TEXT
//        );
//    `)
//
//
//    //Inserir dados na Tabele
//    const query = `
//                    INSERT INTO places (
//                        image,
//                        name,
//                        address,
//                        address2,
//                        state,
//                        city,
//                        items
//                    ) VALUES (?,?,?,?,?,?,?);
//                `
//
//    const values = [
//        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80",
//        "Papersider",
//        "Guilherme Gemballa, Jardim América",
//        "Nº 260",
//        "Santa Catarina",
//        "Rio do Sul",
//        "Papéis e Papelão"
//    ]
//
//    function afterInsertData(err) {
//        if (err) {
//            return console.log(err);
//        }
//
//        console.log("cadastrado com sucesso");
//        console.log(this);
//    }
//
//    db.run(query, values, afterInsertData);

    //Consultar os dados

    //db.all(`SELECT * FROM places`, function(err,rows){
    //    if(err){
    //        return console.log(err);
    //    }
    //
    //    console.log("Aqui estão seus registros:")
    //    console.log(rows);
    //})
    


    //Deletar os dados

    //db.run(`DELETE FROM places where id = ?`, [1], function(err){
    //    if(err){
    //        return console.log(err)
    //    }
    //
    //    console.log("Registro deletado com sucesso !");
    //})
    
//});
