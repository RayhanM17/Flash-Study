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

// Delete user list flashcard
export const deleteFlashcard = createAsyncThunk('flashcards/delete', async({cardListId, flashcardId}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await flashcardService.deleteFlashcard(cardListId, flashcardId, token)
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

// Update user list flashcard
export const updateFlashcard = createAsyncThunk('flashcards/update', async({id, flashcard}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await flashcardService.updateFlashcard(id, flashcard, token)
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

// Generate user list flashcards
export const genFlashcards = createAsyncThunk('flashcards/generate', async({id, subject}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await flashcardService.genFlashcards(id, subject, token)
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
            .addCase(deleteFlashcard.fulfilled, (state, action) => {
                state.isSuccess = true
                state.flashcards = state.flashcards.filter(
                    (flashcard) => flashcard._id !== action.payload.id
                )
                state.message = 'Card Deleted'
            })
            .addCase(deleteFlashcard.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateFlashcard.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateFlashcard.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.flashcards = state.flashcards.map(
                    (flashcard) => (flashcard._id === action.payload._id ? {...flashcard, ...action.payload} : flashcard)
                )
            })
            .addCase(updateFlashcard.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(genFlashcards.pending, (state) => {
                state.isLoading = true
            })
            .addCase(genFlashcards.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.flashcards = state.flashcards = [...state.flashcards, ...action.payload]
            })
            .addCase(genFlashcards.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = flashcardSlice.actions
export default flashcardSlice.reducer