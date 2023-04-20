import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

// export const fetchBriefTasks = createAsyncThunk('brief/fetchBriefTasks', async () => {
//     const response = await fetch(`https://marketing.technodom.kz/api/v1/promo_brief_constructor/briefs`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Basic Y29udGVudF9zZXJ2aWNlX2FjY291bnQ6aDRyZDJyM20zbWIzcnA0c3N3MHJk',
//         },
//     })
//
//     return await response.json();
// })

const initialState = {
    briefs: [
        {
            id: 1,
            name: 'Длинное название какого-то брифа Tefal',
            category: 'Category 1',
            startDate: 1644528000000 // Timestamp for February 12, 2022
        },
        {
            id: 2,
            name: 'Длинное название какого-то брифа Samsung',
            category: 'Category 2',
            startDate: 1645209600000 // Timestamp for February 19, 2022
        },
        {
            id: 3,
            name: 'Длинное название какого-то брифа Apple',
            category: 'Category 3',
            startDate: 1645910400000 // Timestamp for February 28, 2022
        }, {
            id: 4,
            name: 'Длинное название какого-то брифа Garmin',
            category: 'Category 4',
            startDate: 1645910400000 // Timestamp for February 28, 2022
        },
    ],
    status: 'idle',
}

export const briefsListSlice = createSlice({
    name: 'briefsList',
    initialState,
    reducers: {},
})

export default briefsListSlice.reducer;
