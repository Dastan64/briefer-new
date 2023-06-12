import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    title: '',
    client: '',
    period: [],
    deadline: '',
    orderer: '',
    category: '',
    subcategory: '',
    vendor: '',
    budget: null,
    description: '',
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {},
})

export default formSlice.reducer;
