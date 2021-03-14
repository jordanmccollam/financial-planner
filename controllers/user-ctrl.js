const User = require('../models/user-model');

getUser = async (req, res) => {
    await User.findOne({ email: req.params.email }).populate('expense').exec((err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        } else {
            return res.status(200).json({ success: true, output: user });
        }
    })
}

createUser = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an user'
        })
    }

    const user = new User({...body, theme: 'theme--light'});

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user.save().then(() => {
        return res.status(201).json({
            success: true,
            output: user,
            message: 'User created!',
        })
    }).catch(error => {
        return res.status(400).json({
            error,
            message: 'User not created!',
        })
    })
}

updateUser = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ _id: req.params.id }, (err, User) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        User.theme = body.theme ? body.theme : User.theme;
        User.currentSheet = body.currentSheet ? body.currentSheet : User.currentSheet;
        User.monthlyEarnings = body.monthlyEarnings ? body.monthlyEarnings : User.monthlyEarnings;
        User.expenses = body.expenses ? body.expenses : User.expenses;
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
}

module.exports = {
    getUser,
    createUser,
    updateUser
}