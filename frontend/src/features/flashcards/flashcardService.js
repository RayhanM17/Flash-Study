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

const flashcardService = {
    getFlashcards,
    createFlashcard
}

export default flashcardService