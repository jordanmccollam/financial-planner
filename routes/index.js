const express = require('express');

const ExpenseCtrl = require('../controllers/expense-ctrl');
const UserCtrl = require('../controllers/user-ctrl');
const MoodCtrl = require('../controllers/mood-ctrl');

const router = express.Router();

// ENTRIES
router.post('/expense', ExpenseCtrl.createExpense);
router.put('/expense/:id', ExpenseCtrl.updateExpense);
router.delete('/expense/:id', ExpenseCtrl.deleteExpense);
router.get('/expense/:id', ExpenseCtrl.getExpense);
router.get('/expenses', ExpenseCtrl.getExpenses);


// USERS
router.get('/user/:email', UserCtrl.getUser);
router.post('/user', UserCtrl.createUser);
router.put('/user/:id', UserCtrl.updateUser);

module.exports = router;