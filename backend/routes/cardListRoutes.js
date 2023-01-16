const express = require('express')
const router = express.Router()
const { getCardLists, getCardList, createCardList, deleteCardList, updateCardList} = require('../controllers/cardListController')

const {protect} = require('../middleware/authMiddleware')

// Re-route into flashcard router
const flashcardRouter = require('./flashcardRoutes')
router.use('/:cardListId/flashcards', flashcardRouter)

router.route('/').get(protect, getCardLists).post(protect, createCardList)

router.route('/:id').get(protect, getCardList).delete(protect, deleteCardList).put(protect, updateCardList)

module.exports = router