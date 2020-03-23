require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

app.get('/api/products', (req, res) => {
  pool.query(
    'SELECT id, name, price, type, poster, description, sellers_id FROM products',
    (error, rows) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.json(rows);
    }
  );
});

app.get('/api/products/:id', (req, res) => {
  pool.query(
    'SELECT id, name, price, poster, description, type FROM products WHERE id = ?',
    [req.params.id],
    (error, rows) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.json(rows);
    }
  );
});

//login authentication//
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/Login'));
});

app.post('/auth', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    pool.query(
      'SELECT * FROM customers WHERE username = ? AND password = ?',
      [username, password],
      function(error, results, fields) {
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect('/');
        } else {
          response.redirect('/Login2');
        }
        response.end();
      }
    );
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});

//admin login authentication//
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/Adminlogin', function(request, response) {
  response.sendFile(path.join(__dirname + '/Adminlogin'));
});

app.post('/authAdmin', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    pool.query(
      'SELECT * FROM admin WHERE username = ? AND password = ?',
      [username, password],
      function(error, results, fields) {
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect('/Admin001');
        } else {
          response.redirect('/Adminlogin');
        }
        response.end();
      }
    );
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});

app.listen(9000, () => console.log('App listening on port 9000'));
