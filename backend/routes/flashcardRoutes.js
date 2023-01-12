const express = require('express');
const router = express.Router();
const {
    getFlashcardsLists, 
    setFlashcardsList, 
    getFlashcardsList, 
    updateFlashcardsList, 
    deleteFlashcardsList, 
    generateFlashCards
} = require('../controllers/flashcardsListController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getFlashcardsLists).post(protect, setFlashcardsList)
router.route('/:id').delete(protect, deleteFlashcardsList).put(protect, updateFlashcardsList).get(protect, getFlashcardsList)

router.post('/generate', protect, generateFlashCards)

module.exports = router