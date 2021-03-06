var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    db         = require('./config/db_config'),
    Contato    = require('./models/contatos');


app.use(bodyParser());

var port = process.env.PORT || 8080;
var router = express.Router();

// rota principal
router.get('/',function(request, response){
    response.json({ message:'API NodeJs - bpaolo'});
});

//rotas de contatos
router.route('/contatos')
    //endpoint: listar todos os contatos
    .get(function(request , response){
        Contato.find(function(err, rows){
            if(err){
                response.send(err);
            }
            response.json(rows);
        })
    })

    //endpoint: cadastrar contatos
    .post(function(request , response){
        var model = new Contato();
        model.nome = request.body.nome;
        model.save(function(err){
            if(err){
                response.send(err);
            }
            response.json({messagem:'Contato cadastrado com sucesso'});
        })
    })

//registro para as rotas da api
app.use('/api', router);

// start no servidor
app.listen(port, function(){
    console.log('servidor rodando na porta '+ port);
});
