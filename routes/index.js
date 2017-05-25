var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Image Scrabble Game' });
});

router.get('/about', function(req, res, next){
  res.render('about', {"msg":"Hola Mundo!!!"});
}
);

router.get('/signup', function(req,res,next){
  res.render('register',{"txtEmail":"","msg":""});
});

var usersRegistered = [];

router.post('/signup',function(req,res,next){
  console.log(req.body);
    usersRegistered.push(req.body.txtEmail);
    // Para que conozcan map funcion de un arreglo
    //var msgs = usersRegistered.map(function(item,i){return item}).join("|");
    //var msgs = usersRegistered.join("|");
    var msgs = usersRegistered;
    var rtObject = {}; // {"txtEmail": req.body.txtEmail, "msg":msgs};
    rtObject.txtEmail = req.body.txtEmail;
    rtObject.msg= msgs;
  res.render('register', rtObject);
});

router.get('/api/usuarios', function(req,res,next){
  var usuarios = [
                {"user":"admin","rol":["admin","public"]},
                {"user":"any","rol":["public"]},
              ];
  res.json(usuarios);

});

module.exports = router;
