const asyncHandler = require('express-async-handler')
const Flashcard = require('../models/flashcardModel')

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY,});
const openai = new OpenAIApi(configuration);

// @desc Get flashcards
// @route GET /api/flashcards
// @access Private
const getFlashCards = asyncHandler(async (req, res) => {
    const flashcards = await Flashcard.find()

    res.status(200).json(flashcards)
})

// @desc Set flashcard
// @route POST /api/flashcards
// @access Private
const setFlashCard = asyncHandler(async (req, res) => {
    if (!req.body.frontText || !req.body.backText) {
        res.status(400)
        throw new Error('Please fill all fields')
    }
    const flashcard = await Flashcard.create({
        frontText: req.body.frontText,
        backText: req.body.backText
    })

    res.status(200).json(flashcard)
})

// @desc Update flashcards
// @route PUT /api/flashcards/:id
// @access Private
const updateFlashCard = asyncHandler(async (req, res) => {
    const flashcard = await Flashcard.findById(req.params.id)

    if(!flashcard) {
        res.status(400)
        throw new Error('Flashcard not found')
    }

    const updatedFlashcard = await Flashcard.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedFlashcard)
})

// @desc Delete flashcard
// @ route DELETE /api/flashcards/:id
// @access Private
const deleteFlashCard = asyncHandler(async (req, res) => {
    const flashcard = await Flashcard.findById(req.params.id)

    if(!flashcard) {
        res.status(400)
        throw new Error('Flashcard not found')
    }

    await flashcard.remove()

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
            const flashcard = await Flashcard.create({
                frontText: front[i],
                backText: back[i]
            })
            list.push(flashcard)
        }
    }

    res.status(200).json(list)
})

module.exports = {
    getFlashCards,
    setFlashCard,
    updateFlashCard,
    deleteFlashCard,
    generateFlashCards
}