var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bem vindo!' });
  console.log("app inicializado e respondendo");
});

router.get('/register', function(req, res, next){
  res.render('register', {title: 'Criar conta'});
});
module.exports = router;
