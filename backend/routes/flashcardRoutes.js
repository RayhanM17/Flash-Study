const express = require('express');
const router = express.Router();
const {
    getFlashCards, 
    setFlashCard, 
    updateFlashCard, 
    deleteFlashCard, 
    generateFlashCards
} = require('../controllers/flashcardController')

router.route('/').get(getFlashCards).post(setFlashCard)
router.route('/:id').delete(deleteFlashCard).put(updateFlashCard)

router.post('/generate', generateFlashCards)

module.exports = router