const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth'); // JWT middleware

const prisma = new PrismaClient();

// GET /feedback - Get feedback for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const feedbacks = await prisma.feedback.findMany({
      where: { userId },
    });

    res.json(feedbacks);
  } catch (err) {
    console.error('GET /feedback error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /feedback - Submit feedback for logged-in user
router.post('/', authMiddleware, async (req, res) => {
  const { message } = req.body;
  const userId = req.user.userId;

  if (!message) {
    return res.status(400).json({ message: 'Feedback message is required' });
  }

  try {
    const feedback = await prisma.feedback.create({
      data: {
        message,
        userId,
      },
    });

    res.status(201).json(feedback);
  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(500).json({ message: 'Failed to save feedback' });
  }
});

module.exports = router;
