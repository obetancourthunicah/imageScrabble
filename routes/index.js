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

// RESTful API --> HTTP(S) , POST(Insert), GET(Select), PUT(Update), DELETE(Delete)
  //        Se manipulan a partir de la URL, Sin estado.

  /// Image Scrabble Adminsitración
  // Diccionario - > Palabras -> Ponderacion

  var Diccionario = {
                      "rookie":[],
                      "junior":[],
                      "senior":[],
                      "master":[],
                      "deity":[]
                    };

  var palabraTemplate = {
                          "word":"",
                          "word_length":0,
                          "weight":1,
                          "context":""
                        };

    router.get('/api/dictionary/:dictionaryKey', function(req,res,next){
      var _dictionaryKey = req.params.dictionaryKey;
      res.json(Diccionario[_dictionaryKey]);
    });

    router.post('/api/dictionary/:dictionaryKey/new', function(req,res,next){
      // asumimos que el req.body contiene cada variables igual al objeto plantilla
      var newWord = Object.assign({},palabraTemplate,req.body);
      /*
      var newOldWay = {};
      newOldWay.word = req.body.word;
      newOldWay.wieght = req.body.weight;
      newOldWay.context = req.body.context;
      newOldWay.word_length =  newOldWay.word.length;
       */
       newWord.word_length = newWord.word.length;
       Diccionario[req.params.dictionaryKey].push(newWord);
       res.status(200).json(Diccionario[req.params.dictionaryKey]);
    });

module.exports = router;
