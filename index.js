require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
var bcrypt = require('bcrypt');
const passport = require('passport');
const saltRounds = 10;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//determine a user is on session Authentication//
app.use(
  session({
    secret: 'iodhdhshdsvd',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render('/');
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
    'SELECT id, name, price, poster, description, type, sellers_id FROM products WHERE id = ?',
    [req.params.id],
    (error, rows) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.json(rows);
    }
  );
});

//stripe payment
app.post('/stripe/charge', cors(), async (req, res) => {
  var name = req.body.fullName;
  var email = req.body.email;
  var phone = req.body.phone;
  console.log(name, email, phone);

  console.log('stripe-routes.js 9 | route reached', req.body);

  let { amount, id, customer } = req.body;
  console.log('stripe-routes.js 10 | amount and id', amount, id);
  try {
    const payment = await stripe.charges.create({
      customer,
      amount,
      currency: 'kes',
      description: 'Nguosasa Stripe Shop',

      name,
      email,
      phone,
    });
    console.log('stripe-routes.js 19 | payment', payment);
    res.json({
      message: 'Payment Successful',
      success: true,
    });
  } catch (error) {
    console.log('Payment Failed stripe-routes.js 17 | error', error);
    res.json({
      message: 'Payment Failed',
      success: false,
    });
  }
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

// Updating records

app.put('/api/products/:id', (req, res) => {
  const { name, price, description, type, poster, sellers_id } = req.body;

  if (!name || !price || !description || !type || !poster || !sellers_id) {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  pool.query(
    'UPDATE products SET name = ?, price = ?, description = ?, type = ?, poster = ?, sellers_id = ? WHERE id = ?',
    [name, price, description, type, poster, sellers_id, req.params.id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }

      res.json(results.changedRows);
    }
  );
});

//deleting a product
app.delete('/api/products/:id', (req, res) => {
  pool.query(
    'DELETE FROM products WHERE id = ?',
    [req.params.id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }

      res.json(results.affectedRows);
    }
  );
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

//getting Sellers details
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

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/Login'));
});

//get customers
app.get('/api/customers', (req, res) => {
  pool.query('SELECT * FROM customers', (error, rows) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json(rows);
  });
});

//login authentication
app.post('/auth', function (request, res) {
  var username = request.body.username;
  var password = request.body.password;
  if (username) {
    pool.query(
      'SELECT password FROM customers WHERE username = ?',
      [username],
      function (error, results, fields) {
        if (error) throw error;

        if (results.length > 0) {
          const hash = results[0].password;

          bcrypt.compare(password, hash, function (err, response) {
            if (err) throw err;
            console.log(response, password, hash);
            if (response === true) {
              return res.redirect('/');
            } else {
              return res.redirect('/Login2');
            }
          });
        } else {
          res.redirect('/Login2');
        }
      }
    );
  } else {
    res.send('Please enter Username and Password!');
  }
});

//sign up authentication
app.post('/authreg', (request, response) => {
  var name = request.body.Fullname;
  var username = request.body.Username;
  var address = request.body.Address;
  var password = request.body.Password;
  var cpassword = request.body.Cpassword;
  var telephone = request.body.Telephone;
  var email = request.body.Email;

  if (password != cpassword) {
    return response.status(400).json({ error: 'Password Not Matching' });
  }

  if (!name || !username || !address || !password || !telephone || !email) {
    return response.status(400).json({ error: 'Invalid payload' });
  }

  if (email) {
    pool.query('SELECT * FROM customers WHERE email = ?', [email], function (
      error,
      results,

      fields
    ) {
      if (results.length > 0) {
        return response.status(400).json({ error: 'Email already Exists' });
      } else {
        bcrypt.hash(password, saltRounds, function (error, hash) {
          pool.query(
            'INSERT INTO customers (name, username, address, password, telephone, email) VALUES (?,?,?,?,?,?)',
            [name, username, address, hash, telephone, email],
            (error) => {
              if (error) {
                return connection.rollback(() => {
                  response.status(500).json({ error });
                  response.redirect('/Signup');
                });
              }

              pool.query('SELECT LAST_INSERT_ID() as user_id', function (
                error,
                results,
                fields
              ) {
                if (error) throw error;
                const user_id = results[0];
                console.log(results[0]);
                request.login(user_id, function (err) {
                  response.redirect('/');
                });
              });
            }
          );
        });
      }
    });
  }
});

passport.serializeUser(function (user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function (user_id, done) {
  done(null, user_id);
});

// getting from orders
app.post('/api/orders', (req, res) => {
  const { order_id, name, email, amount, address, phone } = req.body;
  if (!order_id || !name || !email || !amount || !address || !phone) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  pool.getConnection((error, connection) => {
    if (error) {
      return res.status(500).json({ error });
    }

    connection.query(
      'INSERT INTO orders (order_id, name, email, amount, address, phone) VALUES (?,?,?,?,?,?)',
      [order_id, name, email, amount, address, phone],
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

//admin login authentication//

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
