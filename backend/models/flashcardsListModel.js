const mongoose = require('mongoose')

const flashcardsListSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        list_name: {
            type: String,
            required: true
        },
        flashcards: [
            {
                frontText: {
                    type: String,
                    required: [true, 'Please add a text value to the front of the flashcard']
                },
                backText: {
                    type: String,
                    required: [true, 'Please add a text value to the back of the flashcard']
                }
            }
        ]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('FlashcardsList', flashcardsListSchema)