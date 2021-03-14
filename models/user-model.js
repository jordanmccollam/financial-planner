const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: { type: String, required: true, unique: true },
        theme: { type: String, required: true },
        currentSheet: { type: String, required: false },
        sheets: { type: [String], required: true },
        monthlyEarnings: { type: Number, required: false },
        expenses: [{ type: Schema.Types.ObjectId, ref: "expense" }],
    },
    { timestamps: true },
);

module.exports = mongoose.model('user', User);