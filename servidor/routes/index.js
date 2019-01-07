var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');

let users= fs.readFileSync('file.json')
users = JSON.parse(users)



router.get('/ping',function(req, res){
  res.send("PONG")
})

router.post('/user', function(req, res){
  res.sendFile(path.join(__dirname,'..','public','html','form.html'))
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET /users */
router.get('/users', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..','public','html','index.html'))
});

/*GET api/users (FILTRAR)*/ 
router.get('/api/users', function (req, res, next) {
    if (req.query.search == null) {
        res.json(users)
        next()
    }
    
    var matchedUsers = []
    const filter = new RegExp(req.query.search, "i")
    for (var i = 0; i < users.length; i++) {
        if ( (filter.test(users[i].name)) || (filter.test(users[i].surname)) || (filter.test(users[i].mail)) ){
            matchedUsers.push(users[i])
        }
    }

    res.json(matchedUsers)
});

/* GET user/new  (FORMULARIO)*/
router.get('/user/new', function(req, res){
  res.sendFile(path.join(__dirname,'..','public','html','form.html'))
})

/*POST api/user/new (CREAR NUEVO USUARIO) */
router.post('/api/user/new', function(req, res, next) {
  const user = req.body
  const lastId = users[users.length-1].id 
  user.id = lastId + 1
  res.send("ok")
  
  users.push(user)


  fs.writeFileSync('file.json', JSON.stringify(users))
  res.json(users)
});

/*DELETE user */
router.delete('/api/users/:id', function(req, res, next){
  const id = req.params.id;

  for(var i = 0; i < users.length; i++){
    if(users[i].id == id){
      users.splice(i, 1);
    }
  }

  fs.writeFileSync('file.json', JSON.stringify(users))
  res.send('ok')
})


/*POST api/user/:id (Modificar USUARIO) */
router.post('/api/user/:id', function(req, res, next) {
  const user = req.body
  const id = user.id

  for(var i = 0; i < users.length; i++){
    if(users[i].id == id){
      users[i] = user;
    }
  }

  fs.writeFileSync('file.json', JSON.stringify(users))
  res.send("ok")
});



module.exports = router;
