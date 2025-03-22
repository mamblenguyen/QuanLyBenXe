// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
   
  },
});

// Định nghĩa kiểu RootState từ store
export type RootState = ReturnType<typeof store.getState>;
