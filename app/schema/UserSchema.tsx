const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    chatbots: [{
        alias: {
            type: String,
            required: true
        },
        interactions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Logs'
        }]
    }]

});



module.exports = mongoose.models.Users || mongoose.model('Users', userSchema, 'Users')