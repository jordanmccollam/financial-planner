const Expense = require('../models/expense-model');
const User = require('../models/user-model');

createExpense = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an expense'
        })
    }

    const expense = new Expense(body);

    if (!expense) {
        return res.status(400).json({ success: false, error: err })
    }

    expense.save().then(() => {

        User.findOne({ _id: body.user }, (err, User) => {
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'User not found!',
                })
            }
            User.expenses.push(expense._id)
            User
                .save()
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        output: User,
                        message: 'User updated!',
                    })
                })
                .catch(error => {
                    return res.status(404).json({
                        error,
                        message: 'User not updated!',
                    })
                })
        })

        return res.status(201).json({
            success: true,
            output: expense,
            message: 'Expense created!',
        })
    }).catch(error => {
        return res.status(400).json({
            error,
            message: 'Expense not created!',
        })
    })
}

updateExpense = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Expense.findOne({ _id: req.params.id }, (err, expense) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Expense not found!',
            })
        }
        expense.date = body.date
        // expense.time = body.time
        expense.content = body.content
        expense
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    output: expense,
                    message: 'Expense updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Expense not updated!',
                })
            })
    })
}

deleteExpense = async (req, res) => {
    await Expense.findOneAndDelete({ _id: req.params.id }, (err, expense) => {
        if (!err) {
            return res.status(200).json({ success: true, output: req.params.id });
        } else {
            return res.status(400).json({ success: false, error: err });
        }
    }).catch(err => console.log(err))
}

getExpense = async (req, res) => {
    await Expense.findOne({ _id: req.params.id }, (err, expense) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!expense) {
            return res
                .status(404)
                .json({ success: false, error: `Expense not found` })
        }
        return res.status(200).json({ success: true, output: expense })
    }).catch(err => console.log(err))
}

getExpenses = async (req, res) => {
    await Expense.find({}, (err, expenses) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!expenses.length) {
            return res
                .status(404)
                .json({ success: false, error: `Expense not found` })
        }
        return res.status(200).json({ success: true, output: expenses })
    }).catch(err => console.log(err))
}

module.exports = {
    createExpense,
    updateExpense,
    deleteExpense,
    getExpenses,
    getExpense,
}