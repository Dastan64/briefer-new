import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
        const response = await fetch('https://www.technodom.kz/under/feed/brief_constructor_tasks.json');
        return await response.json();
    }
)

const initialState = {
    data: [],
    modifiedData: {
        sections: [],
    },
    brief_id: null,
    status: 'idle',
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        checkTask: (state, { payload }) => {
            return {
                ...state,
                modifiedData: {
                    sections: state.modifiedData.sections.map(section => {
                        return {
                            ...section,
                            subsections: section.subsections.map(ss => {
                                if (ss.id === payload.subsectionId) {
                                    return {
                                        ...ss,
                                        tasks: ss.tasks.map(task => {
                                            if (task.id === payload.id) {
                                                return {
                                                    ...task,
                                                    isChecked: payload.type === 'date' ? true : !task.isChecked,
                                                    value: payload?.value,
                                                }
                                            } else {
                                                if (payload.type !== 'radio') {
                                                    if (task.taskType === 'radio') {
                                                        return { ...task, isChecked: false }
                                                    } else {
                                                        return { ...task }
                                                    }
                                                } else {
                                                    return { ...task, isChecked: false }
                                                }
                                            }
                                        })
                                    }
                                } else {
                                    return { ...ss };
                                }
                            })
                        }
                    })
                }
            }
        },
        checkNegativeTasksOnToggle: (state, { payload }) => {
            return {
                ...state, modifiedData: {
                    sections: state.modifiedData.sections.map(section => {
                        if (section.id !== payload) {
                            return section;
                        }
                        return {
                            ...section,
                            subsections: section.subsections.map(ss => {
                                return {
                                    ...ss,
                                    tasks: ss.tasks.map(t => {
                                        if (t.taskType === 'radio') {
                                            return {
                                                ...t,
                                                isChecked: !t.isChecked,
                                            }
                                        } else {
                                            return {
                                                ...t,
                                                isChecked: false,
                                            };
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }
        },
        clearAllTasks: (state) => {
            return {
                ...state,
                modifiedData: {
                    sections: state.modifiedData.sections.map(section => {
                        return {
                            ...section,
                            subsections: section.subsections.map(ss => {
                                return {
                                    ...ss,
                                    tasks: ss.tasks.map(t => ({
                                        ...t,
                                        isChecked: false,
                                        value: '',
                                    }))
                                }
                            })
                        }
                    })
                }
            }
        },
        setBriefId: (state, { payload }) => {
            state.brief_id = payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchData.fulfilled, (state, { payload }) => {
                state.status = 'fulfilled';
                state.data = payload;
                state.modifiedData.sections = payload.sections.map(section => ({
                    ...section,
                    required: true,
                    id: nanoid()
                })).map(s => ({
                    ...s,
                    subsections: s.subsections.map(ss => ({
                        ...ss,
                        id: nanoid(),
                        tasks: ss.tasks.map(task => ({
                            ...task,
                            isChecked: false,
                            value: '',
                            id: nanoid(),
                            taskVariant: task.taskTitle !== 'Не требуется' ? 'positive' : 'negative'
                        }))
                    }))
                }));
            })
            .addCase(fetchData.rejected, (state) => {
                state.status = 'failed';
            })
    }
});

export const selectAllTaskSubsections = (state) => {
    const res = [];
    state.data.modifiedData.sections.slice(2).map(section => {
        return section.subsections.map(ss => res.push(ss))
    })
    return res;
}

export const selectSecondaryFormFields = (state) => {
    return state.data.modifiedData.sections[1]?.subsections[0].tasks ?? [];
}

export const selectAllCheckedTasks = (state) => {
    const res = [];
    state.data.modifiedData.sections.map(section => {
        return section.subsections.map(ss => {
            return ss.tasks.filter(task => task.isChecked).map(task => res.push(task));
        })
    })
    return res;
}

export const selectSecondaryFormDataSubsection = (state) => {
    return state.data.modifiedData.sections[1]?.subsections[0];
}

export const selectTotalTimeOfAllTasks = (state) => {
    return state.data.modifiedData.sections.slice(2).map(item => {
        return item.subsections.map(ss => {
            return ss.tasks.filter(task => task.isChecked).reduce((acc, current) => acc + Number(current.taskTimeToCreate.toString().replace(/,/g, '.')) || 0, 0);
        }).reduce((acc, current) => acc + current, 0);
    }).reduce((acc, current) => acc + current, 0)
}

export const { checkTask, checkNegativeTasksOnToggle, setBriefId } = dataSlice.actions;
export default dataSlice.reducer;
