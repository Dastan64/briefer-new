import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../features/data/dataSlice';
import briefReducer from '../features/brief/briefSlice';

export const store = configureStore({
    reducer: {
        data: dataReducer,
        brief: briefReducer,
    },
});
