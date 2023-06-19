import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

export const fetchBriefTasks = createAsyncThunk('brief/fetchBriefTasks', async (id) => {
    const response = await fetch(`https://marketing-stage.technodom.kz/api/v2/technodom/brief/${id}/tasks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Y29udGVudF9zZXJ2aWNlX2FjY291bnQ6aDRyZDJyM20zbWIzcnA0c3N3MHJk',
        },
    })
    return await response.json();
})

const initialState = {
    timeToCreate: 0,
    data: null,
    requiredFormData: [],
    sections: [],
    status: 'idle',
}

export const briefSlice = createSlice({
    name: 'brief',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchBriefTasks.pending, (state) => {
            state.status = 'pending';
        }).addCase(fetchBriefTasks.fulfilled, (state, { payload }) => {
            state.status = 'done';
            state.data = payload;
            state.timeToCreate = payload.time_to_create;

            state.requiredFormData = Object.entries(payload).reduce((acc, [key, value]) => {
                if (key === 'date_start' || key === 'date_end') {
                    acc.push({ period: value });
                } else if (key !== 'uuid' && key !== 'data') {
                    acc.push({ [key]: value });
                }
                return acc;
            }, []);

        }).addCase(fetchBriefTasks.rejected, (state) => {
            state.status = 'failed';
        })
    }
})

export default briefSlice.reducer;
