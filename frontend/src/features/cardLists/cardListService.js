import axios from 'axios'

const API_URL = '/api/cardlists/'

// Create new card list
const createCardList = async (cardListData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, cardListData, config)

    return response.data
}

// get user card lists
const getCardLists = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// get user card list
const getCardList = async (cardListId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + cardListId, config)

    return response.data
}

// update user card list
const updateCardList = async (cardListId, cardListData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + cardListId, cardListData, config)

    return response.data
}

const cardListService = {
    createCardList,
    getCardLists,
    getCardList,
    updateCardList
}

export default cardListService