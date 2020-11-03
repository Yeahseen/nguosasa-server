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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    'SELECT id, name, price, poster, description, type, sellers_id type FROM products WHERE id = ?',
    [req.params.id],
    (error, rows) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.json(rows);
    }
  );
});

//add new product
app.post('/api/products', (req, res) => {
  const { name, price, description, type, poster, sellers_id } = req.body;

  if (!name || !price || !description || !type || !poster || !sellers_id) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  pool.getConnection((error, connection) => {
    if (error) {
      return res.status(500).json({ error });
    }

    connection.query(
      'INSERT INTO products (name,price,description,type,poster,sellers_id) VALUES (?,?,?,?,?,?)',
      [name, price, description, type, poster, sellers_id],
      (error, results) => {
        if (error) {
          return connection.rollback(() => {
            res.status(500).json({ error });
          });
        }

        const insertId = results.insertId;

        res.json(insertId);
      }
    );
  });
});

//Sellers query table
app.get('/api/sellers', (req, res) => {
  pool.query('SELECT id, name, phone, stallno FROM sellers', (error, rows) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json(rows);
  });
});
// adding a seller in admin
app.post('/api/sellers', (req, res) => {
  const { name, stallno, phone } = req.body;

  if (!name || !stallno || !phone) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  pool.getConnection((error, connection) => {
    if (error) {
      return res.status(500).json({ error });
    }

    connection.query(
      'INSERT INTO sellers (name,stallno,phone) VALUES (?,?,?)',
      [name, stallno, phone],
      (error, results) => {
        if (error) {
          return connection.rollback(() => {
            res.status(500).json({ error });
          });
        }

        const insertId = results.insertId;

        res.json(insertId);
      }
    );
  });
});

app.get('/api/sellers/:id', (req, res) => {
  pool.query(
    'SELECT id, name, phone, stallno FROM sellers WHERE id = ?',
    [req.params.id],
    (error, rows) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.json(rows);
    }
  );
});

// deleting a seller
app.delete('/api/sellers/:id', (req, res) => {
  pool.query(
    'DELETE FROM sellers WHERE id = ?',
    [req.params.id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }

      res.json(results.affectedRows);
    }
  );
});

//determine a user is on session//
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/Login'));
});
//sign up

//login authentication
app.post('/auth', function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    pool.query(
      'SELECT * FROM customers WHERE username = ? AND password = ?',
      [username, password],
      function (error, results, fields) {
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

app.get('/Adminlogin', function (request, response) {
  response.sendFile(path.join(__dirname + '/Adminlogin'));
});

app.post('/authAdmin', function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    pool.query(
      'SELECT * FROM admin WHERE username = ? AND password = ?',
      [username, password],
      function (error, results, fields) {
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
