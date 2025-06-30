const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// POST /signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hash}
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {expiresIn: '1h'});

    res.status(201).json({ token });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  // TODO: Handle login (check user, compare password, return JWT)
  const { email, password } = req.body;

  try {
    
    const user = await prisma.user.findUnique({
      where: {email: email}
    })

    if (!user) {
      res.status(401).json({ message: 'Invalid Email' });
    }

    const pass = bcrypt.compare(password, user.password);

    if (!pass) {
      res.status(401).json({ message: 'Invalid Password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {expiresIn: '1h'});
    
    res.status(201).json({ token });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
