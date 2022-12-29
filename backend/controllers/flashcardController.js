const asyncHandler = require('express-async-handler')

// @desc Get flashcards
// @route GET /api/flashcards
// @access Private
const getFlashCards = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'get flashcards'})
})

// @desc Set flashcard
// @route POST /api/flashcards
// @access Private
const setFlashCard = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({message: 'Set flashcard'})
})

// @desc Update flashcards
// @route PUT /api/flashcards/:id
// @access Private
const updateFlashCard = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update flashcard ${req.params.id}`})
})

// @desc Delete flashcard
// @ route DELETE /api/flashcards/:id
// @access Private
const deleteFlashCard = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete flashcard ${req.params.id}`})
})

// @desc Generate flashcards
// @route POST /api/flashcards/generate
// @access Private
const generateFlashCards = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Generate flashcards'})
})

module.exports = {
    getFlashCards,
    setFlashCard,
    updateFlashCard,
    deleteFlashCard,
    generateFlashCards
}