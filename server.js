
var http = require('http'),
	express  = require('express'),
	bodyParser   = require('body-parser');

var multer = require('multer'); 
const pg    = require('pg');

pg.defaults.ssl = true;
var conString = "postgres://mopjgzwmuynkoa:4abd71c0fd07038e4d8138535a8137fb36f353f279c8e397d850e150d110be5a@ec2-54-235-68-3.compute-1.amazonaws.com:5432/d59s89afknvaip";

var express = require('express');
var http = require('http'),
    formidable = require('formidable'),
    util = require('util'),
    fs   = require('fs-extra');
function permitirCrossDomain(req, res, next) {
  //en vez de * se puede definir SÓLO los orígenes que permitimos
  res.header('Access-Control-Allow-Origin', '*'); 
  //metodos http permitidos para CORS
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));
app.use(permitirCrossDomain);


app.get('/listarUsuarios', (req, res, next) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM usuario', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            client.end();
            return res.json(result.rows);   
        }); 
    });
});

app.get('/listarRecorridos', (req, res, next) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM recorridos', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            client.end();
            return res.json(result.rows);   
        }); 
    });
});
app.get('/listarEquipos', (req, res, next) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM equipos', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});
app.get('/listarUsuariosxEquipo', (req, res, next) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM usuariosxequipo', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.post('/listarUsuarioMail', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query("SELECT * FROM usuario WHERE mail='"+ req.body.mail +"';", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
           
        });      
    });
});
app.post('/listarEquipoId/:id', (req, res) => {
    var client = new pg.Client(conString);
    var id=req.params.id;
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('SELECT * FROM equipos WHERE idequipo='+ id +';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
           
        });      
    });
});
app.post('/listarEquipoPorNombre', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query("SELECT idequipo FROM equipos WHERE nombre='"+ req.body.nombre +"';", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
           
        });      
    });
});
app.post('/listarUsuariosxEquipoId', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('SELECT * FROM usuariosxequipo WHERE idusuario='+ req.body.idusuario +';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
           
        });      
    });
});
app.post('/guardarUsuario', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        console.log("Gorun "+util.inspect(req,false,null));
        
        client.query("INSERT INTO  usuario  (mail ,  pass ,  nombre , rol , celular) VALUES ('"+req.body.mail+"', '"+req.body.pass+"', '"+req.body.nombre+"', '"+req.body.rol+"', '"+req.body.celular+"');", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);   
        });   
    });
});
app.post('/guardarEquipo', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        console.log("Gorun "+util.inspect(req,false,null));
        
        client.query("INSERT INTO  equipos  (identrenador, nombre ,  detalle ) VALUES ('"+req.body.identrenador+"', '"+req.body.nombre+"', '"+req.body.detalle+"');", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);   
        });   
    });
});
app.post('/guardarUsuarioEnEquipo', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        console.log("Gorun "+util.inspect(req,false,null));
        
        client.query("INSERT INTO  usuariosxequipo  (idequipo ,  idusuario ) VALUES ('"+req.body.idequipo+"', '"+req.body.idusuario+"');", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);   
        });   
    });
});

app.post('/guardarRecorrido', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        console.log("Gorun "+util.inspect(req,false,null));
        
        client.query("INSERT INTO recorridos (idusuario ,  fecha , tiempo , distancia ) VALUES ('"+req.body.idusuario+"', '"+req.body.fecha+"', '"+req.body.tiempo+"', '"+req.body.distancia+"');", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);   
        });   
    });
});

app.get('/', function(req, res) {
    res.sendfile('index.html');
});

console.log("Servidor iniciado");
    // escuchar
    app.listen(process.env.PORT || 8080, function(){console.log("the server is running");});

