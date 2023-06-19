import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchBriefs = createAsyncThunk('brief/fetchBriefs', async () => {
    const response = await fetch(`https://marketing-stage.technodom.kz/api/v2/technodom/brief/briefs?page=1`, {
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
            })
            .addCase(fetchBriefs.rejected, (state, { payload }) => {
                state.status = 'failed';
            })
    },
})

export default briefsListSlice.reducer;
