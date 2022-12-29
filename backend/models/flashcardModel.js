const mongoose = require('mongoose')

const flashcardSchema = mongoose.Schema(
    {
        frontText: {
            type: String,
            required: [true, 'Please add a text value to the front of the flashcard']
        },
        backText: {
            type: String,
            required: [true, 'Please add a text value to the back of the flashcard']
        }
    }, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Flashcard', flashcardSchema)