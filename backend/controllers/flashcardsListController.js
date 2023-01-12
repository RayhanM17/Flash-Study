const asyncHandler = require('express-async-handler')

const FlashcardsList = require('../models/flashcardsListModel')
const User = require('../models/userModel')

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY,});
const openai = new OpenAIApi(configuration);

// @desc Get flashcards Lists
// @route GET /api/flashcards
// @access Private
const getFlashcardsLists = asyncHandler(async (req, res) => {
    const flashcardsLists = await FlashcardsList.find({ user: req.user.id })

    res.status(200).json(flashcardsLists)
})

// @desc Set flashcards list
// @route POST /api/flashcards
// @access Private
const setFlashcardsList = asyncHandler(async (req, res) => {
    if (!req.body.list_name) {
        res.status(400)
        throw new Error('Please add a title')
    }

    if(req.body.flashcards.length < 1) {
        res.status(400)
        throw new Error('Flashcards list must contain at least one flashcard')
    }

    for (let card of req.body.flashcards) {
        if (!card.frontText || !card.backText) {
            res.status(400)
            throw new Error('All flashcards must contain front & back text')
        }
    }

    const flashcardsList = await FlashcardsList.create({
        list_name: req.body.list_name,
        flashcards: req.body.flashcards,
        user: req.user.id
    })

    res.status(200).json(flashcardsList)
})

// @desc Get flashcards List
// @route GET /api/flashcards:id
// @access Private
const getFlashcardsList = asyncHandler(async (req, res) => {
    const flashcardsList = await FlashcardsList.findById(req.params.id)

    if(!flashcardsList) {
        res.status(400)
        throw new Error('Flashcards List not found')
    }

    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the flashcard user
    if(flashcardsList.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    res.status(200).json(flashcardsList)
})

// @desc Update flashcards list
// @route PUT /api/flashcards/:id
// @access Private
const updateFlashcardsList = asyncHandler(async (req, res) => {
    const flashcardsList = await FlashcardsList.findById(req.params.id)

    if(!flashcardsList) {
        res.status(400)
        throw new Error('Flashcards List not found')
    }

    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the flashcard user
    if(flashcardsList.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedFlashcardsList = await FlashcardsList.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedFlashcardsList)
})

// @ desc Delete flashcards list
// @ route DELETE /api/flashcards/:id
// @ access Private
const deleteFlashcardsList = asyncHandler(async (req, res) => {
    const flashcardsList = await FlashcardsList.findById(req.params.id)

    if(!flashcardsList) {
        res.status(400)
        throw new Error('Flashcards List not found')
    }

    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the flashcard user
    if(flashcardsList.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await flashcardsList.remove()

    res.status(200).json({ id: req.params.id })
})



// @desc Generate flashcards
// @route POST /api/flashcards/generate
// @access Private
const generateFlashCards = asyncHandler(async (req, res) => {
    const prompt = `Create a list of 10 terms and defenitions seperated by a colon on the subject of ${req.body.subject}`;

    if(!prompt) {
        res.status(400)
        throw new Error('Please enter a subject')
    }

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
            list.push(flashcard)
        }
    }

    res.status(200).json(list)
})

module.exports = {
    getFlashcardsLists,
    setFlashcardsList,
    getFlashcardsList,
    updateFlashcardsList,
    deleteFlashcardsList,
    generateFlashCards
}