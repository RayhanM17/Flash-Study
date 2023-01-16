import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import cardListService from './cardListService'

const initialState = {
    cardLists: [],
    cardList: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new card List
export const createCardList = createAsyncThunk('cardlists/create', async (cardListData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await cardListService.createCardList(cardListData, token)
    } catch (error) {
        const message = 
            (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get user cards Lists
export const getCardLists = createAsyncThunk('cardlists/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await cardListService.getCardLists(token)
    } catch (error) {
        const message = 
            (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get user cards List
export const getCardList = createAsyncThunk('cardlists/get', async (cardListId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await cardListService.getCardList(cardListId, token)
    } catch (error) {
        const message = 
            (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Update Card List
export const updateCardList = createAsyncThunk('cardlists/update', async (updateData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await cardListService.updateCardList(updateData.id, updateData.list, token)
    } catch (error) {
        const message = 
            (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const cardListSlice = createSlice({
    name: 'cardList',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCardList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCardList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createCardList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getCardLists.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCardLists.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.cardLists = action.payload
            })
            .addCase(getCardLists.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getCardList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCardList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.cardList = action.payload
            })
            .addCase(getCardList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateCardList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateCardList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.cardList = action.payload
            })
            .addCase(updateCardList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = cardListSlice.actions

export default cardListSlice.reducer