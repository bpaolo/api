var mongoose   = require('mongoose');

//conexão com o mongoDB
mongoose.connect('mongodb://localhost/api', function(err){
    if(err){
        console.log('Erro ao conectar no mongo db :' + err);
    }
});
