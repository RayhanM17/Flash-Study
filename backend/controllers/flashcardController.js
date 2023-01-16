const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const CardList = require('../models/cardListModel')
const Flashcard = require('../models/flashcardModel')

const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY,})
const openai = new OpenAIApi(configuration)

// @desc Get flashcards for a Card List
// @route GET /api/cardlists/:cardListId/flashcards
// @access Private
const getFlashcards = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const cardList = await CardList.findById(req.params.cardListId)

    if(cardList.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const flashcards = await Flashcard.find({cardList: req.params.cardListId})

    res.status(200).json(flashcards)
})

// @desc Create flashcard for a Card List
// @route POST /api/cardlists/:cardListId/flashcards
// @access Private
const addFlashcard = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const cardList = await CardList.findById(req.params.cardListId)

    if(cardList.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const flashcard = await Flashcard.create({
        frontText: req.body.frontText,
        backText: req.body.backText,
        cardList: req.params.cardListId,
        user: req.user.id
    })

    res.status(200).json(flashcard)
})

// @desc delete flashcard for a Card List
// @route DELETE /api/cardlists/:cardListId/flashcards/:id
// @access Private
const deleteFlashcard = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const cardList = await CardList.findById(req.params.cardListId)

    if(cardList.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const flashcard = await Flashcard.findById(req.params.id)

    if(!flashcard) {
        res.status(404)
        throw new Error('Flashcard not found')
    }

    if(flashcard.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await flashcard.remove()

    res.status(200).json({success: true})
})

// @desc update flashcard for a Card List
// @route PUT /api/cardlists/:cardListId/flashcards/:id
// @access Private
const updateFlashcard = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const cardList = await CardList.findById(req.params.cardListId)

    if(cardList.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const flashcard = await Flashcard.findById(req.params.id)

    if(!flashcard) {
        res.status(404)
        throw new Error('Flashcard not found')
    }

    if(flashcard.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedFlashcard = await Flashcard.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedFlashcard)
})

// @desc Generate flashcards for a Card List
// @route POST /api/cardlists/:cardListId/flashcards/generate
// @access Private
const generateFlashcards = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const cardList = await CardList.findById(req.params.cardListId)

    if(cardList.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    if(!req.body.subject || req.body.subject === '') {
        res.status(400)
        throw new Error('Please enter a subject')
    }

    const prompt = `Create a list of 10 terms and defenitions seperated by a colon on the subject of ${req.body.subject}`

    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt,
        n: 1,
        max_tokens: 500
    });

    if(!response) {
        res.status(400)
        throw new Error('List could not be generated')
    }

    const text = response.data.choices[0].text

    let list = []

    let termRe = /(\n){1,2}([^:]*)/g
    let defRe = /:([^\n]*)\n/g

    let front = text.match(termRe)
    let back = text.match(defRe)

    if(back === null || front === null){
        res.status(400)
        throw new Error('List could not be generated')
    }

    back = back.map((item) => (
        item.replace(/[:]|[.]|[\n]/g, "")
    ))
    front = front.map((item) => (
        item.replace(/[\n]|[\d]|[.]|[)]/g, "")
    ))

    for(let i = 0; i < front.length; i++) {

        if(typeof front[i] == "string" && typeof back[i] == "string"){
            const flashcard = await Flashcard.create({
                frontText: front[i],
                backText: back[i],
                cardList: req.params.cardListId,
                user: req.user.id
            })
            list.push(flashcard)
        }
    }

    res.status(200).json(list)
})

module.exports = {
    getFlashcards,
    addFlashcard,
    deleteFlashcard,
    updateFlashcard,
    generateFlashcards
}