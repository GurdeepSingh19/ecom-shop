const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const secretKey = "ecom@2023";

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecom",
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if (err){
            return res.json(err);
        }
        if (data.length > 0) {
            let user = data[0];
            const token = jwt.sign({ "id": user.no, "email": user.email, "name": user.name, "is_admin": user.admin }, secretKey, { expiresIn: '1h' });
            let query = 'INSERT INTO sessions (token, user_id) VALUES (?,?)';
            db.query(query, [token, user.no], (err, data) => {
                if (err)
                    return res.status(500).json({ error: 'Login failed' });
                return res.json({ "token" : token, "user" : { "no": user.no, "email": user.email, "name": user.name, "role": user.admin } });
            });
        }
        else {
            return res.json("No Record")
        }
    })
})

// Middleware to authenticate requests
const authenticate = (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(401).json({ message: 'Unauthorized' });
    const tokenParts = req.headers.authorization.split(' ');
	const token = tokenParts[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err)
            return res.status(401).json({ message: 'Invalid token' });
        req.user = decoded;
        const sql = "SELECT * FROM sessions WHERE token = ? AND user_id = ?";
        db.query(sql, [token, decoded.id], (err, data) => {
            if (err)
                return res.json("Error");
            if (data.length == 0)
                return res.status(401).json({ message: 'Invalid token' });
        })
        next();
    });
};

// Registration endpoint
app.post('/register', (req, res) => {
    const { name, phoneNumber, address, email, password } = req.body;
    const sql = 'INSERT INTO login (name, phoneNumber, address, email, password) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, phoneNumber, address, email, password], (err, data) => {
        if (err) {
            console.error('Registration error:', err);
            return res.status(500).json({ error: 'Registration failed' });
        }
        console.log('Registration successful');
        res.status(200).json(data.data);
    });
});

//Product List
app.get('/getProducts', authenticate, async (req, res) => {
    // Assuming you have a 'products' table in your database
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching products error:', err);
            return res.status(500).json({ error: 'Error fetching products' });
        }
        console.log('product fetch');
        res.status(200).json(data);
    });

});

// Update product endpoint
app.post('/updateProduct', authenticate, (req, res) => {
    const { sku, name, description, price } = req.body;
    // Update the product in the database
    const sql = 'UPDATE products SET name=?, description=?, price=? WHERE sku=?';
    db.query(sql, [name, description, price, sku], (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else if (result.affectedRows > 0) {
            res.json({ success: true, message: 'Product updated successfully' });

        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    });
});

app.listen(8081, () => {
    console.log("Listening Port 8081...")
})