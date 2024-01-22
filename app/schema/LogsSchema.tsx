const mongoose = require('mongoose')

const LogsSchema = new mongoose.Schema({

    alias: {
        type: String,
        required: true
    },
  
    role: {
        type: String,
        enum: ['assistant', 'system', 'user']
    },

    content: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    }

})
module.exports = mongoose.models.Logs || mongoose.model('Logs', LogsSchema, 'Logs')