---
to: models/<%= h.changeCase.paramCase(name) %>-model.js
unless_exists: true
---
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const <%= name %> = new Schema(
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

module.exports = mongoose.model('<%= h.changeCase.paramCase(name) %>', <%= name %>);





