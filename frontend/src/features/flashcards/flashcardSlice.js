import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import flashcardService from './flashcardService'

const initialState = {
    flashcards: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Create new flashcard
export const createFlashcard = createAsyncThunk('flashcards/create', async (flashcardData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await flashcardService.createFlashcard(flashcardData, token)
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

// Get user goals
export const getFlashcards = createAsyncThunk('flashcards/getAll', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await flashcardService.getFlashcards(token)
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
    }
})

export const {reset} = flashcardSlice.actions
export default flashcardSlice.reducer