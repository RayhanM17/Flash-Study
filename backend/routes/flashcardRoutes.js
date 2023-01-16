const express = require('express')
const router = express.Router({mergeParams: true})
const {getFlashcards, addFlashcard, deleteFlashcard, updateFlashcard, generateFlashcards} = require('../controllers/flashcardController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getFlashcards).post(protect, addFlashcard)

router.route('/:id').delete(protect, deleteFlashcard).put(protect, updateFlashcard)

router.route('/generate').post(protect, generateFlashcards)

module.exports = router