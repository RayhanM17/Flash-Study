import axios from 'axios'

const API_URL = 'api/flashcards/'

// Create new flashcard
const createFlashcard = async (flashcardData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, flashcardData, config)

    return response.data
}

// Get user flashcards
const getFlashcards = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete user flashcard
const deleteFlashcard = async (flashcardId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + flashcardId, config)

    return response.data
}

// Update user flashcard
const updateFlashcard = async (flashcardId, flashcardData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + flashcardId, flashcardData, config)

    return response.data
}

const flashcardService = {
    createFlashcard,
    getFlashcards,
    deleteFlashcard,
    updateFlashcard
}

export default flashcardService