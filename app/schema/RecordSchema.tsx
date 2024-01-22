const mongoose = require('mongoose')

const RecordSchema = new mongoose.Schema({

    alias: {
        type: String,
        required: true
    },

    messages: {
        type: Number,
        default: 0
    }

})

module.exports = mongoose.models.Record || mongoose.model('Record', RecordSchema, 'Records')