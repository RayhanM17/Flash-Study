import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import flashcardService from './flashcardService'

const initialState = {
    flashcards: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Get user flashcards
export const getFlashcards = createAsyncThunk('flashcards/getAll', async(cardListId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await flashcardService.getFlashcards(cardListId, token)
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

// Create user list flashcard
export const createFlashcard = createAsyncThunk('flashcards/create', async(formData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await flashcardService.createFlashcard(formData.id, formData.flashcard, token)
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

export const flashcardSlice = createSlice({
    name: 'flashcard',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFlashcards.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getFlashcards.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.flashcards = action.payload
            })
            .addCase(getFlashcards.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createFlashcard.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createFlashcard.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.flashcards.push(action.payload)
            })
            .addCase(createFlashcard.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = flashcardSlice.actions
export default flashcardSlice.reducer