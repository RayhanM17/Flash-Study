import axios from 'axios'

const API_URL = '/api/cardlists/'

// Get user flashcards
const getFlashcards = async (cardListId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + cardListId + '/flashcards', config)

    return response.data
}

// Create user list flashcard
const createFlashcard = async (cardListId, formData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(
        API_URL + cardListId + '/flashcards', formData, config
    )

    return response.data
}

// Delete user list flashcard
const deleteFlashcard = async (cardListId, flashcardId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(
        API_URL + cardListId + '/flashcards/' + flashcardId, config
    )

    return response.data
}

// Update user list flashcard
const updateFlashcard = async (cardListId, updateData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(
        API_URL + cardListId + '/flashcards/' + updateData.id, {
            frontText: updateData.frontText,
            backText: updateData.backText
        }, config
    )

    return response.data
}

// Generate user list flashcards
const genFlashcards = async (cardListId, subject, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(
        API_URL + cardListId + '/flashcards/generate', {subject}, config
    )

    return response.data
}

const flashcardService = {
    getFlashcards,
    createFlashcard,
    deleteFlashcard,
    updateFlashcard,
    genFlashcards
}

export default flashcardService