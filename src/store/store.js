import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../features/data/dataSlice';
import briefReducer from '../features/brief/briefSlice';
import briefsListReducer from '../features/briefsList/briefsListSlice';

export const store = configureStore({
    reducer: {
        data: dataReducer,
        brief: briefReducer,
        briefsList: briefsListReducer,
    },
});
