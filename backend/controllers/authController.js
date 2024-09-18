const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const register = (req, res) => {
    const { name, email, senha } = req.body;
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send('Error hashing senha');
        db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).send('Error registering user');
            res.status(201).send('User registered');
        });
    });
};

const login = (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).send('Error querying user');
        if (results.length === 0) return res.status(401).send('Invalid credentials');
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).send('Error comparing passwords');
            if (!isMatch) return res.status(401).send('Invalid credentials');
            const token = jwt.sign({ id: user.id, nome: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, nome: user.name, role: user.role });
        });
    });
};

module.exports = { register, login };
