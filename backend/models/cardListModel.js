const mongoose = require('mongoose')

const cardListSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true],
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    description: {
        type: String,
        required: [true, 'Please enter a description of the list']
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('CardList', cardListSchema)