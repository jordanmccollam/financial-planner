const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Expense = new Schema(
    {
        label: { type: String, required: true },
        amount: { type: Number, required: true },
        autopay: { type: Boolean, required: true },
        estimated: { type: Boolean, required: true },
        repeat: { type: Number, required: true },
        date: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "user" },
    },
    { timestamps: true },
);

module.exports = mongoose.model('expense', Expense);





