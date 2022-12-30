const express = require('express');
const router = express.Router();
const {
    getFlashCards, 
    setFlashCard, 
    updateFlashCard, 
    deleteFlashCard, 
    generateFlashCards
} = require('../controllers/flashcardController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getFlashCards).post(protect, setFlashCard)
router.route('/:id').delete(protect, deleteFlashCard).put(protect, updateFlashCard)

router.post('/generate', protect, generateFlashCards)

module.exports = router