---
to: controllers/<%= h.changeCase.paramCase(name) %>-ctrl.js
unless_exists: true
---
const <%= name %> = require('../models/<%= name %>-model');

get<%= name %> = async (req, res) => {
    await <%= name %>.findOne({ email: req.params.email }).exec((err, <%= name %>) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        } else {
            return res.status(200).json({ success: true, output: <%= name %> });
        }
    })
}

create<%= name %> = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an <%= name %>'
        })
    }

    const <%= name %> = new <%= name %>({...body, theme: 'theme--light'});

    if (!<%= name %>) {
        return res.status(400).json({ success: false, error: err })
    }

    <%= name %>.save().then(() => {
        return res.status(201).json({
            success: true,
            output: <%= name %>,
            message: '<%= name %> created!',
        })
    }).catch(error => {
        return res.status(400).json({
            error,
            message: '<%= name %> not created!',
        })
    })
}

update<%= name %> = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    <%= name %>.findOne({ _id: req.params.id }, (err, <%= name %>) => {
        if (err) {
            return res.status(404).json({
                err,
                message: '<%= name %> not found!',
            })
        }
        <%= name %>.theme = body.theme
        // <%= name %>.time = body.time
        <%= name %>
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    output: <%= name %>,
                    message: '<%= name %> updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: '<%= name %> not updated!',
                })
            })
    })
}

module.exports = {
    get<%= name %>,
    create<%= name %>,
    update<%= name %>
}





