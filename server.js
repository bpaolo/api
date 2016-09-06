var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    Contato    = require('./models/contatos');

//conexão com o mongoDB
mongoose.connect('mongodb://localhost/api', function(err){
    if(err){
        console.log('Erro ao conectar no mongo db :' + err);
    }
});

app.use(bodyParser());

var port = process.env.PORT || 8080;
var router = express.Router(); //

router.get('/',function(request, response){
    response.json({ message:'API NodeJs - bpaolo'});
});

//rotas de contatos
router.route('/contatos')
    .get(function(request , response){
        Contato.find(function(err, rows){
            if(err){
                response.send(err);
            }
            response.json(rows);
        })
    })

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

//registro das rotas
app.use('/api', router);

// start no servidor
app.listen(port, function(){
    console.log('servidor rodando na porta '+ port);
});
