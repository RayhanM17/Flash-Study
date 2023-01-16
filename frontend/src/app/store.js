import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import cardListReducer from '../features/cardLists/cardListSlice';
import flashcardReducer from '../features/flashcards/flashcardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cardLists: cardListReducer,
    flashcards: flashcardReducer
  },
});
