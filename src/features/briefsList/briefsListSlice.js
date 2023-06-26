import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchBriefs = createAsyncThunk('brief/fetchBriefs', async ({ currentPage: page, itemsPerPage: size }) => {
    const response = await fetch(`https://marketing-stage.technodom.kz/api/v2/technodom/brief/briefs?page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Y29udGVudF9zZXJ2aWNlX2FjY291bnQ6aDRyZDJyM20zbWIzcnA0c3N3MHJk',
        },
    })

    return await response.json();
})

export const getFilteredBriefs = createAsyncThunk('briefs/getFilteredBriefs', async ({
                                                                                         queryString,
                                                                                         currentPage: page,
                                                                                         itemsPerPage: size
                                                                                     }) => {
    const response = await fetch(`https://marketing-stage.technodom.kz/api/v2/technodom/brief/briefs${queryString}&page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Y29udGVudF9zZXJ2aWNlX2FjY291bnQ6aDRyZDJyM20zbWIzcnA0c3N3MHJk',
        },
    })

    return await response.json();
})

const initialState = {
    briefs: [],
    totalCount: 0,
    pages: 0,
    status: 'idle',
}

export const briefsListSlice = createSlice({
    name: 'briefsList',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchBriefs.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchBriefs.fulfilled, (state, { payload }) => {
                state.status = 'done';
                state.briefs = payload.items;
                state.totalCount = payload.total;
                state.pages = payload.pages;
            })
            .addCase(fetchBriefs.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(getFilteredBriefs.fulfilled, (state, { payload }) => {
                state.status = 'done';
                state.briefs = payload.items;
                state.totalCount = payload.total;
                state.pages = payload.pages;
            })
    },
})

export default briefsListSlice.reducer;
