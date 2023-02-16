import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

export const fetchBriefTasks = createAsyncThunk('brief/fetchBriefTasks', async (id) => {
    const response = await fetch(`https://marketing-stage.technodom.kz/api/v1/promo_brief_constructor/${id}/tasks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Y29udGVudF9zZXJ2aWNlX2FjY291bnQ6aDRyZDJyM20zbWIzcnA0c3N3MHJk',
        },
    })

    return await response.json();
})

const initialState = {
    tasks: [],
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
            state.tasks = payload.data;
            state.status = 'done';
            state.sections = state.tasks.reduce((acc, curr) => {
                if (curr.parentSection.toLowerCase().includes('вводная информация')) {
                    return acc;
                }
                curr.isDisabled = true;
                curr.id = nanoid();
                const { parentSection, parentSubsection, ...rest } = curr;
                const sectionIndex = acc.findIndex(section => section.sectionTitle === parentSection);
                if (sectionIndex === -1) {
                    acc.push({
                        sectionTitle: parentSection,
                        id: nanoid(),
                        isDisabled: true,
                        subsections: [{ subsectionTitle: parentSubsection, id: nanoid(), tasks: [rest] }]
                    });
                } else {
                    const subsectionIndex = acc[sectionIndex].subsections.findIndex(subsection => subsection.subsectionTitle === parentSubsection);
                    if (subsectionIndex === -1) {
                        acc[sectionIndex].subsections.push({
                            subsectionTitle: parentSubsection,
                            id: nanoid(),
                            tasks: [rest]
                        });
                    } else {
                        acc[sectionIndex].subsections[subsectionIndex].tasks.push(rest);
                    }
                }
                return acc;
            }, []).map(section => {
                return {
                    ...section,
                    required: section.subsections.every(ss => ss.tasks.every(task => task.value.toLowerCase() !== 'не требуется'))
                }
            });

        }).addCase(fetchBriefTasks.rejected, (state) => {
            state.status = 'failed';
        })
    }
})

export default briefSlice.reducer;
