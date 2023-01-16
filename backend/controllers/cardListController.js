const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const CardList = require('../models/cardListModel')

// @desc Get user card Lists
// @route GET /api/cardlists
// @access Private
const getCardLists = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const cardLists = await CardList.find({user: req.user.id})

    res.status(200).json(cardLists)
})

// @desc Get user card List
// @route GET /api/cardlists/:id
// @access Private
const getCardList = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const cardList = await CardList.findById(req.params.id)

    if(!cardList) {
        res.status(404)
        throw new Error('Card List not found')
    }

    if(cardList.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    res.status(200).json(cardList)
})

// @desc Create card List
// @route POST /api/cardlists
// @access Private
const createCardList = asyncHandler(async (req, res) => {
    const {title, description} = req.body

    if(!title || !description) {
        res.status(400)
        throw new Error('Please add a title and description')
    }

    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const cardList = await CardList.create({
        title,
        description,
        user: req.user.id
    })

    res.status(201).json(cardList)
})

// @desc delete card List
// @route DELETE /api/cardlists/:id
// @access Private
const deleteCardList = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const cardList = await CardList.findById(req.params.id)

    if(!cardList) {
        res.status(404)
        throw new Error('Card List not found')
    }

    if(cardList.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    await cardList.remove()

    res.status(200).json({success: true})
})

// @desc update card List
// @route PUT /api/cardlists/:id
// @access Private
const updateCardList = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const cardList = await CardList.findById(req.params.id)

    if(!cardList) {
        res.status(404)
        throw new Error('Card List not found')
    }

    if(cardList.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    const updatedCardList = await CardList.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedCardList)
})

module.exports = {
    getCardLists,
    getCardList,
    createCardList,
    deleteCardList,
    updateCardList
}